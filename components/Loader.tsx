import { JSX } from "react";
import { ActivityIndicator } from "react-native";

export default function Loader() : JSX.Element{
    return(
        <ActivityIndicator
            size="large"
            color="blue"
        />
    )
}