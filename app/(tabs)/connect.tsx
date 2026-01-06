import Clickable from "@/components/Clickable";
import Container from "@/components/Container";
import useBtPermission from "@/hooks/useBtPermission";
import { JSX } from "react";
import { Alert } from "react-native";

export default function Home(): JSX.Element {
  const { granted, askPermission } = useBtPermission();

  const handleClick = async () => {
    console.log("Bluetooth granted?", granted);

    if (!granted) {
      const result = await askPermission();
      if (result) {
        Alert.alert("Permission granted!");
      } else {
        Alert.alert("Permission denied!");
      }
    } 
  };
  const scanDevices = async()=>{

  }
  return (
    <Container>
      {!granted && <Clickable title="Allow Permission" handler={handleClick} />}
      {granted && <Clickable title="Scan" handler={scanDevices}/>}
    </Container>
  );
}
