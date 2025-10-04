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
        overlayColor: colors.isDark ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
        drawerActiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)',
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: {
          marginLeft: 16,
          fontWeight: '500',
          fontSize: 17,
        },
        drawerItemStyle: {
          borderRadius: 0,
          paddingLeft: 16,
          paddingRight: 16,
          marginHorizontal: 0,
          marginVertical: 0,
          minHeight: 56,
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
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="design-system"
        options={{
          drawerLabel: 'Design System',
          title: 'Design System',
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="paintpalette.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
