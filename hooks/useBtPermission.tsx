import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export default function useBtPermission() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      getStatus();
    } else {
   
      setGranted(true);
    }
  }, []);

  // Check if permission is already granted
  const getStatus = async () => {
    try {
      const bluetoothScan = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      );

      const bluetoothConnect = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      );

      const fineLocation = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      setGranted(bluetoothScan && bluetoothConnect && fineLocation);
    } catch (err) {
      console.warn("Check permission error:", err);
      setGranted(false);
    }
  };

  // Request permissions if not already granted
  const askPermission = async () => {
    try {
      const bluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Bluetooth Scan Permission",
          message: "App needs Bluetooth scan permission",
          buttonPositive: "OK",
        }
      );

      const bluetoothConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Bluetooth Connect Permission",
          message: "App needs Bluetooth connect permission",
          buttonPositive: "OK",
        }
      );

      const fineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );

      return(
        bluetoothScan === PermissionsAndroid.RESULTS.GRANTED &&
          bluetoothConnect === PermissionsAndroid.RESULTS.GRANTED &&
          fineLocation === PermissionsAndroid.RESULTS.GRANTED
      )
    } catch (err) {
      console.warn("Permission error:", err);
      setGranted(false);
    }
  };

  return { granted, askPermission };
}
