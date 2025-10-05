import { Stack } from 'expo-router';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeContext } from '@/contexts/preferences-context';

/**
 * Test stack navigator
 *
 * Navigation structure:
 * - Test (index) - Main test screen with drawer icon
 * - Detail - Test detail screen with back button
 */
export default function TestLayout() {
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
          title: 'Test Screen',
          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: 'Test Detail',
        }}
      />
    </Stack>
  );
}
