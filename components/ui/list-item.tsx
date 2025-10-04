import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Typography } from './typography';
import { IconSymbol } from './icon-symbol';
import { useThemeContext } from '@/contexts/theme-context';

export interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text (optional) */
  subtitle?: string;
  /** Leading icon (SF Symbol name) */
  icon?: string;
  /** Trailing value text */
  value?: string;
  /** Accessory type */
  accessory?: 'none' | 'chevron' | 'checkmark';
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Disable the item */
  disabled?: boolean;
}

/**
 * iOS-native list item component following Apple HIG
 *
 * Features:
 * - 44pt minimum touch target
 * - Theme-aware colors
 * - Optional icon, subtitle, value, accessory
 * - Variants: default, disclosure (chevron), detail (value)
 *
 * @example
 * ```tsx
 * <ListItem
 *   title="Appearance"
 *   icon="paintpalette.fill"
 *   accessory="chevron"
 *   onPress={() => navigation.navigate('Appearance')}
 * />
 * ```
 */
export function ListItem({
  title,
  subtitle,
  icon,
  value,
  accessory = 'none',
  onPress,
  style,
  disabled = false,
}: ListItemProps) {
  const { colors } = useThemeContext();

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 44,
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.cardBackground,
        },
        style,
      ]}
    >
      {/* Leading Icon */}
      {icon && (
        <View style={{ marginRight: 12 }}>
          <IconSymbol name={icon} size={24} color={colors.text} />
        </View>
      )}

      {/* Text Content */}
      <View style={{ flex: 1 }}>
        <Typography variant="body" weight="regular" style={{ color: colors.text }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="footnote" color="secondary" style={{ marginTop: 2 }}>
            {subtitle}
          </Typography>
        )}
      </View>

      {/* Trailing Value */}
      {value && (
        <Typography
          variant="body"
          color="secondary"
          style={{ marginRight: accessory === 'chevron' ? 8 : 0 }}
        >
          {value}
        </Typography>
      )}

      {/* Accessory */}
      {accessory === 'chevron' && (
        <IconSymbol name="chevron.right" size={14} color={colors.secondaryText} />
      )}
      {accessory === 'checkmark' && (
        <IconSymbol name="checkmark" size={16} color={colors.isDark ? '#0A84FF' : '#007AFF'} />
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
