import React from 'react';
import { View, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Typography } from '@/components/ui/typography';
import { useFontContext, type FontFamily } from '@/contexts/font-context';
import { useThemeContext } from '@/contexts/theme-context';
import { type ThemeMode, Themes } from '@/constants/themes';

export default function DesignSystemScreen() {
  const { width } = useWindowDimensions();
  const { fontFamily, setFontFamily, fontSize, setFontSize } = useFontContext();
  const { themeMode, setThemeMode, colors } = useThemeContext();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="p-ios-md">
        {/* Header */}
        <View className="mb-ios-lg">
          <Typography variant="large-title" weight="bold" className="mb-ios-xs">
            Design System
          </Typography>
          <Typography variant="body" color="secondary">
            Reading experience with accessibility-first design
          </Typography>
        </View>

        {/* Reading Theme Picker */}
        <View style={{ backgroundColor: colors.cardBackground }} className="p-ios-md rounded-ios-lg mb-ios-md">
          <Typography variant="title-3" weight="semibold" className="mb-ios-sm">
            Reading Theme
          </Typography>
          <View className="gap-ios-xs mb-ios-md">
            {(['auto', 'light', 'dark', 'sepia', 'warm-dark', 'green'] as ThemeMode[]).map((mode) => {
              const isActive = themeMode === mode;
              const themeColors = mode === 'auto' ? colors : Themes[mode as Exclude<ThemeMode, 'auto'>];

              return (
                <Pressable
                  key={mode}
                  onPress={() => setThemeMode(mode)}
                  style={{
                    backgroundColor: isActive ? colors.text : colors.secondaryBackground,
                    borderWidth: 2,
                    borderColor: isActive ? colors.text : colors.border,
                  }}
                  className="p-ios-md rounded-ios-md flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-ios-sm flex-1">
                    {/* Theme color preview swatch */}
                    {mode !== 'auto' && (
                      <View
                        style={{ backgroundColor: themeColors.background }}
                        className="w-[40px] h-[40px] rounded-ios-sm"
                      >
                        <View className="flex-1 items-center justify-center">
                          <Typography
                            variant="caption-1"
                            weight="semibold"
                            style={{ color: themeColors.text }}
                          >
                            Aa
                          </Typography>
                        </View>
                      </View>
                    )}
                    <View className="flex-1">
                      <Typography
                        variant="body"
                        weight={isActive ? 'semibold' : 'medium'}
                        style={{ color: isActive ? colors.background : colors.text }}
                      >
                        {mode === 'auto' ? 'Auto (System)' :
                         mode === 'warm-dark' ? 'Warm Dark' :
                         mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Typography>
                      {mode !== 'auto' && (
                        <Typography
                          variant="caption-1"
                          style={{ color: isActive ? colors.background : colors.secondaryText }}
                        >
                          {themeColors.description} • {themeColors.contrastRatio}
                        </Typography>
                      )}
                    </View>
                  </View>
                  {isActive && (
                    <Typography variant="headline" style={{ color: colors.background }}>
                      ✓
                    </Typography>
                  )}
                </Pressable>
              );
            })}
          </View>
          <Typography variant="footnote" color="tertiary">
            All themes meet WCAG AAA standards (7:1+ contrast) for comfortable extended reading.
          </Typography>
        </View>

        {/* Font Family Switcher */}
        <View style={{ backgroundColor: colors.cardBackground }} className="p-ios-md rounded-ios-lg mb-ios-md">
          <Typography variant="title-3" weight="semibold" className="mb-ios-sm">
            Font Family
          </Typography>
          <View className="flex-row gap-ios-xs mb-ios-lg">
            {(['system', 'serif', 'mono'] as FontFamily[]).map((font) => (
              <Pressable
                key={font}
                onPress={() => setFontFamily(font)}
                style={{
                  backgroundColor: fontFamily === font ? '#007AFF' : colors.secondaryBackground,
                }}
                className="flex-1 py-ios-sm px-ios-md rounded-ios-md"
              >
                <Typography
                  variant="body"
                  weight="medium"
                  style={{ color: fontFamily === font ? '#FFFFFF' : colors.text }}
                  className="text-center"
                >
                  {font.charAt(0).toUpperCase() + font.slice(1)}
                </Typography>
              </Pressable>
            ))}
          </View>

          {/* Font Size Slider */}
          <Typography variant="title-3" weight="semibold" className="mb-ios-sm">
            Font Size: {Math.round(fontSize * 100)}%
          </Typography>
          <View className="mb-ios-md">
            <View className="flex-row items-center gap-ios-sm">
              <Pressable
                onPress={() => setFontSize(Math.max(0.5, fontSize - 0.1))}
                style={{ backgroundColor: colors.secondaryBackground }}
                className="min-w-[44px] min-h-[44px] aspect-square items-center justify-center rounded-full px-ios-xs"
              >
                <Typography variant="title-2" weight="semibold">−</Typography>
              </Pressable>

              <View className="flex-1 min-h-[44px] justify-center px-ios-sm">
                <View style={{ backgroundColor: colors.secondaryBackground }} className="h-[6px] rounded-full overflow-hidden">
                  <View
                    style={{ backgroundColor: '#007AFF', width: `${((fontSize - 0.5) / 1.5) * 100}%` }}
                    className="h-full rounded-full"
                  />
                </View>
              </View>

              <Pressable
                onPress={() => setFontSize(Math.min(2.0, fontSize + 0.1))}
                style={{ backgroundColor: colors.secondaryBackground }}
                className="min-w-[44px] min-h-[44px] aspect-square items-center justify-center rounded-full px-ios-xs"
              >
                <Typography variant="title-2" weight="semibold">+</Typography>
              </Pressable>
            </View>
            <View className="flex-row justify-between mt-ios-xs px-ios-sm">
              <Typography variant="caption-2" color="tertiary">50%</Typography>
              <Typography variant="caption-2" color="tertiary">100%</Typography>
              <Typography variant="caption-2" color="tertiary">200%</Typography>
            </View>
          </View>

          <Typography variant="footnote" color="tertiary" className="mb-ios-md">
            Font size works together with iOS Text Size settings for maximum flexibility.
          </Typography>

          <View style={{ backgroundColor: colors.secondaryBackground }} className="p-ios-md rounded-ios-md">
            <Typography variant="body" className="italic text-center">
              "In the beginning God created the heavens and the earth." — Genesis 1:1
            </Typography>
          </View>
        </View>

        {/* Device Info */}
        <Card variant="inset-grouped" className="mb-ios-md">
          <Typography variant="title-3" weight="semibold" className="mb-ios-sm">
            Device Information
          </Typography>
          <View className="gap-ios-xs">
            <Typography variant="body" color="secondary">
              <Typography variant="body" weight="semibold">Screen Width:</Typography> {width.toFixed(0)}px
            </Typography>
            <Typography variant="body" color="secondary">
              <Typography variant="body" weight="semibold">Typography:</Typography> SF Pro (Dynamic Type)
            </Typography>
            <Typography variant="body" color="secondary">
              <Typography variant="body" weight="semibold">Color System:</Typography> iOS Semantic Colors
            </Typography>
          </View>
        </Card>

        {/* Dynamic Type Demo */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Dynamic Type
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-sm">
            <Typography variant="body" color="secondary">
              All text in this app automatically scales with iOS Text Size settings. Try changing it in Settings {'->'} Accessibility {'->'} Display & Text Size {'->'} Larger Text.
            </Typography>
            <Alert type="info" title="Accessibility Support">
              Text automatically scales with your device settings for optimal readability. This design system supports all iOS Dynamic Type sizes including accessibility sizes.
            </Alert>
          </Card>
        </View>

        {/* Typography */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            SF Pro Typography
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-sm">
            <Typography variant="large-title" weight="bold">
              Large Title
            </Typography>
            <Typography variant="title-1">Title 1</Typography>
            <Typography variant="title-2">Title 2</Typography>
            <Typography variant="title-3">Title 3</Typography>
            <Typography variant="headline" weight="semibold">
              Headline (Semibold)
            </Typography>
            <Typography variant="body">Body - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="callout">Callout text for emphasis</Typography>
            <Typography variant="subheadline" color="secondary">
              Subheadline - Secondary information
            </Typography>
            <Typography variant="footnote" color="secondary">
              Footnote - Additional details
            </Typography>
            <Typography variant="caption-1" color="tertiary">
              Caption 1
            </Typography>
            <Typography variant="caption-2" color="tertiary">
              Caption 2
            </Typography>
          </Card>
        </View>

        {/* iOS System Colors */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS System Colors
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-md">
            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Primary Colors
              </Typography>
              <View className="flex-row flex-wrap gap-ios-sm">
                <View style={{ backgroundColor: colors.isDark ? '#0A84FF' : '#007AFF', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#30D158' : '#34C759', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#5E5CE6' : '#5856D6', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#FF9F0A' : '#FF9500', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#FF375F' : '#FF2D55', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#BF5AF2' : '#AF52DE', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#FF453A' : '#FF3B30', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#64D2FF' : '#5AC8FA', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#FFD60A' : '#FFCC00', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
              </View>
              <View className="flex-row flex-wrap gap-ios-xs mt-ios-xs">
                <Typography variant="caption-2" color="tertiary">
                  Blue
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Green
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Indigo
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Orange
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Pink
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Purple
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Red
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Teal
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  Yellow
                </Typography>
              </View>
            </View>

            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Gray Scale
              </Typography>
              <View className="flex-row flex-wrap gap-ios-sm">
                <View style={{ backgroundColor: colors.isDark ? '#8E8E93' : '#8E8E93', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#636366' : '#AEAEB2', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#48484A' : '#C7C7CC', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#3A3A3C' : '#D1D1D6', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#2C2C2E' : '#E5E5EA', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
                <View style={{ backgroundColor: colors.isDark ? '#1C1C1E' : '#F2F2F7', width: 60, height: 60, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }} />
              </View>
            </View>
          </Card>
        </View>

        {/* Buttons */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Buttons
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-sm">
            <Typography variant="headline" weight="semibold" className="mb-ios-xs">
              Button Styles
            </Typography>
            <Button style="filled">Filled Button</Button>
            <Button style="tinted">Tinted Button</Button>
            <Button style="bordered">Bordered Button</Button>
            <Button style="plain">Plain Button</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button Roles
            </Typography>
            <Button style="filled" role="normal">
              Normal
            </Button>
            <Button style="filled" role="destructive">
              Destructive
            </Button>
            <Button style="filled" role="cancel">
              Cancel
            </Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button Sizes (44pt minimum touch)
            </Typography>
            <Button size="sm">Small (36pt)</Button>
            <Button size="md">Medium (44pt)</Button>
            <Button size="lg">Large (50pt)</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              Button States
            </Typography>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </Card>
        </View>

        {/* Badges */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Badges
          </Typography>
          <Card variant="inset-grouped">
            <View className="flex-row flex-wrap gap-ios-xs">
              <Badge color="blue">Blue</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="red">Red</Badge>
              <Badge color="orange">Orange</Badge>
              <Badge color="purple">Purple</Badge>
              <Badge color="gray">Gray</Badge>
            </View>
          </Card>
        </View>

        {/* Alerts */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Alerts
          </Typography>
          <View className="gap-ios-sm">
            <Alert type="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              This action cannot be undone. Please proceed with caution.
            </Alert>
            <Alert type="error" title="Error">
              An error occurred while processing your request.
            </Alert>
            <Alert type="info" title="Information">
              This is an informational message with helpful details.
            </Alert>
          </View>
        </View>

        {/* Cards */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Cards
          </Typography>
          <View className="gap-ios-sm">
            <Card variant="grouped">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Grouped Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                Standard iOS grouped background style
              </Typography>
            </Card>

            <Card variant="inset-grouped">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Inset Grouped Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                iOS inset grouped style with margins
              </Typography>
            </Card>

            <Card variant="plain">
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                Plain Card
              </Typography>
              <Typography variant="subheadline" color="secondary">
                Plain background for minimal designs
              </Typography>
            </Card>
          </View>
        </View>

        {/* Spacing System */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Spacing System
          </Typography>
          <Card variant="inset-grouped" className="gap-ios-xs">
            <Typography variant="footnote" color="secondary" className="mb-ios-sm">
              Standard iOS spacing values
            </Typography>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-xs min-h-[16px] bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                xs (4px)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-sm min-h-[16px] bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                sm (8px)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-md min-h-[16px] bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                md (16px - iPhone margins)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-lg min-h-[16px] bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                lg (24px - iPad margins)
              </Typography>
            </View>
            <View className="flex-row items-center gap-ios-sm">
              <View className="w-ios-touch min-h-[16px] bg-ios-green dark:bg-ios-green-dark rounded-ios-sm" />
              <Typography variant="caption-1" color="secondary">
                touch (44px - minimum tap target)
              </Typography>
            </View>
          </Card>
        </View>

        {/* Border Radius */}
        <View className="mb-ios-lg">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            iOS Border Radius
          </Typography>
          <Card variant="inset-grouped">
            <View className="flex-row flex-wrap gap-ios-sm">
              <View className="w-16 aspect-square bg-ios-blue dark:bg-ios-blue-dark rounded-ios-sm" />
              <View className="w-16 aspect-square bg-ios-blue dark:bg-ios-blue-dark rounded-ios-md" />
              <View className="w-16 aspect-square bg-ios-blue dark:bg-ios-blue-dark rounded-ios-lg" />
              <View className="w-16 aspect-square bg-ios-blue dark:bg-ios-blue-dark rounded-ios-xl" />
              <View className="w-16 aspect-square bg-ios-blue dark:bg-ios-blue-dark rounded-full" />
            </View>
            <View className="flex-row flex-wrap gap-ios-sm mt-ios-xs">
              <Typography variant="caption-2" color="tertiary">
                sm (8px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                md (10px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                lg (12px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                xl (16px)
              </Typography>
              <Typography variant="caption-2" color="tertiary">
                full
              </Typography>
            </View>
          </Card>
        </View>

        {/* HIG Compliance */}
        <View className="mb-ios-xl">
          <Typography variant="title-2" weight="bold" className="mb-ios-sm">
            Apple HIG Compliance
          </Typography>
          <Alert type="info">
            This design system follows Apple's Human Interface Guidelines including semantic colors, SF Pro typography,
            44pt minimum touch targets, and iOS-native spacing patterns. All components automatically adapt to Dark Mode.
          </Alert>
        </View>
      </View>
    </ScrollView>
  );
}
