import { Stack } from 'expo-router';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeContext } from '@/contexts/preferences-context';

/**
 * Notes stack navigator
 *
 * Navigation structure:
 * - Notes (index) - Main notes screen with drawer icon
 */
export default function NotesLayout() {
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.groupedBackground,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Notes',
          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />
    </Stack>
  );
}
