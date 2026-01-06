import useTheme from "@/hooks/useTheme";
import { JSX, ReactNode } from "react";
import { StyleSheet, View } from "react-native";


type ContainerProps = {
    children: ReactNode;
}
export default function Container({children} : ContainerProps) : JSX.Element{
    const isDark = useTheme();
    return(
        <View style = {[styles.container,{backgroundColor : isDark ? 'grey' : 'white'}]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent :"center",
        alignItems : "center",
    }
})