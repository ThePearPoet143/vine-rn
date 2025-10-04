import React from 'react';
import { ScrollView } from 'react-native';
import { SettingsList } from '@/components/ui/settings-list';
import { useThemeContext, useLanguageContext, LANGUAGE_LABELS, type Language } from '@/contexts/preferences-context';

const LANGUAGE_OPTIONS: Language[] = ['en', 'zh'];

export default function LanguageScreen() {
  const { colors } = useThemeContext();
  const { language, setLanguage } = useLanguageContext();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <SettingsList>
        <SettingsList.Section title="APP LANGUAGE" uppercase topMargin={16}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <SettingsList.Item
              key={lang}
              title={LANGUAGE_LABELS[lang].native}
              subtitle={LANGUAGE_LABELS[lang].english}
              titleWeight="semibold"
              accessory="radio"
              selected={language === lang}
              onPress={() => setLanguage(lang)}
            />
          ))}
        </SettingsList.Section>
      </SettingsList>
    </ScrollView>
  );
}
