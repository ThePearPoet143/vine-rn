import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Card } from '@/components/ui/card';
import { SettingsList } from '@/components/ui/settings-list';
import { SectionHeader } from '@/components/ui/section-header';
import { Typography } from '@/components/ui/typography';
import { Switch } from '@/components/ui/switch';
import { Divider } from '@/components/ui/divider';
import { useThemeContext, useFontContext } from '@/contexts/preferences-context';
import { THEME_OPTIONS, FONT_OPTIONS } from '@/constants/appearance';
import { getAccentBlue } from '@/constants/colors';

/**
 * Appearance Settings Screen - Discord-Inspired
 *
 * Features:
 * - Section headers with proper hierarchy
 * - Semibold list item titles
 * - Automatic separators with icon inset
 * - 56px list item height for better touch targets
 * - Medium-weight typography throughout
 *
 * Settings:
 * - Reading theme (6 options)
 * - Font family (3 options)
 * - Font size (slider)
 */
export default function AppearanceScreen() {
  const { colors, themeMode, setThemeMode } = useThemeContext();
  const { fontFamily, setFontFamily, fontSize, setFontSize } = useFontContext();
  const [useCustomFontSize, setUseCustomFontSize] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <SettingsList>
        {/* Reading Theme Section */}
        <SettingsList.Section title="READING THEME" uppercase topMargin={16}>
          {THEME_OPTIONS.map((theme) => (
            <SettingsList.Item
              key={theme.mode}
              title={theme.label}
              icon={theme.icon}
              titleWeight="semibold"
              accessory="radio"
              selected={themeMode === theme.mode}
              onPress={() => setThemeMode(theme.mode)}
            />
          ))}
        </SettingsList.Section>

        {/* Description */}
        <View style={{ marginTop: 8 }}>
          <Typography variant="footnote" color="secondary">
            All themes meet WCAG AAA standards (7:1+ contrast) for comfortable reading.
          </Typography>
        </View>

        {/* Font Family Section */}
        <SettingsList.Section title="FONT FAMILY" uppercase>
          {FONT_OPTIONS.map((font) => (
            <SettingsList.Item
              key={font.family}
              title={font.label}
              titleWeight="semibold"
              accessory="radio"
              selected={fontFamily === font.family}
              onPress={() => setFontFamily(font.family)}
            />
          ))}
        </SettingsList.Section>

        {/* Font Size Section */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="FONT SIZE" uppercase bottomMargin={8} />
          <Card variant="inset-grouped" className="p-0">
            <SettingsList.Item
              title="Custom Font Size"
              titleWeight="semibold"
              accessory="none"
              onPress={() => setUseCustomFontSize(!useCustomFontSize)}
            >
              <Switch value={useCustomFontSize} onValueChange={setUseCustomFontSize} />
            </SettingsList.Item>

            {/* Font Size Slider - Only show when custom is enabled */}
            {useCustomFontSize && (
              <View style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 }}>
                <Divider insetLeft={0} insetRight={0} />
                <View style={{ marginTop: 16 }}>
                  <View className="flex-row justify-between items-center mb-ios-xs">
                    <Typography variant="caption-1" weight="semibold" color="secondary">
                      A
                    </Typography>
                    <Typography variant="body" weight="medium" color="secondary">
                      {Math.round(fontSize * 100)}%
                    </Typography>
                    <Typography variant="title-3" weight="semibold" color="secondary">
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
                    minimumTrackTintColor={getAccentBlue(colors.isDark)}
                    maximumTrackTintColor={colors.separator}
                    thumbTintColor={getAccentBlue(colors.isDark)}
                  />
                  <Typography variant="footnote" color="secondary" style={{ marginTop: 8 }}>
                    Font size works with iOS Text Size settings for maximum flexibility.
                  </Typography>
                </View>
              </View>
            )}
          </Card>
        </View>

        {/* Preview Section */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="PREVIEW" uppercase bottomMargin={8} />
          <Card variant="inset-grouped" className="p-ios-md">
            <Typography variant="body" weight="regular" style={{ color: colors.text, marginBottom: 12 }}>
              "In the beginning God created the heavens and the earth." — Genesis 1:1
            </Typography>
            <Typography variant="body" weight="regular" style={{ color: colors.secondaryText }}>
              起初，神创造天地。— 创世记 1:1
            </Typography>
          </Card>
        </View>
      </SettingsList>
    </ScrollView>
  );
}
