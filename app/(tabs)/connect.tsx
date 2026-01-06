import Clickable from "@/components/Clickable";
import Container from "@/components/Container";
import useBtPermission from "@/hooks/useBtPermission";
import { JSX } from "react";
import { Alert } from "react-native";

export default function Home() : JSX.Element{
    const permissionStatus = useBtPermission();
    const handleClick = ()=>{
        if(permissionStatus){
            Alert.alert("Permission Granted");
        }
        else{
            Alert.alert("Permission not Granted");
        }
    }
    return(
        <Container>
            <Clickable
                title="Connect"
                handler={handleClick}
            />
        </Container>
    )
}