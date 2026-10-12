import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { AppText } from '../components/AppText';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { useSettings } from '../settings/SettingsContext';
import { MIN_TOUCH, space } from '../theme/typography';

export default function Home() {
  const { colors } = useSettings();

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <AppText variant="label" color={colors.primary} accessibilityRole="text">
          GuideCart
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Display and voice settings"
          hitSlop={8}
          onPress={() => router.push('/settings')}
          style={styles.settingsButton}
        >
          <Icon name="textformat.size" color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <AppText variant="display" accessibilityRole="header">
          Let's go shopping.
        </AppText>
      </View>

      <View style={styles.actions}>
        <ActionButton
          size="large"
          tone="secondary"
          icon="square.and.pencil"
          label="Create My List"
          hint="Speak or type the items you need"
          onPress={() => router.push({ pathname: '/list', params: { mode: 'create' } })}
        />
        <ActionButton
          size="large"
          tone="secondary"
          icon="checklist"
          label="My Shopping List"
          hint="Review, edit or tick off items"
          onPress={() => router.push('/list')}
        />
        <ActionButton
          size="large"
          tone="primary"
          icon="camera.viewfinder"
          label="Start Shopping"
          hint="Opens the camera to check products against your list"
          onPress={() => router.push('/shop')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingsButton: {
    minWidth: MIN_TOUCH,
    minHeight: MIN_TOUCH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { flexGrow: 1, justifyContent: 'center', paddingVertical: space.xl },
  actions: { gap: space.md },
});
