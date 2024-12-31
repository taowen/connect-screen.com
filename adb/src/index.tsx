import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ReadableStream } from '@yume-chan/stream-extra';
import { AdbDaemonWebUsbDevice, AdbDaemonWebUsbConnection } from '@yume-chan/adb-daemon-webusb';
import { Adb } from '@yume-chan/adb';
import { AdbDaemonTransport } from "@yume-chan/adb";
import { AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import AdbWebCredentialStore from "@yume-chan/adb-credential-web";

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
const Manager: AdbDaemonWebUsbDeviceManager = new AdbDaemonWebUsbDeviceManager(navigator.usb);

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
      console.log(adb.deviceFeatures)
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
