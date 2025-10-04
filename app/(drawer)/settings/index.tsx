import React from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SettingsList } from '@/components/ui/settings-list';
import { useThemeContext, useLanguageContext, LANGUAGE_LABELS } from '@/contexts/preferences-context';

/**
 * Main Settings Screen
 *
 * Discord-inspired settings layout with:
 * - Section headers with proper hierarchy
 * - Medium-weight typography
 * - Generous spacing and padding
 * - Automatic separators
 */
export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useThemeContext();
  const { language } = useLanguageContext();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <SettingsList>
        <SettingsList.Section title="USER SETTINGS" uppercase topMargin={16}>
          <SettingsList.Item
            title="Appearance"
            subtitle="Theme, fonts, and display"
            icon="paintpalette.fill"
            titleWeight="semibold"
            accessory="chevron"
            onPress={() => router.push('/(drawer)/settings/appearance')}
          />
          <SettingsList.Item
            title="Language"
            subtitle={LANGUAGE_LABELS[language].native}
            value={language === 'en' ? 'English' : '简体中文'}
            icon="globe"
            titleWeight="semibold"
            accessory="chevron"
            onPress={() => router.push('/(drawer)/settings/language')}
          />
        </SettingsList.Section>

        {/* Future sections */}
        <SettingsList.Section title="APP SETTINGS" uppercase>
          <SettingsList.Item
            title="Notifications"
            subtitle="Coming soon"
            icon="bell.fill"
            titleWeight="semibold"
            accessory="none"
            disabled
          />
          <SettingsList.Item
            title="Privacy"
            subtitle="Coming soon"
            icon="lock.fill"
            titleWeight="semibold"
            accessory="none"
            disabled
          />
        </SettingsList.Section>
      </SettingsList>
    </ScrollView>
  );
}
