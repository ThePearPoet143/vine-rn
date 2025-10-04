import React from 'react';
import { Pressable, View, type ViewStyle, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Typography } from './typography';
import { IconSymbol } from './icon-symbol';
import { Radio } from './radio';
import { useThemeContext } from '@/contexts/preferences-context';
import { getAccentBlue } from '@/constants/colors';

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
  accessory?: 'none' | 'chevron' | 'checkmark' | 'radio';
  /** Selection state for radio/checkmark (required if accessory is 'radio') */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Disable the item */
  disabled?: boolean;
  /** Show separator line (default: false) */
  showSeparator?: boolean;
  /** Title font weight (default: 'medium') */
  titleWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Custom children (e.g., Switch component) - replaces default accessories */
  children?: React.ReactNode;
}

/**
 * List item component with polished press feedback and animations
 *
 * Features:
 * - 56px minimum height (44pt touch target with generous padding)
 * - Animated press feedback (100ms backdrop overlay - 50% opacity)
 * - Animated radio button support
 * - Theme-aware colors for all 6 reading themes
 * - Separator with 16px inset (simplified from icon-based)
 * - Semibold typography for professional hierarchy
 * - Multi-line subtitle support
 *
 * @example
 * ```tsx
 * <ListItem
 *   title="Appearance"
 *   subtitle="Theme, fonts, and display"
 *   icon="paintpalette.fill"
 *   accessory="radio"
 *   selected={true}
 *   titleWeight="semibold"
 *   showSeparator
 *   onPress={() => handleSelect()}
 * />
 * ```
 */
export function ListItem({
  title,
  subtitle,
  icon,
  value,
  accessory = 'none',
  selected = false,
  onPress,
  style,
  disabled = false,
  showSeparator = false,
  titleWeight = 'medium',
  children,
}: ListItemProps) {
  const { colors } = useThemeContext();

  // Shared value for press feedback - direct opacity control without re-renders
  const backdropOpacity = useSharedValue(0);

  const content = (
    <View style={{ backgroundColor: colors.cardBackground }}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 56,
            paddingHorizontal: 16,
            paddingVertical: 16,
            position: 'relative', // For absoluteFill backdrop
          },
          style,
        ]}
      >
        {/* Backdrop overlay using absoluteFill for full coverage */}
        {/* Theme-aware overlay provides press feedback without obscuring content */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: backdropOpacity,
              backgroundColor: colors.pressOverlay,
            },
          ]}
        />

        {/* Leading Icon */}
        {icon && (
          <View style={{ marginRight: 16 }}>
            <IconSymbol name={icon} size={28} color={colors.text} />
          </View>
        )}

        {/* Text Content */}
        <View style={{ flex: 1 }}>
          <Typography variant="body" weight={titleWeight} style={{ color: colors.text }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subheadline"
              weight="regular"
              color="secondary"
              style={{ marginTop: 2 }}
            >
              {subtitle}
            </Typography>
          )}
        </View>

        {/* Trailing Value */}
        {value && (
          <Typography
            variant="subheadline"
            weight="regular"
            color="tertiary"
            style={{ marginRight: accessory === 'chevron' || accessory === 'radio' ? 8 : 0 }}
          >
            {value}
          </Typography>
        )}

        {/* Custom Children (e.g., Switch) - Takes priority over accessories */}
        {children ? (
          children
        ) : (
          <>
            {/* Accessory */}
            {accessory === 'chevron' && (
              <IconSymbol name="chevron.right" size={14} color={colors.secondaryText} />
            )}
            {accessory === 'checkmark' && (
              <IconSymbol name="checkmark" size={18} color={getAccentBlue(colors.isDark)} />
            )}
            {accessory === 'radio' && <Radio selected={selected} />}
          </>
        )}
      </View>

      {/* Separator with 16px horizontal inset */}
      {showSeparator && (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.separator,
            marginLeft: 16,
            marginRight: 16,
          }}
        />
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        // Fast press feedback: 100ms creates immediate tactile response
        onPressIn={() => backdropOpacity.value = withTiming(1, { duration: 100 })}
        onPressOut={() => backdropOpacity.value = withTiming(0, { duration: 100 })}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
