import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MaybeConsumable, ReadableStream } from '@yume-chan/stream-extra';
import { AdbDaemonWebUsbDevice, AdbDaemonWebUsbConnection } from '@yume-chan/adb-daemon-webusb';
import { Adb, AdbSubprocessNoneProtocol, AdbSubprocessShellProtocol, encodeUtf8 } from '@yume-chan/adb';
import { AdbDaemonTransport } from "@yume-chan/adb";
import { AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import AdbWebCredentialStore from "@yume-chan/adb-credential-web";

const textDecoder = new TextDecoder();
const Manager: AdbDaemonWebUsbDeviceManager = new AdbDaemonWebUsbDeviceManager(navigator.usb);
const CredentialStore: AdbWebCredentialStore = new AdbWebCredentialStore();

function log(message: string) {
    const logsDiv = document.getElementById('logs');
    if (logsDiv) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        logsDiv.appendChild(logEntry);
        logsDiv.scrollTop = logsDiv.scrollHeight;
    }
}

async function downloadShizukuApk(): Promise<ArrayBuffer> {
  log('start download shizuku.apk');
  const response = await fetch('/static/moe.shizuku.privileged.api_1049.apk');
  if (!response.ok) {
    throw new Error('Failed to download Shizuku APK');
  }
  log('downloaded shizuku.apk');
  return await response.arrayBuffer();
}


async function downloadAndCombineApk(): Promise<ArrayBuffer> {
  log('start download connect-screen.apk');
  const files = ["chunk_0.dat", "chunk_1.dat", "chunk_2.dat", "chunk_3.dat", "chunk_4.dat"];
  const chunks = [];
  
  // Download all chunks
  for (const file of files) {
    const response = await fetch(`/static/download-latest/${file}`);
    if (!response.ok) throw new Error(`Failed to download ${file}`);
    const chunk = await response.arrayBuffer();
    chunks.push(chunk);
  }
  
  // Combine chunks
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
  const combinedBuffer = new Uint8Array(totalLength);
  
  let offset = 0;
  for (const chunk of chunks) {
    combinedBuffer.set(new Uint8Array(chunk), offset);
    offset += chunk.byteLength;
  }
  log('downloaded connect-screen.apk');
  return combinedBuffer.buffer;
}

function asStream(data: ArrayBuffer) {
    return new ReadableStream<MaybeConsumable<Uint8Array>>({
      start(controller) {
        controller.enqueue(new Uint8Array(data));
        controller.close();
      }
    })
}


async function connect(device: AdbDaemonWebUsbDevice) {
  try {
    return await device.connect();
  } catch (error) {
    if (error instanceof AdbDaemonWebUsbDevice.DeviceBusyError) {
      alert(
        "The device is already in use by another program. Please close the program and try again.",
      );
    }
    // It might also throw other errors
    throw error;
  }
}

async function listInstalledPackages(adb: Adb) {
  // ReadableStream<Uint8Array>
  const { stdout } = await adb.subprocess.spawn(['pm', 'list', 'packages']);
  let output = '';
  for await (const chunk of stdout) {
    const text = textDecoder.decode(chunk);
    output += text;
  }
  return output;
}

async function adbExecute(adb: Adb, args: string[]) {
    log(`execute ${args.join(' ')}`)
    const { stdout, stderr, exit } = await adb.subprocess.spawn(args);
    let output = '';
    for await (const chunk of stderr) {
      const text = textDecoder.decode(chunk);
      output += text;
    }
    if (output) {
      log(output)
    }
    output = '';
    for await (const chunk of stdout) {
      const text = textDecoder.decode(chunk);
      output += text;
    }
    if (output) {
      log(output)
    }
    const exitCode = await exit;
    if (exitCode != 0) {
      throw new Error(`execute ${args.join(' ')} exit with: ${exitCode}`)
    }
}

const App = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const handleConnect = async () => {
    if (needRefresh) {      
      alert('请再点击一次安装');
      window.location.reload();
      return;
    }
    try {
      log('start install');
      const selectedDevice = await Manager.requestDevice();
      if (!selectedDevice) {
        log('no device selected');
        alert("No device selected");
        return;
      }
      log('selected device: ' + selectedDevice.name);
      const conn = await connect(selectedDevice)
      log('connected');
      try {
        const transport = await AdbDaemonTransport.authenticate({
          serial: selectedDevice.serial,
          connection: conn,
          credentialStore: CredentialStore,
        });
        const adb = new Adb(transport);
        log('adb created');
        // const installedPackages = await listInstalledPackages(adb);
        const adbSync = await adb.sync();
        const shizukuApkData = await downloadShizukuApk();
        await adbSync.write({
          filename: "/data/local/tmp/shizuku.apk",
          file: asStream(shizukuApkData)
        })
        await adbExecute(adb, ['pm', 'install', '/data/local/tmp/shizuku.apk']);
        const connectScreenApkData = await downloadAndCombineApk();
        await adbSync.write({
          filename: "/data/local/tmp/connect-screen.apk",
          file: asStream(connectScreenApkData)
        })
        await adbExecute(adb, ['pm', 'install', '/data/local/tmp/connect-screen.apk']);
        await adbExecute(adb, ['am', 'start', 'moe.shizuku.privileged.api/moe.shizuku.manager.MainActivity']);
        const shell = await AdbSubprocessShellProtocol.pty(adb, 'sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh > /data/local/tmp/start-shizuku.log');
        const { stdout, stderr, exit } = shell;
        for await (const chunk of stderr) {
          const text = textDecoder.decode(chunk);
          log(text);
        }
        for await (const chunk of stdout) {
          const text = textDecoder.decode(chunk);
          log(text);
        }
        const exitCode = await exit;
        if (exitCode != 0) {
          throw new Error(`start shizuku exit with: ${exitCode}`)
        }
        for await(const chunk of adbSync.read('/data/local/tmp/start-shizuku.log')) {
          const text = textDecoder.decode(chunk);
          for (const line of text.split('\n')) {
              log(line);
          }
        }
      } finally {
        setNeedRefresh(true);
      }
    } catch (error) {
      console.error("Error connecting to device:", error);
      alert("Failed to connect to device");
    }
  };

  return (
    <div>
      <h1>
        安卓屏连在线安装，需要在电脑上打开这个页面，以及 USB 连接手机
      </h1>
      
      <p>
        <ol>
          <li>打开手机的开发者模式：
            <ul>
              <li>进入手机「设置」</li>
              <li>找到「关于手机」</li>
              <li>连续点击「版本号」7次，直到提示已开启开发者模式</li>
            </ul>
          </li>
          <li>在开发者选项中，打开 USB 调试：
            <ul>
              <li>返回「设置」，找到「开发者选项」（通常在系统设置底部）</li>
              <li>打开「开发者选项」开关</li>
              <li>找到并启用「USB 调试」选项</li>
              <li>在弹出的警告对话框中点击「确定」</li>
            </ul>
          </li>
          <li>将手机通过 USB 线连接到电脑：
            <ul>
              <li>使用原装或质量可靠的 USB 数据线</li>
              <li>连接后查看手机是否弹出「允许 USB 调试」的提示框</li>
              <li>如果弹出提示，请点击「允许」或「确定」</li>
            </ul>
          </li>
          <li>点击下方「安装」按钮：
            <ul>
              <li>在弹出的设备选择框中选择您的手机</li>
              <li>等待安装完成，手机上会弹出确认安装的对话框</li>
              <li>会自动执行如下操作：</li>
              <li>安装 <a href="/static/moe.shizuku.privileged.api_1049.apk">Shizuku 的 apk</a></li>
              <li>安装 <a href="/static/download-latest/index.html">安卓屏连 apk</a></li>
              <li>启动 Shizuku</li>
              <li>运行 /sdcard/Android/data/moe.shizuku.privileged.api/start.sh</li>
            </ul>
          </li>
        </ol>
      </p>
      <button onClick={handleConnect} style={{
          padding: '12px 24px',
          fontSize: '18px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          margin: '20px 0'
        }}>
        安装
      </button>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
