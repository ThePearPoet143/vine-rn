import React, { type ReactNode } from 'react';
import { Text, type TextProps } from 'react-native';

export type TypographyVariant =
  | 'large-title'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline'
  | 'footnote'
  | 'caption-1'
  | 'caption-2';

interface TypographyProps extends Omit<TextProps, 'children'> {
  variant?: TypographyVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'label' | 'secondary' | 'tertiary' | 'quaternary';
  /**
   * Disable Dynamic Type scaling (use for decorative text only)
   * @default false
   */
  disableScaling?: boolean;
  children: ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  'large-title': 'text-ios-large-title',
  'title-1': 'text-ios-title-1',
  'title-2': 'text-ios-title-2',
  'title-3': 'text-ios-title-3',
  'headline': 'text-ios-headline',
  'body': 'text-ios-body',
  'callout': 'text-ios-callout',
  'subheadline': 'text-ios-subheadline',
  'footnote': 'text-ios-footnote',
  'caption-1': 'text-ios-caption-1',
  'caption-2': 'text-ios-caption-2',
};

const weightStyles: Record<string, string> = {
  regular: 'font-ios-regular',
  medium: 'font-ios-medium',
  semibold: 'font-ios-semibold',
  bold: 'font-ios-bold',
};

const colorStyles: Record<string, string> = {
  label: 'text-ios-label dark:text-ios-label-dark',
  secondary: 'text-ios-secondary-label dark:text-ios-secondary-label-dark',
  tertiary: 'text-ios-tertiary-label dark:text-ios-tertiary-label-dark',
  quaternary: 'text-ios-quaternary-label dark:text-ios-quaternary-label-dark',
};

export function Typography({
  variant = 'body',
  weight = 'regular',
  color = 'label',
  disableScaling = false,
  children,
  className = '',
  ...props
}: TypographyProps) {
  const variantClass = variantStyles[variant];
  const weightClass = weightStyles[weight];
  const colorClass = colorStyles[color];

  return (
    <Text
      className={`${variantClass} ${weightClass} ${colorClass} ${className}`}
      allowFontScaling={!disableScaling}
      maxFontSizeMultiplier={disableScaling ? 1 : 3}
      {...props}
    >
      {children}
    </Text>
  );
}
