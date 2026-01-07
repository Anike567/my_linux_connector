import Clickable from "@/components/Clickable";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ThemedText from "@/components/MyText";
import useBtPermission from "@/hooks/useBtPermission";
import bluetoothService from "@/services/bluetoothServices";
import { JSX, useState } from "react";
import { Alert, View } from "react-native";
import { Device } from "react-native-ble-plx";

export default function Home(): JSX.Element {
  const { granted, askPermission } = useBtPermission();
  const [devices, setDevices]  = useState<Device[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);


  const handleClick = async () => {
    if (!granted) {
      const result = await askPermission();
      if (result) {
        setLoading(false);
        Alert.alert("Permission granted!");
      } else {
        setLoading(false);
        Alert.alert("Permission denied!");
      }
    }
  };
  
  const scanDevices = async () => {
    setLoading(true);
    bluetoothService.scanDevices()

      .then((devices)=>{
        setDevices(devices);
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      })
  }
  return (
    <Container>
      {devices.length > 0 &&(
        <View>
          {devices.map((device : Device) => (
            <ThemedText key={device.id}>{device.localName?.trim()}</ThemedText>
          ))}
        </View>
      )}
      {loading && <Loader/>}
      {!granted && <Clickable title="Allow Permission" handler={handleClick} />}
      {granted && <Clickable title="Scan" handler={scanDevices} />}
    </Container>
  );
}
