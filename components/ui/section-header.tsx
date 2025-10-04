import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Typography } from './typography';

export interface SectionHeaderProps {
  /** Section title text */
  title: string;
  /** Transform text to uppercase (default: false) */
  uppercase?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Top margin (default: 24px) */
  topMargin?: number;
  /** Bottom margin (default: 8px) */
  bottomMargin?: number;
}

/**
 * Discord-style section header component
 *
 * Features:
 * - Footnote size (13pt), Semibold weight
 * - Secondary text color
 * - Optional uppercase transform
 * - Generous spacing (24px top, 8px bottom)
 * - Used for grouping settings/lists
 *
 * @example
 * ```tsx
 * <SectionHeader title="ACCOUNT SETTINGS" uppercase />
 * <SectionHeader title="App Settings" />
 * ```
 */
export function SectionHeader({
  title,
  uppercase = false,
  style,
  topMargin = 24,
  bottomMargin = 8,
}: SectionHeaderProps) {
  return (
    <View
      style={[
        {
          marginTop: topMargin,
          marginBottom: bottomMargin,
          paddingHorizontal: 16,
        },
        style,
      ]}
    >
      <Typography variant="footnote" weight="semibold" color="secondary">
        {uppercase ? title.toUpperCase() : title}
      </Typography>
    </View>
  );
}
