import React, { type ReactNode } from 'react';
import { Text, type TextProps, Platform } from 'react-native';
import { useFontContext } from '@/contexts/font-context';
import { useThemeContext } from '@/contexts/theme-context';

/**
 * iOS text style variants following Apple Human Interface Guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/typography
 */
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

/**
 * Typography component with full accessibility support
 *
 * Features:
 * - iOS Dynamic Type support (82% - 310% via system settings)
 * - App-level font size multiplier (50% - 200% via app slider)
 * - Font family switching (System/Serif/Mono)
 * - Reading themes (Light/Dark/Sepia/Warm Dark/Green)
 * - Automatic line height scaling to prevent text clipping
 * - Flexible layouts that grow with text size
 *
 * @example
 * ```tsx
 * <Typography variant="body">Regular text</Typography>
 * <Typography variant="headline" weight="bold">Bold headline</Typography>
 * <Typography variant="caption-1" color="secondary">Secondary caption</Typography>
 * ```
 *
 * Accessibility:
 * - Always scales with iOS Dynamic Type unless `disableScaling={true}`
 * - Combined scaling: app multiplier × iOS Dynamic Type (up to 620% total)
 * - All themes meet WCAG AAA contrast (7:1+)
 * - Use `disableScaling` ONLY for decorative text that shouldn't scale
 */
interface TypographyProps extends Omit<TextProps, 'children'> {
  /** iOS text style variant (default: 'body') */
  variant?: TypographyVariant;
  /** Font weight (default: 'regular') */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Text color using theme colors (default: 'label') */
  color?: 'label' | 'secondary' | 'tertiary' | 'quaternary';
  /**
   * Disable Dynamic Type scaling (use for decorative text only)
   * @default false
   * @example Use for UI labels that must remain a fixed size regardless of accessibility settings
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

// Base font sizes in pixels (matching iOS text styles)
const variantBaseSizes: Record<TypographyVariant, number> = {
  'large-title': 34,
  'title-1': 28,
  'title-2': 22,
  'title-3': 20,
  'headline': 17,
  'body': 17,
  'callout': 16,
  'subheadline': 15,
  'footnote': 13,
  'caption-1': 12,
  'caption-2': 11,
};

const weightStyles: Record<string, string> = {
  regular: 'font-ios-regular',
  medium: 'font-ios-medium',
  semibold: 'font-ios-semibold',
  bold: 'font-ios-bold',
};

// Map font families to actual font names
const getFontFamilyName = (family: 'system' | 'serif' | 'mono'): string => {
  if (Platform.OS !== 'ios') return 'System'; // Default for non-iOS

  switch (family) {
    case 'serif':
      return 'New York'; // iOS 13+ serif reading font
    case 'mono':
      return 'Menlo'; // iOS monospace font
    case 'system':
    default:
      return 'System'; // SF Pro (default)
  }
};

// Get text color from theme based on color prop
const getTextColor = (color: 'label' | 'secondary' | 'tertiary' | 'quaternary', theme: any): string => {
  switch (color) {
    case 'label':
      return theme.text;
    case 'secondary':
      return theme.secondaryText;
    case 'tertiary':
      return theme.tertiaryText;
    case 'quaternary':
      return theme.tertiaryText; // Use tertiary as quaternary (close enough)
    default:
      return theme.text;
  }
};

export function Typography({
  variant = 'body',
  weight = 'regular',
  color = 'label',
  disableScaling = false,
  children,
  className = '',
  style,
  ...props
}: TypographyProps) {
  const { fontFamily, fontSize: fontSizeMultiplier } = useFontContext();
  const { colors } = useThemeContext();
  const variantClass = variantStyles[variant];
  const weightClass = weightStyles[weight];

  // Apply font size multiplier using actual pixel values
  // Only override Tailwind size if multiplier is not 1.0
  const fontSizeStyle = fontSizeMultiplier !== 1.0
    ? {
        fontSize: Math.round(variantBaseSizes[variant] * fontSizeMultiplier),
        lineHeight: Math.round(variantBaseSizes[variant] * fontSizeMultiplier * 1.2),
      }
    : {};

  // Get text color from current theme
  const textColor = getTextColor(color, colors);

  return (
    <Text
      className={`${variantClass} ${weightClass} ${className}`}
      style={[
        { fontFamily: getFontFamilyName(fontFamily), color: textColor },
        fontSizeStyle,
        style,
      ]}
      allowFontScaling={!disableScaling}
      maxFontSizeMultiplier={disableScaling ? 1 : 3}
      {...props}
    >
      {children}
    </Text>
  );
}
