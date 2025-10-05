import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/contexts/preferences-context';

export default function NotesScreen() {
  const { colors } = useThemeContext();

  return <View style={[styles.container, { backgroundColor: colors.groupedBackground }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
