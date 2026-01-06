import useTheme from "@/hooks/useTheme";
import { JSX } from "react";
import { Text } from "react-native";

type Props = {
    children : string
}
export default function ThemedText({children}:Props) : JSX.Element{
    const isDark = useTheme();
    return (
        <Text style = {{color : isDark ? 'white' : 'black'}}>{children}</Text>
    )
}

