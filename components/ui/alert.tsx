import React, { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { IconSymbol } from './icon-symbol';
import { Typography } from './typography';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

interface AlertProps extends Omit<ViewProps, 'children'> {
  type?: AlertType;
  title?: string;
  children: ReactNode;
}

const alertStyles: Record<AlertType, { container: string; titleColor: string; icon: string; iconColor: string }> = {
  success: {
    container: 'bg-ios-green/10 dark:bg-ios-green-dark/20',
    titleColor: 'text-ios-green dark:text-ios-green-dark',
    icon: 'checkmark.circle.fill',
    iconColor: '#34C759',
  },
  warning: {
    container: 'bg-ios-orange/10 dark:bg-ios-orange-dark/20',
    titleColor: 'text-ios-orange dark:text-ios-orange-dark',
    icon: 'exclamationmark.triangle.fill',
    iconColor: '#FF9500',
  },
  error: {
    container: 'bg-ios-red/10 dark:bg-ios-red-dark/20',
    titleColor: 'text-ios-red dark:text-ios-red-dark',
    icon: 'xmark.circle.fill',
    iconColor: '#FF3B30',
  },
  info: {
    container: 'bg-ios-blue/10 dark:bg-ios-blue-dark/20',
    titleColor: 'text-ios-blue dark:text-ios-blue-dark',
    icon: 'info.circle.fill',
    iconColor: '#007AFF',
  },
};

export function Alert({ type = 'info', title, children, className = '', ...props }: AlertProps) {
  const styles = alertStyles[type];

  return (
    <View className={`${styles.container} p-ios-md rounded-ios-lg ${className}`} {...props}>
      <View className="flex-row items-start gap-ios-sm">
        <IconSymbol name={styles.icon} size={20} color={styles.iconColor} />
        <View className="flex-1">
          {title && (
            <Typography variant="headline" weight="semibold" className={`${styles.titleColor} mb-1`}>
              {title}
            </Typography>
          )}
          <Typography variant="subheadline" color="secondary">
            {children}
          </Typography>
        </View>
      </View>
    </View>
  );
}
