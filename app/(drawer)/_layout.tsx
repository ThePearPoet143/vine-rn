import { Drawer } from 'expo-router/drawer';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { CustomDrawerContent } from '@/components/custom-drawer-content';
import { useThemeContext } from '@/contexts/preferences-context';
import { getAccentBlue } from '@/constants/colors';

/**
 * Drawer Navigation Layout
 *
 * Screens:
 * - Home (index)
 * - Design System
 * - Settings (hidden from drawer, accessible via footer)
 */
export default function DrawerLayout() {
  const { colors } = useThemeContext();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 280,
          borderRightWidth: 1,
          borderRightColor: colors.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        overlayColor: 'rgba(255, 255, 255, 0.5)',
        drawerActiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.isDark
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.05)',
        drawerInactiveTintColor: colors.secondaryText,
        drawerLabelStyle: {
          marginLeft: 12,
          fontWeight: '600',
          fontSize: 16,
        },
        drawerItemStyle: {
          borderRadius: 8,
          paddingLeft: 12,
          paddingRight: 12,
          marginHorizontal: 0,
          marginVertical: 2,
        },
        drawerIconStyle: {
          marginLeft: 0,
          marginRight: 0,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Vine',
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="book.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="design-system"
        options={{
          drawerLabel: 'Design System',
          title: 'Design System',
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="paintpalette.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
