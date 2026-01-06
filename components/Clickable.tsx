import { JSX } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "./MyText";

type Props = {
  title: string;           
  handler: () => void;
};

export default function Clickable({ title, handler }: Props): JSX.Element {
  return (
    <TouchableOpacity
      onPress={handler}
      style={styles.button} 
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: "red",
    borderRadius: 6,
    alignItems: "center", 
  },
});
