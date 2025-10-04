import React, { useState } from 'react';
import { View, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Typography } from '@/components/ui/typography';
import { SettingsList } from '@/components/ui/settings-list';
import { SectionHeader } from '@/components/ui/section-header';
import { useFontContext, useThemeContext, type FontFamily } from '@/contexts/preferences-context';
import { type ThemeMode, Themes } from '@/constants/themes';
import { getAccentBlue } from '@/constants/colors';

type Language = 'en' | 'zh';

const translations = {
  en: {
    title: 'Design System',
    subtitle: 'Reading experience with accessibility-first design',
    readingTheme: 'Reading Theme',
    fontFamily: 'Font Family',
    fontSize: 'Font Size',
    allThemesWCAG: 'All themes meet WCAG AAA standards (7:1+ contrast) for comfortable extended reading.',
    fontSizeWorks: 'Font size works together with iOS Text Size settings for maximum flexibility.',
    bibleVerse: '"In the beginning God created the heavens and the earth." — Genesis 1:1',
    auto: 'Auto (System)',
    light: 'Light',
    dark: 'Dark',
    parchment: 'Parchment',
    night: 'Night',
    sepia: 'Sepia',
    warmDark: 'Warm Dark',
    green: 'Green',
    system: 'System',
    serif: 'Serif',
    mono: 'Mono',
    deviceInfo: 'Device Information',
    screenWidth: 'Screen Width',
    typography: 'Typography',
    colorSystem: 'Color System',
    iosDynamicType: 'iOS Dynamic Type',
    dynamicTypeDesc: 'All text in this app automatically scales with iOS Text Size settings. Try changing it in Settings → Accessibility → Display & Text Size → Larger Text.',
    accessibilitySupport: 'Accessibility Support',
    accessibilitySupportDesc: 'Text automatically scales with your device settings for optimal readability. This design system supports all iOS Dynamic Type sizes including accessibility sizes.',
    sfProTypography: 'SF Pro Typography',
    largeTitle: 'Large Title',
    title1: 'Title 1',
    title2: 'Title 2',
    title3: 'Title 3',
    headline: 'Headline (Semibold)',
    body: 'Body - The quick brown fox jumps over the lazy dog',
    callout: 'Callout text for emphasis',
    subheadline: 'Subheadline - Secondary information',
    footnote: 'Footnote - Additional details',
    caption1: 'Caption 1',
    caption2: 'Caption 2',
    iosSystemColors: 'iOS System Colors',
    primaryColors: 'Primary Colors',
    grayScale: 'Gray Scale',
    iosButtons: 'iOS Buttons',
    buttonStyles: 'Button Styles',
    filled: 'Filled Button',
    tinted: 'Tinted Button',
    bordered: 'Bordered Button',
    plain: 'Plain Button',
    buttonRoles: 'Button Roles',
    normal: 'Normal',
    destructive: 'Destructive',
    cancel: 'Cancel',
    buttonSizes: 'Button Sizes (44pt minimum touch)',
    small: 'Small (36pt)',
    medium: 'Medium (44pt)',
    large: 'Large (50pt)',
    buttonStates: 'Button States',
    disabled: 'Disabled',
    loading: 'Loading',
    badges: 'Badges',
    blue: 'Blue',
    green: 'Green',
    red: 'Red',
    orange: 'Orange',
    purple: 'Purple',
    gray: 'Gray',
    indigo: 'Indigo',
    pink: 'Pink',
    teal: 'Teal',
    yellow: 'Yellow',
    alerts: 'Alerts',
    success: 'Success',
    successMsg: 'Your changes have been saved successfully.',
    warning: 'Warning',
    warningMsg: 'This action cannot be undone. Please proceed with caution.',
    error: 'Error',
    errorMsg: 'An error occurred while processing your request.',
    info: 'Information',
    infoMsg: 'This is an informational message with helpful details.',
    cards: 'Cards',
    groupedCard: 'Grouped Card',
    groupedCardDesc: 'Standard iOS grouped background style',
    insetGroupedCard: 'Inset Grouped Card',
    insetGroupedCardDesc: 'iOS inset grouped style with margins',
    plainCard: 'Plain Card',
    plainCardDesc: 'Plain background for minimal designs',
    spacingSystem: 'iOS Spacing System',
    spacingDesc: 'Standard iOS spacing values',
    borderRadius: 'Border Radius',
    borderRadiusDesc: 'iOS-style corner radii for different elements',
    higCompliance: 'Human Interface Guidelines Compliance',
    higDesc: 'This design system follows Apple\'s Human Interface Guidelines for iOS with:\n• SF Pro font family (system default)\n• iOS Dynamic Type support\n• Semantic color system\n• Standard spacing and sizing\n• Accessibility-first approach',
  },
  zh: {
    title: '设计系统',
    subtitle: '以无障碍为先的阅读体验',
    readingTheme: '阅读主题',
    fontFamily: '字体',
    fontSize: '字体大小',
    allThemesWCAG: '所有主题均符合 WCAG AAA 标准（7:1+ 对比度），提供舒适的长时间阅读体验。',
    fontSizeWorks: '字体大小与 iOS 文字大小设置协同工作，提供最大灵活性。',
    bibleVerse: '"起初，神创造天地。" — 创世记 1:1',
    auto: '自动（跟随系统）',
    light: '明亮',
    dark: '深色',
    parchment: '羊皮纸',
    night: '夜间',
    sepia: '棕褐',
    warmDark: '暖色深色',
    green: '绿色',
    system: '系统',
    serif: '衬线',
    mono: '等宽',
    deviceInfo: '设备信息',
    screenWidth: '屏幕宽度',
    typography: '文字排版',
    colorSystem: '颜色系统',
    iosDynamicType: 'iOS 动态字体',
    dynamicTypeDesc: '本应用中的所有文字会自动随 iOS 文字大小设置缩放。可在"设置 → 辅助功能 → 显示与文字大小 → 更大文字"中调整。',
    accessibilitySupport: '辅助功能支持',
    accessibilitySupportDesc: '文字会自动随设备设置缩放以获得最佳可读性。本设计系统支持所有 iOS 动态字体大小，包括辅助功能尺寸。',
    sfProTypography: 'SF Pro 文字排版',
    largeTitle: '超大标题',
    title1: '标题 1',
    title2: '标题 2',
    title3: '标题 3',
    headline: '标题（半粗体）',
    body: '正文 - 快速的棕色狐狸跳过懒狗',
    callout: '强调文字',
    subheadline: '副标题 - 次要信息',
    footnote: '脚注 - 附加详情',
    caption1: '说明文字 1',
    caption2: '说明文字 2',
    iosSystemColors: 'iOS 系统颜色',
    primaryColors: '主要颜色',
    grayScale: '灰度',
    iosButtons: 'iOS 按钮',
    buttonStyles: '按钮样式',
    filled: '填充按钮',
    tinted: '着色按钮',
    bordered: '边框按钮',
    plain: '纯文本按钮',
    buttonRoles: '按钮角色',
    normal: '普通',
    destructive: '危险',
    cancel: '取消',
    buttonSizes: '按钮尺寸（44pt 最小触摸区域）',
    small: '小（36pt）',
    medium: '中（44pt）',
    large: '大（50pt）',
    buttonStates: '按钮状态',
    disabled: '禁用',
    loading: '加载中',
    badges: '徽章',
    blue: '蓝色',
    green: '绿色',
    red: '红色',
    orange: '橙色',
    purple: '紫色',
    gray: '灰色',
    indigo: '靛蓝',
    pink: '粉色',
    teal: '青色',
    yellow: '黄色',
    alerts: '提示框',
    success: '成功',
    successMsg: '您的更改已成功保存。',
    warning: '警告',
    warningMsg: '此操作无法撤销。请谨慎操作。',
    error: '错误',
    errorMsg: '处理您的请求时发生错误。',
    info: '信息',
    infoMsg: '这是一条包含有用详情的信息提示。',
    cards: '卡片',
    groupedCard: '分组卡片',
    groupedCardDesc: '标准 iOS 分组背景样式',
    insetGroupedCard: '内嵌分组卡片',
    insetGroupedCardDesc: 'iOS 内嵌分组样式，带边距',
    plainCard: '纯色卡片',
    plainCardDesc: '极简设计的纯色背景',
    spacingSystem: 'iOS 间距系统',
    spacingDesc: '标准 iOS 间距值',
    borderRadius: '圆角',
    borderRadiusDesc: '不同元素的 iOS 风格圆角',
    higCompliance: '人机界面指南合规性',
    higDesc: '本设计系统遵循 Apple 的 iOS 人机界面指南，包括：\n• SF Pro 字体系列（系统默认）\n• iOS 动态字体支持\n• 语义化颜色系统\n• 标准间距和尺寸\n• 无障碍优先方法',
    buttonStyles: '按钮样式',
    filled: '填充按钮',
    tinted: '色调按钮',
    bordered: '边框按钮',
    plain: '朴素按钮',
  },
};

export default function DesignSystemScreen() {
  const { width } = useWindowDimensions();
  const { fontFamily, setFontFamily, fontSize, setFontSize } = useFontContext();
  const { themeMode, setThemeMode, colors } = useThemeContext();
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="p-ios-md">
        {/* Language Switcher */}
        <View className="mb-ios-md">
          <View className="flex-row gap-ios-xs">
            <Pressable
              onPress={() => setLanguage('en')}
              style={{
                backgroundColor: language === 'en' ? '#007AFF' : colors.secondaryBackground,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Typography
                variant="body"
                weight="medium"
                style={{ color: language === 'en' ? '#FFFFFF' : colors.text }}
              >
                English
              </Typography>
            </Pressable>
            <Pressable
              onPress={() => setLanguage('zh')}
              style={{
                backgroundColor: language === 'zh' ? '#007AFF' : colors.secondaryBackground,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Typography
                variant="body"
                weight="medium"
                style={{ color: language === 'zh' ? '#FFFFFF' : colors.text }}
              >
                中文
              </Typography>
            </Pressable>
          </View>
        </View>

        {/* Header */}
        <View className="mb-ios-lg">
          <Typography variant="large-title" weight="bold" className="mb-ios-xs">
            {t.title}
          </Typography>
          <Typography variant="body" color="secondary">
            {t.subtitle}
          </Typography>
        </View>

        {/* Reading Theme Picker */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.readingTheme} uppercase={false} bottomMargin={8} />
          <SettingsList>
            <SettingsList.Section>
              {(['auto', 'light', 'dark', 'parchment', 'night', 'sepia', 'warm-dark', 'green'] as ThemeMode[]).map((mode, index, arr) => {
                const themeColors = mode === 'auto' ? colors : Themes[mode as Exclude<ThemeMode, 'auto'>];
                const themeLabel = mode === 'auto' ? t.auto :
                                 mode === 'light' ? t.light :
                                 mode === 'dark' ? t.dark :
                                 mode === 'parchment' ? t.parchment :
                                 mode === 'sepia' ? t.sepia :
                                 mode === 'night' ? t.night :
                                 mode === 'warm-dark' ? t.warmDark :
                                 t.green;

                return (
                  <SettingsList.Item
                    key={mode}
                    title={themeLabel}
                    subtitle={mode !== 'auto' ? `${themeColors.description} • ${themeColors.contrastRatio}` : undefined}
                    titleWeight="semibold"
                    accessory="radio"
                    selected={themeMode === mode}
                    onPress={() => setThemeMode(mode)}
                    showSeparator={index < arr.length - 1}
                  />
                );
              })}
            </SettingsList.Section>
          </SettingsList>
          <View style={{ marginTop: 8, paddingHorizontal: 0 }}>
            <Typography variant="footnote" color="secondary">
              {t.allThemesWCAG}
            </Typography>
          </View>
        </View>

        {/* Font Family Switcher */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.fontFamily} uppercase={false} bottomMargin={8} />
          <SettingsList>
            <SettingsList.Section>
              {(['system', 'serif', 'mono'] as FontFamily[]).map((font, index, arr) => (
                <SettingsList.Item
                  key={font}
                  title={font === 'system' ? t.system : font === 'serif' ? t.serif : t.mono}
                  titleWeight="semibold"
                  accessory="radio"
                  selected={fontFamily === font}
                  onPress={() => setFontFamily(font)}
                  showSeparator={index < arr.length - 1}
                />
              ))}
            </SettingsList.Section>
          </SettingsList>
        </View>

        {/* Font Size */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={`${t.fontSize}: ${Math.round(fontSize * 100)}%`} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped">
            <View className="flex-row items-center gap-ios-sm" style={{ padding: 16 }}>
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
                    style={{ backgroundColor: getAccentBlue(colors.isDark), width: `${((fontSize - 0.5) / 1.5) * 100}%` }}
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
            <View className="flex-row justify-between px-ios-md pb-ios-xs">
              <Typography variant="caption-2" color="tertiary">50%</Typography>
              <Typography variant="caption-2" color="tertiary">100%</Typography>
              <Typography variant="caption-2" color="tertiary">200%</Typography>
            </View>
          </Card>
          <View style={{ marginTop: 8 }}>
            <Typography variant="footnote" color="secondary">
              {t.fontSizeWorks}
            </Typography>
          </View>
        </View>

        {/* Preview */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title="PREVIEW" uppercase bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }}>
            <Typography variant="body" className="text-center">
              {t.bibleVerse}
            </Typography>
          </Card>
        </View>

        {/* Device Info */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.deviceInfo} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }}>
            <View className="gap-ios-xs">
              <Typography variant="body" color="secondary">
                <Typography variant="body" weight="semibold">{t.screenWidth}:</Typography> {width.toFixed(0)}px
              </Typography>
              <Typography variant="body" color="secondary">
                <Typography variant="body" weight="semibold">{t.typography}:</Typography> SF Pro (Dynamic Type)
              </Typography>
              <Typography variant="body" color="secondary">
                <Typography variant="body" weight="semibold">{t.colorSystem}:</Typography> iOS Semantic Colors
              </Typography>
            </View>
          </Card>
        </View>

        {/* Dynamic Type Demo */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.iosDynamicType} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }}>
            <Typography variant="body" color="secondary" style={{ marginBottom: 12 }}>
              {t.dynamicTypeDesc}
            </Typography>
            <Alert type="info" title={t.accessibilitySupport}>
              {t.accessibilitySupportDesc}
            </Alert>
          </Card>
        </View>

        {/* Typography */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.sfProTypography} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }} className="gap-ios-sm">
            <Typography variant="large-title" weight="bold">
              {t.largeTitle}
            </Typography>
            <Typography variant="title-1">{t.title1}</Typography>
            <Typography variant="title-2">{t.title2}</Typography>
            <Typography variant="title-3">{t.title3}</Typography>
            <Typography variant="headline" weight="semibold">
              {t.headline}
            </Typography>
            <Typography variant="body">{t.body}</Typography>
            <Typography variant="callout">{t.callout}</Typography>
            <Typography variant="subheadline" color="secondary">
              {t.subheadline}
            </Typography>
            <Typography variant="footnote" color="secondary">
              {t.footnote}
            </Typography>
            <Typography variant="caption-1" color="tertiary">
              {t.caption1}
            </Typography>
            <Typography variant="caption-2" color="tertiary">
              {t.caption2}
            </Typography>
          </Card>
        </View>

        {/* iOS System Colors */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.iosSystemColors} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }} className="gap-ios-md">
            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                {t.primaryColors}
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
                  {t.blue}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.green}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.indigo}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.orange}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.pink}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.purple}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.red}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.teal}
                </Typography>
                <Typography variant="caption-2" color="tertiary">
                  {t.yellow}
                </Typography>
              </View>
            </View>

            <View>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                {t.grayScale}
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
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.iosButtons} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }} className="gap-ios-sm">
            <Typography variant="headline" weight="semibold" className="mb-ios-xs">
              {t.buttonStyles}
            </Typography>
            <Button style="filled">{t.filled}</Button>
            <Button style="tinted">{t.tinted}</Button>
            <Button style="bordered">{t.bordered}</Button>
            <Button style="plain">{t.plain}</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              {t.buttonRoles}
            </Typography>
            <Button style="filled" role="normal">
              {t.normal}
            </Button>
            <Button style="filled" role="destructive">
              {t.destructive}
            </Button>
            <Button style="filled" role="cancel">
              {t.cancel}
            </Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              {t.buttonSizes}
            </Typography>
            <Button size="sm">{t.small}</Button>
            <Button size="md">{t.medium}</Button>
            <Button size="lg">{t.large}</Button>

            <Typography variant="headline" weight="semibold" className="mt-ios-md mb-ios-xs">
              {t.buttonStates}
            </Typography>
            <Button disabled>{t.disabled}</Button>
            <Button loading>{t.loading}</Button>
          </Card>
        </View>

        {/* Badges */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.badges} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }}>
            <View className="flex-row flex-wrap gap-ios-xs">
              <Badge color="blue">{t.blue}</Badge>
              <Badge color="green">{t.green}</Badge>
              <Badge color="red">{t.red}</Badge>
              <Badge color="orange">{t.orange}</Badge>
              <Badge color="purple">{t.purple}</Badge>
              <Badge color="gray">{t.gray}</Badge>
            </View>
          </Card>
        </View>

        {/* Alerts */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.alerts} uppercase={false} bottomMargin={8} />
          <View className="gap-ios-sm">
            <Alert type="success" title={t.success}>
              {t.successMsg}
            </Alert>
            <Alert type="warning" title={t.warning}>
              {t.warningMsg}
            </Alert>
            <Alert type="error" title={t.error}>
              {t.errorMsg}
            </Alert>
            <Alert type="info" title={t.info}>
              {t.infoMsg}
            </Alert>
          </View>
        </View>

        {/* Cards */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.cards} uppercase={false} bottomMargin={8} />
          <View className="gap-ios-sm">
            <Card variant="grouped" style={{ padding: 16 }}>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                {t.groupedCard}
              </Typography>
              <Typography variant="subheadline" color="secondary">
                {t.groupedCardDesc}
              </Typography>
            </Card>

            <Card variant="inset-grouped" style={{ padding: 16 }}>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                {t.insetGroupedCard}
              </Typography>
              <Typography variant="subheadline" color="secondary">
                {t.insetGroupedCardDesc}
              </Typography>
            </Card>

            <Card variant="plain" style={{ padding: 16 }}>
              <Typography variant="headline" weight="semibold" className="mb-ios-xs">
                {t.plainCard}
              </Typography>
              <Typography variant="subheadline" color="secondary">
                {t.plainCardDesc}
              </Typography>
            </Card>
          </View>
        </View>

        {/* Spacing System */}
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.spacingSystem} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }} className="gap-ios-xs">
            <Typography variant="footnote" color="secondary" className="mb-ios-sm">
              {t.spacingDesc}
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
        <View style={{ marginBottom: 24 }}>
          <SectionHeader title={t.borderRadius} uppercase={false} bottomMargin={8} />
          <Card variant="inset-grouped" style={{ padding: 16 }}>
            <Typography variant="footnote" color="secondary" className="mb-ios-sm">
              {t.borderRadiusDesc}
            </Typography>
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
            {t.higCompliance}
          </Typography>
          <Alert type="info">
            {t.higDesc}
          </Alert>
        </View>
      </View>
    </ScrollView>
  );
}
