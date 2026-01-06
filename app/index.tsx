import Container from "@/components/Container";
import { JSX } from "react";
import { Text } from "react-native";
export default function HomeScreen() : JSX.Element{
  return (
    <Container>
        <Text style = {{color : 'black'}}>"Hello World"</Text>
    </Container>
  );
}
