import React from 'react';
import { Pressable, Text, ActivityIndicator, type PressableProps } from 'react-native';

export type ButtonStyle = 'filled' | 'tinted' | 'plain' | 'bordered';
export type ButtonRole = 'normal' | 'destructive' | 'cancel';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  style?: ButtonStyle;
  role?: ButtonRole;
  size?: ButtonSize;
  children: string;
  loading?: boolean;
  fullWidth?: boolean;
}

const getButtonStyles = (style: ButtonStyle, role: ButtonRole): string => {
  if (role === 'destructive') {
    switch (style) {
      case 'filled':
        return 'bg-ios-red active:bg-ios-red/80 dark:bg-ios-red-dark dark:active:bg-ios-red-dark/80';
      case 'tinted':
        return 'bg-ios-red/10 active:bg-ios-red/20 dark:bg-ios-red-dark/20 dark:active:bg-ios-red-dark/30';
      case 'bordered':
        return 'border-2 border-ios-red active:bg-ios-red/10 dark:border-ios-red-dark dark:active:bg-ios-red-dark/10';
      case 'plain':
        return 'bg-transparent active:bg-ios-fill';
    }
  }

  if (role === 'cancel') {
    switch (style) {
      case 'filled':
        return 'bg-ios-gray-5 active:bg-ios-gray-4 dark:bg-ios-gray-6-dark dark:active:bg-ios-gray-5-dark';
      case 'tinted':
        return 'bg-ios-fill active:bg-ios-secondary-fill';
      case 'bordered':
        return 'border-2 border-ios-separator active:bg-ios-fill';
      case 'plain':
        return 'bg-transparent active:bg-ios-fill';
    }
  }

  // Normal role
  switch (style) {
    case 'filled':
      return 'bg-ios-blue active:bg-ios-blue/80 dark:bg-ios-blue-dark dark:active:bg-ios-blue-dark/80';
    case 'tinted':
      return 'bg-ios-blue/10 active:bg-ios-blue/20 dark:bg-ios-blue-dark/20 dark:active:bg-ios-blue-dark/30';
    case 'bordered':
      return 'border-2 border-ios-blue active:bg-ios-blue/10 dark:border-ios-blue-dark dark:active:bg-ios-blue-dark/10';
    case 'plain':
      return 'bg-transparent active:bg-ios-fill';
  }
};

const getTextColor = (style: ButtonStyle, role: ButtonRole): string => {
  if (role === 'destructive') {
    return style === 'filled' ? 'text-white' : 'text-ios-red dark:text-ios-red-dark';
  }

  if (role === 'cancel') {
    return style === 'filled'
      ? 'text-ios-label dark:text-ios-label-dark'
      : 'text-ios-label dark:text-ios-label-dark';
  }

  return style === 'filled' ? 'text-white' : 'text-ios-blue dark:text-ios-blue-dark';
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; minHeight: string }> = {
  sm: {
    container: 'px-ios-md rounded-ios-sm',
    text: 'text-ios-subheadline font-ios-medium',
    minHeight: 'min-h-[36px]',
  },
  md: {
    container: 'px-ios-md rounded-ios-md',
    text: 'text-ios-body font-ios-medium',
    minHeight: 'min-h-[44px]', // iOS minimum touch target
  },
  lg: {
    container: 'px-ios-lg rounded-ios-lg',
    text: 'text-ios-headline font-ios-semibold',
    minHeight: 'min-h-[50px]',
  },
};

export function Button({
  style = 'filled',
  role = 'normal',
  size = 'md',
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonStyles = getButtonStyles(style, role);
  const textColor = getTextColor(style, role);
  const sizeClass = sizeStyles[size];
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = isDisabled ? 'opacity-40' : '';

  const spinnerColor =
    style === 'filled' && role !== 'cancel'
      ? '#FFFFFF'
      : role === 'destructive'
      ? '#FF3B30'
      : '#007AFF';

  return (
    <Pressable
      disabled={isDisabled}
      className={`${buttonStyles} ${sizeClass.container} ${sizeClass.minHeight} ${widthClass} ${disabledClass} ${className} items-center justify-center flex-row`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text className={`${sizeClass.text} ${textColor} text-center`}>{children}</Text>
      )}
    </Pressable>
  );
}
