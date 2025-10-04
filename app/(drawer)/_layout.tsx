import { Drawer } from 'expo-router/drawer';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="house.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          drawerLabel: 'Explore',
          title: 'Explore',
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="nativewind-test"
        options={{
          drawerLabel: 'NativeWind Test',
          title: 'NativeWind Test',
          drawerIcon: ({ color, size }) => (
            <IconSymbol size={size} name="paintbrush.fill" color={color} />
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
    </Drawer>
  );
}
