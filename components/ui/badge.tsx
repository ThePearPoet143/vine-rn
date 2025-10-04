import React from 'react';
import { View, Text, type ViewProps } from 'react-native';

export type BadgeColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'gray';

interface BadgeProps extends Omit<ViewProps, 'children'> {
  color?: BadgeColor;
  children: string;
}

const colorStyles: Record<BadgeColor, { container: string; text: string }> = {
  blue: {
    container: 'bg-ios-blue/10 dark:bg-ios-blue-dark/20',
    text: 'text-ios-blue dark:text-ios-blue-dark',
  },
  green: {
    container: 'bg-ios-green/10 dark:bg-ios-green-dark/20',
    text: 'text-ios-green dark:text-ios-green-dark',
  },
  red: {
    container: 'bg-ios-red/10 dark:bg-ios-red-dark/20',
    text: 'text-ios-red dark:text-ios-red-dark',
  },
  orange: {
    container: 'bg-ios-orange/10 dark:bg-ios-orange-dark/20',
    text: 'text-ios-orange dark:text-ios-orange-dark',
  },
  purple: {
    container: 'bg-ios-purple/10 dark:bg-ios-purple-dark/20',
    text: 'text-ios-purple dark:text-ios-purple-dark',
  },
  gray: {
    container: 'bg-ios-fill dark:bg-ios-fill-dark',
    text: 'text-ios-secondary-label dark:text-ios-secondary-label-dark',
  },
};

export function Badge({ color = 'blue', children, className = '', ...props }: BadgeProps) {
  const styles = colorStyles[color];

  return (
    <View className={`${styles.container} px-ios-sm py-1 rounded-full ${className}`} {...props}>
      <Text className={`${styles.text} text-ios-caption-1 font-ios-semibold`}>{children}</Text>
    </View>
  );
}
