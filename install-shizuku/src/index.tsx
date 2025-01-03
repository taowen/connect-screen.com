import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MaybeConsumable, ReadableStream } from '@yume-chan/stream-extra';
import { AdbDaemonWebUsbDevice, AdbDaemonWebUsbConnection } from '@yume-chan/adb-daemon-webusb';
import { Adb, AdbSubprocessNoneProtocol, AdbSubprocessShellProtocol, encodeUtf8 } from '@yume-chan/adb';
import { AdbDaemonTransport } from "@yume-chan/adb";
import { AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import AdbWebCredentialStore from "@yume-chan/adb-credential-web";

if (typeof navigator.usb === 'undefined') {
  alert("您的浏览器不支持 USB 调试");
}
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
  const response = await fetch('/moe.shizuku.privileged.api_1049.apk');
  if (!response.ok) {
    throw new Error('Failed to download Shizuku APK');
  }
  log('downloaded shizuku.apk');
  return await response.arrayBuffer();
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
  // Add state for device
  const [device, setDevice] = useState<AdbDaemonWebUsbDevice | undefined>(undefined);

  // Handler for device selection
  const handleConnect = async () => {
    try {
      const selectedDevice = await Manager.requestDevice();
      if (!selectedDevice) {
        alert("No device selected");
        return;
      }
      const conn = await connect(selectedDevice)
      const transport = await AdbDaemonTransport.authenticate({
        serial: selectedDevice.serial,
        connection: conn,
        credentialStore: CredentialStore,
      });
      const adb = new Adb(transport);
      const adbSync = await adb.sync();
      const installedPackages = await listInstalledPackages(adb);
      if (!installedPackages.includes('moe.shizuku.privileged.api')) {
        const shizukuApkData = await downloadShizukuApk();
        await adbSync.write({
          filename: "/data/local/tmp/shizuku.apk",
          file: asStream(shizukuApkData)
        })
        await adbExecute(adb, ['pm', 'install', '/data/local/tmp/shizuku.apk']);
        await adbExecute(adb, ['moneky', '-p', 'moe.shizuku.privileged.api', '-c', 'android.intent.category.LAUNCHE', '1']);
      }
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
    } catch (error) {
      console.error("Error connecting to device:", error);
      alert("没有找到手机");
    }
  };

  return (
    <div>
      <h1>激活 Shizuku</h1>
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
          <li>点击下方「激活」按钮：
            <ul>
              <li>在弹出的设备选择框中选择您的手机</li>
              <li>等待安装完成，请勿断开手机连接</li>
            </ul>
          </li>
        </ol>
      </p>
      <button 
        onClick={handleConnect}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          margin: '20px 0'
        }}
      >
        激活
      </button>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
