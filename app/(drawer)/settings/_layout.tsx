import { Stack } from 'expo-router';
import React from 'react';
import { useThemeContext } from '@/contexts/theme-context';

/**
 * Settings stack navigator
 *
 * Navigation structure:
 * - Settings (index) - Main settings list
 * - Appearance - Theme and font customization
 */
export default function SettingsLayout() {
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          title: 'Appearance',
        }}
      />
    </Stack>
  );
}
