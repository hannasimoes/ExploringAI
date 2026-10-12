import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ActionButton } from './ActionButton';
import { AppText } from './AppText';
import { Screen } from './Screen';

/** Temporary placeholder for screens built in later milestones. */
export function ComingSoon({ title, milestone }: { title: string; milestone: string }) {
  return (
    <Screen>
      <View style={styles.body}>
        <AppText variant="title" accessibilityRole="header">
          {title}
        </AppText>
        <AppText muted>This screen is being built in {milestone}.</AppText>
      </View>
      <ActionButton tone="secondary" icon="house" label="Back to Home" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({ body: { flexGrow: 1, gap: 12 } });
