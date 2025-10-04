import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/icon-symbol';
import { Typography } from './ui/typography';
import { useThemeContext } from '@/contexts/theme-context';

/**
 * Custom drawer content with pinned footer
 *
 * Structure:
 * - Scrollable area with regular drawer items
 * - Fixed footer with Settings item pinned to bottom
 *
 * Follows Apple HIG for iOS navigation drawers
 */
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useThemeContext();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Scrollable Drawer Items */}
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Pinned Footer - Settings */}
      <View
        style={[
          styles.footer,
          {
            borderTopColor: colors.separator,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Pressable
          onPress={() => router.push('/(drawer)/settings')}
          style={({ pressed }) => [
            styles.settingsItem,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <View style={styles.settingsContent}>
            <IconSymbol name="gearshape.fill" size={24} color={colors.text} />
            <Typography
              variant="body"
              weight="regular"
              style={{ marginLeft: 12, color: colors.text }}
            >
              Settings
            </Typography>
          </View>
          <IconSymbol name="chevron.right" size={14} color={colors.secondaryText} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
