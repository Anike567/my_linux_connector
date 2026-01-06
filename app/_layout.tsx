import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (

    <View>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Homescreen' }} />
      </Stack>
      <StatusBar style="auto" />
    </View>

  );
}
