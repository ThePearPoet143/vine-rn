import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';

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
          borderRightColor: colors.drawerBorder,
        },
        overlayColor: colors.drawerOverlay,
        drawerActiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.pressOverlay,
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
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Home',
          title: 'Vine',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notes"
        options={{
          drawerLabel: 'Notes',
          title: 'Notes',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="note.text" color={color} />
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
        name="test"
        options={{
          drawerLabel: 'Test',
          title: 'Test Screen',
          headerShown: false,
          drawerIcon: ({ color }) => (
            <IconSymbol size={28} name="flask.fill" color={color} />
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
