import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '../settings/SettingsContext';
import { space } from '../theme/typography';

/** Standard page container: safe area, theme background, scroll for large text. */
export function Screen({ children, edges }: { children: ReactNode; edges?: ('top' | 'bottom')[] }) {
  const { colors } = useSettings();
  return (
    <SafeAreaView edges={edges ?? ['bottom']} style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flexGrow: 1, padding: space.lg, gap: space.lg },
});
