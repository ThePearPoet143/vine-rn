import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/card';
import { ListItem } from '@/components/ui/list-item';
import { Typography } from '@/components/ui/typography';
import { useThemeContext } from '@/contexts/theme-context';

/**
 * Main Settings Screen
 *
 * Lists all setting categories following iOS Settings app pattern
 * Initial category: Appearance
 */
export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useThemeContext();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="mb-ios-lg">
        <Card variant="inset-grouped">
          <ListItem
            title="Appearance"
            subtitle="Theme, fonts, and display"
            icon="paintpalette.fill"
            accessory="chevron"
            onPress={() => router.push('/(drawer)/settings/appearance')}
          />
        </Card>
      </View>

      {/* Placeholder for future settings categories */}
      <View className="mb-ios-lg">
        <Typography variant="footnote" color="secondary" style={{ paddingHorizontal: 16 }}>
          More settings coming soon
        </Typography>
      </View>
    </ScrollView>
  );
}
