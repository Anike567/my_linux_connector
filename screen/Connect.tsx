import Clickable from "@/components/Clickable";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ThemedText from "@/components/MyText";
import useBtPermission from "@/hooks/useBtPermission";
import bluetoothService from "@/services/bluetoothServices";
import { JSX, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { Device } from "react-native-ble-plx";

export default function Connect(): JSX.Element {
  const { granted, askPermission } = useBtPermission();

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const btManager = useRef(bluetoothService.getBluetoothManager());
  const seenDevices = useRef<Set<string>>(new Set());

  const handleClick = async () => {
    setLoading(true);
    const result = await askPermission();
    setLoading(false);

    Alert.alert(
      result ? "Permission granted!" : "Permission denied!"
    );
  };

  const scanDevices = () => {
    setLoading(true);
    seenDevices.current.clear();
    setDevices([]);

    btManager.current.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        stopScan();
        return;
      }

      if (!device || !device.id) return;

      if (!seenDevices.current.has(device.id)) {
        seenDevices.current.add(device.id);
        setDevices(prev => [...prev, device]);
      }
    });
    setTimeout(stopScan, 8000);
  };

  const stopScan = () => {
    btManager.current.stopDeviceScan();
    setLoading(false);
  };

  return (
    <Container>
      {devices.length > 0 && (
        <View>
          {devices.map(device => (
            <ThemedText key={device.id}>
              {device.localName || device.name || device.id}
            </ThemedText>
          ))}
        </View>
      )}

      {loading && <Loader />}

      {!granted && (
        <Clickable title="Allow Permission" handler={handleClick} />
      )}

      {granted && (
        <Clickable
          title={loading ? "Stop" : "Scan"}
          handler={loading ? stopScan : scanDevices}
        />
      )}
    </Container>
  );
}
