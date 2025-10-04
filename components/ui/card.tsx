import React, { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeContext } from '@/contexts/theme-context';

export type CardVariant = 'grouped' | 'inset-grouped' | 'plain';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({ variant = 'grouped', children, className = '', style, ...props }: CardProps) {
  const { colors } = useThemeContext();

  // Use theme colors for card backgrounds
  const backgroundColor = variant === 'plain' ? colors.background : colors.cardBackground;

  return (
    <View
      className={`rounded-ios-md p-ios-md ${className}`}
      style={[{ backgroundColor }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
