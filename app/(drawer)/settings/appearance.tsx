import React from 'react';
import { ScrollView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Card } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { Typography } from '@/components/ui/typography';
import { useThemeContext } from '@/contexts/theme-context';
import { useFontContext, type FontFamily } from '@/contexts/font-context';
import { type ThemeMode, Themes } from '@/constants/themes';

/**
 * Appearance Settings Screen
 *
 * User-facing settings for:
 * - Reading theme (6 options with checkmark for current)
 * - Font family (3 options with checkmark for current)
 * - Font size (slider)
 *
 * Follows iOS Settings app pattern with grouped lists
 */
export default function AppearanceScreen() {
  const { colors, themeMode, setThemeMode } = useThemeContext();
  const { fontFamily, setFontFamily, fontSize, setFontSize } = useFontContext();

  const themes: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'auto', label: 'Auto (System)', icon: 'circle.lefthalf.filled' },
    { mode: 'light', label: 'Light', icon: 'sun.max.fill' },
    { mode: 'dark', label: 'Dark', icon: 'moon.fill' },
    { mode: 'sepia', label: 'Sepia', icon: 'book.fill' },
    { mode: 'warm-dark', label: 'Warm Dark', icon: 'moon.stars.fill' },
    { mode: 'green', label: 'Green', icon: 'leaf.fill' },
  ];

  const fonts: { family: FontFamily; label: string }[] = [
    { family: 'system', label: 'System (SF Pro)' },
    { family: 'serif', label: 'Serif (Georgia)' },
    { family: 'mono', label: 'Mono (Menlo)' },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Reading Theme */}
      <View className="mb-ios-sm">
        <Typography
          variant="footnote"
          color="secondary"
          style={{ paddingHorizontal: 16, marginBottom: 8 }}
        >
          READING THEME
        </Typography>
        <Card variant="inset-grouped">
          {themes.map((theme, index) => (
            <View key={theme.mode}>
              <ListItem
                title={theme.label}
                icon={theme.icon}
                accessory={themeMode === theme.mode ? 'checkmark' : 'none'}
                onPress={() => setThemeMode(theme.mode)}
              />
              {index < themes.length - 1 && (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: colors.separator,
                    marginLeft: 52,
                  }}
                />
              )}
            </View>
          ))}
        </Card>
        <Typography
          variant="footnote"
          color="secondary"
          style={{ paddingHorizontal: 16, marginTop: 8 }}
        >
          All themes meet WCAG AAA standards (7:1+ contrast) for comfortable reading.
        </Typography>
      </View>

      {/* Font Family */}
      <View className="mb-ios-sm mt-ios-lg">
        <Typography
          variant="footnote"
          color="secondary"
          style={{ paddingHorizontal: 16, marginBottom: 8 }}
        >
          FONT FAMILY
        </Typography>
        <Card variant="inset-grouped">
          {fonts.map((font, index) => (
            <View key={font.family}>
              <ListItem
                title={font.label}
                accessory={fontFamily === font.family ? 'checkmark' : 'none'}
                onPress={() => setFontFamily(font.family)}
              />
              {index < fonts.length - 1 && (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: colors.separator,
                    marginLeft: 16,
                  }}
                />
              )}
            </View>
          ))}
        </Card>
      </View>

      {/* Font Size */}
      <View className="mb-ios-lg mt-ios-lg">
        <Typography
          variant="footnote"
          color="secondary"
          style={{ paddingHorizontal: 16, marginBottom: 8 }}
        >
          FONT SIZE
        </Typography>
        <Card variant="inset-grouped" className="p-ios-md">
          <View className="flex-row justify-between items-center mb-ios-xs">
            <Typography variant="caption-1" color="secondary">
              A
            </Typography>
            <Typography variant="body" color="secondary">
              {Math.round(fontSize * 100)}%
            </Typography>
            <Typography variant="title-3" color="secondary">
              A
            </Typography>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0.8}
            maximumValue={1.5}
            step={0.1}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor={colors.isDark ? '#0A84FF' : '#007AFF'}
            maximumTrackTintColor={colors.separator}
            thumbTintColor={colors.isDark ? '#0A84FF' : '#007AFF'}
          />
          <Typography variant="footnote" color="secondary" style={{ marginTop: 8 }}>
            Font size works with iOS Text Size settings for maximum flexibility.
          </Typography>
        </Card>
      </View>

      {/* Preview */}
      <View className="mb-ios-xl">
        <Typography
          variant="footnote"
          color="secondary"
          style={{ paddingHorizontal: 16, marginBottom: 8 }}
        >
          PREVIEW
        </Typography>
        <Card variant="inset-grouped" className="p-ios-md">
          <Typography variant="body" style={{ color: colors.text }}>
            "In the beginning God created the heavens and the earth." — Genesis 1:1
          </Typography>
        </Card>
      </View>
    </ScrollView>
  );
}

// Import StyleSheet for hairline width
import { StyleSheet } from 'react-native';
