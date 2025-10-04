import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontScaleMonitor } from '@/components/font-scale-monitor';
import { FontProvider } from '@/contexts/font-context';

export const unstable_settings = {
  anchor: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <FontProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <FontScaleMonitor />
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FontProvider>
  );
}
