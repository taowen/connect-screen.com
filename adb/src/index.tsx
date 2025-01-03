import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MaybeConsumable, ReadableStream } from '@yume-chan/stream-extra';
import { AdbDaemonWebUsbDevice, AdbDaemonWebUsbConnection } from '@yume-chan/adb-daemon-webusb';
import { Adb } from '@yume-chan/adb';
import { AdbDaemonTransport } from "@yume-chan/adb";
import { AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import AdbWebCredentialStore from "@yume-chan/adb-credential-web";

const textDecoder = new TextDecoder();
const Manager: AdbDaemonWebUsbDeviceManager = new AdbDaemonWebUsbDeviceManager(navigator.usb);

async function downloadAndCombineApk(): Promise<ArrayBuffer> {
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
  
  return combinedBuffer.buffer;
}

const CredentialStore: AdbWebCredentialStore = new AdbWebCredentialStore();

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
      const installedPackages = await listInstalledPackages(adb);
      const connectScreenApkData = await downloadAndCombineApk();
      const stream = new ReadableStream<MaybeConsumable<Uint8Array>>({
        start(controller) {
          controller.enqueue(new Uint8Array(connectScreenApkData));
          controller.close();
        }
      });
      const adbSync = await adb.sync();
      await adbSync.write({
        filename: "/data/local/tmp/connect-screen.apk",
        file: stream
      })
      const { stdout, stderr } = await adb.subprocess.spawn(['pm', 'install', '/data/local/tmp/connect-screen.apk']);
      let output = '';
      for await (const chunk of stdout) {
        const text = textDecoder.decode(chunk);
        output += text;
      }
      console.log('pm install', output);
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
