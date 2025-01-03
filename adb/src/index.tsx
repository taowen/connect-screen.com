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
  const response = await fetch('/static/adb/public/moe.shizuku.privileged.api_1049.apk');
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
    const response = await fetch(`/static/adb/public/download-latest/${file}`);
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
      console.log(adb.deviceFeatures);
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
      alert("Failed to connect to device");
    }
  };

  return (
    <div>
      <h1>ADB WebUSB Demo</h1>
      <button onClick={handleConnect}>
        {device ? 'Connected' : 'Connect to Device'}
      </button>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
