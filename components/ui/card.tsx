import React, { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeContext } from '@/contexts/preferences-context';

export type CardVariant = 'grouped' | 'inset-grouped' | 'plain';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  children: ReactNode;
}

/**
 * Card component with polished styling
 *
 * Features:
 * - Border radius: 16px (2xl) for modern, professional appearance
 * - iOS continuous border curves for native feel
 * - No default padding (list items handle their own padding)
 * - Overflow: hidden for proper border radius clipping
 * - Theme-aware backgrounds for all 6 reading themes
 *
 * @example
 * ```tsx
 * <Card variant="inset-grouped">
 *   <ListItem title="Item 1" showSeparator />
 *   <ListItem title="Item 2" />
 * </Card>
 * ```
 */
export function Card({ variant = 'grouped', children, className = '', style, ...props }: CardProps) {
  const { colors } = useThemeContext();

  // Use theme colors for card backgrounds
  const backgroundColor = variant === 'plain' ? colors.background : colors.cardBackground;

  return (
    <View
      className={`rounded-2xl ${className}`}
      style={[
        {
          backgroundColor,
          overflow: 'hidden', // Ensures children respect border radius
          // @ts-ignore - borderCurve is iOS-only but TypeScript doesn't recognize it
          borderCurve: 'continuous', // iOS 13+ continuous curves for native feel
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
