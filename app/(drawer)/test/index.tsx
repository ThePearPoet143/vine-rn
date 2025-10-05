import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/contexts/preferences-context';

export default function TestScreen() {
  const { colors } = useThemeContext();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      <View style={styles.content}>
        <Typography variant="large-title" weight="bold" style={{ marginBottom: 16 }}>
          Test Screen
        </Typography>
        <Typography variant="body" color="secondary" style={{ marginBottom: 24 }}>
          This is a test screen to verify native header implementation with drawer icon.
        </Typography>

        <Button
          style="filled"
          onPress={() => router.push('/(drawer)/test/detail')}
        >
          Navigate to Detail
        </Button>
      </View>
    </View>
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
