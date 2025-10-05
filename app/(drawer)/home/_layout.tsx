import { Stack } from 'expo-router';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeContext } from '@/contexts/preferences-context';

/**
 * Home stack navigator
 *
 * Navigation structure:
 * - Home (index) - Main home screen with drawer icon
 */
export default function HomeLayout() {
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
          title: 'Vine',
          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
        }}
      />
    </Stack>
  );
}
