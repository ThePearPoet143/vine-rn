import React, { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

export type CardVariant = 'grouped' | 'inset-grouped' | 'plain';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  grouped: 'bg-ios-secondary-grouped-bg dark:bg-ios-secondary-grouped-bg-dark',
  'inset-grouped': 'bg-ios-secondary-grouped-bg dark:bg-ios-secondary-grouped-bg-dark',
  plain: 'bg-ios-bg dark:bg-ios-bg-dark',
};

export function Card({ variant = 'grouped', children, className = '', ...props }: CardProps) {
  const variantClass = variantStyles[variant];

  return (
    <View className={`rounded-ios-md p-ios-md ${variantClass} ${className}`} {...props}>
      {children}
    </View>
  );
}
