import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/contexts/preferences-context';

export interface DividerProps {
  /** Inset from left edge in pixels */
  insetLeft?: number;
  /** Inset from right edge in pixels */
  insetRight?: number;
  /** Custom color (overrides theme separator color) */
  color?: string;
}

/**
 * Horizontal divider/separator line
 *
 * Features:
 * - Theme-aware separator color
 * - Optional left/right insets for alignment
 * - Hairline width for native feel
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider insetLeft={16} insetRight={16} />
 * ```
 */
export const Divider: FC<DividerProps> = ({ insetLeft = 0, insetRight = 0, color }) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: color || colors.separator,
        marginLeft: insetLeft,
        marginRight: insetRight,
      }}
    />
  );
};
