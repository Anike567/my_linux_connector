import useTheme from "@/hooks/useTheme";
import { JSX, ReactNode } from "react";
import { Text } from "react-native";

type Props = {
  children: ReactNode;
};

export default function ThemedText({ children }: Props): JSX.Element {
  const isDark = useTheme();

  return (
    <Text style={{ color: isDark ? "white" : "black" }}>
      {children}
    </Text>
  );
}
