import Container from "@/components/Container";
import ThemedText from "@/components/MyText";
import { JSX } from "react";
import { TouchableOpacity } from "react-native";

export default function Index() : JSX.Element {
    return(
        <Container>
            <TouchableOpacity><ThemedText>Click Me</ThemedText></TouchableOpacity>
        </Container>
    )
}