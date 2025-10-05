import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { useThemeContext } from '@/contexts/preferences-context';

export default function TestDetailScreen() {
  const { colors } = useThemeContext();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      <View style={styles.content}>
        <Typography variant="large-title" weight="bold" style={{ marginBottom: 8 }}>
          Test Detail
        </Typography>
        <Typography variant="body" color="secondary" style={{ marginBottom: 24 }}>
          This detail screen tests the back button navigation.
        </Typography>

        <Card variant="inset-grouped" style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="headline" weight="semibold" style={{ marginBottom: 8 }}>
            Header Test
          </Typography>
          <Typography variant="body" color="secondary">
            • Check if the back button appears in the header
          </Typography>
          <Typography variant="body" color="secondary">
            • Verify the header title shows "Test Detail"
          </Typography>
          <Typography variant="body" color="secondary">
            • Confirm no header border (headerShadowVisible: false)
          </Typography>
          <Typography variant="body" color="secondary">
            • Ensure theme-aware colors are applied
          </Typography>
        </Card>

        <Alert type="info" title="Navigation Check">
          Tap the back button to return to the Test Screen. The drawer icon should reappear on the Test Screen.
        </Alert>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
