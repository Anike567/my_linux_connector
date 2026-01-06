import Container from "@/components/Container";
import { Redirect } from "expo-router";
import { JSX } from "react";
export default function HomeScreen() : JSX.Element{
  return (
    <Container>
        <Redirect href={"/(tabs)"}/>
    </Container>
  );
}
