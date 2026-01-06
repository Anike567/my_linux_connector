import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export default function useTheme() {
  const [isDark, setIsDark] = useState(
    Appearance.getColorScheme() === "dark"
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => sub.remove();
  }, []);

  return { isDark };
}
