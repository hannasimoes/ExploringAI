import * as Haptics from 'expo-haptics';
import { SFSymbol } from 'expo-symbols';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { useSettings } from '../settings/SettingsContext';
import { MIN_TOUCH, radius, space } from '../theme/typography';
import { AppText } from './AppText';
import { Icon } from './Icon';

type Props = {
  label: string;
  /** Short description of what happens, read by VoiceOver after the label. */
  hint?: string;
  icon?: SFSymbol;
  onPress: () => void;
  tone?: 'primary' | 'accent' | 'secondary';
  disabled?: boolean;
  size?: 'large' | 'regular';
};

export function ActionButton({
  label,
  hint,
  icon,
  onPress,
  tone = 'primary',
  disabled,
  size = 'regular',
}: Props) {
  const { colors } = useSettings();
  const bg =
    tone === 'primary' ? colors.primary : tone === 'accent' ? colors.accent : colors.surface;
  const fg =
    tone === 'primary' ? colors.onPrimary : tone === 'accent' ? colors.onAccent : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: size === 'large' ? 76 : MIN_TOUCH,
          backgroundColor: bg,
          borderColor: tone === 'secondary' ? colors.border : bg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      {icon && Platform.OS === 'ios' ? (
        <View style={styles.icon}>
          <Icon name={icon} color={fg} size={size === 'large' ? 28 : 22} />
        </View>
      ) : null}
      <AppText variant="label" color={fg} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 2,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    gap: space.md,
  },
  icon: { width: 32, alignItems: 'center' },
  label: { flexShrink: 1 },
});
