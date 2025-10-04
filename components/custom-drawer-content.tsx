import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './ui/icon-symbol';
import { Typography } from './ui/typography';
import { useThemeContext } from '@/contexts/preferences-context';

/**
 * Custom Drawer Content
 *
 * Features:
 * - Simple header with app name
 * - Scrollable navigation items with neutral selection
 * - User profile + Settings footer with iOS safe area
 *
 * Layout:
 * - Header: App name only
 * - Body: Scrollable drawer items
 * - Footer: User avatar + Settings button
 */
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useThemeContext();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <Typography
          variant="title-1"
          weight="bold"
          style={{
            color: colors.text,
            fontFamily: 'Georgia',
            fontSize: 28,
            letterSpacing: -0.5,
          }}
        >
          Vine
        </Typography>
      </View>

      {/* Scrollable Drawer Items */}
      <DrawerContentScrollView
        {...props}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Pinned Footer - User Profile */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.groupedBackground,
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 44,
          }}
        >
          <View style={[styles.avatar, { backgroundColor: colors.secondaryBackground }]}>
            <IconSymbol name="person.fill" size={18} color={colors.secondaryText} />
          </View>

          <Text
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 15,
              fontWeight: '600',
              color: colors.text,
            }}
          >
            Shiyuan Li
          </Text>
        </View>
      </View>

      {/* Inner Shadow - Right edge inset shadow */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.innerShadow}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footer: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerShadow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 12,
  },
});
