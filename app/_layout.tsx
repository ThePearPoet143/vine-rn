import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontScaleMonitor } from '@/components/font-scale-monitor';
import { PreferencesProvider, useThemeContext } from '@/contexts/preferences-context';

export const unstable_settings = {
  anchor: '(drawer)',
};

function RootLayoutNav() {
  const { colors } = useThemeContext();
  const colorScheme = useColorScheme();

  // Create custom navigation theme based on reading theme
  const navigationTheme = {
    ...(colors.isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(colors.isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.cardBackground,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <FontScaleMonitor />
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={colors.isDark ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <RootLayoutNav />
    </PreferencesProvider>
  );
}
