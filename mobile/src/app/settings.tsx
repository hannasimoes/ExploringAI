import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '../components/AppText';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Appearance, TextSize, useSettings } from '../settings/SettingsContext';
import { MIN_TOUCH, radius, space } from '../theme/typography';

function Choice<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const { colors } = useSettings();
  return (
    <View style={styles.group} accessibilityRole="radiogroup" accessibilityLabel={title}>
      <AppText variant="heading" accessibilityRole="header">
        {title}
      </AppText>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={o.label}
            onPress={() => onChange(o.value)}
            style={[
              styles.option,
              {
                backgroundColor: selected ? colors.surfaceAlt : colors.surface,
                borderColor: selected ? colors.primary : colors.border,
                borderWidth: selected ? 3 : 1.5,
              },
            ]}
          >
            <AppText variant="label" style={styles.flex}>
              {o.label}
            </AppText>
            {/* Selection is shown by a tick icon and border weight, not colour alone. */}
            {selected ? <Icon name="checkmark.circle.fill" color={colors.primary} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function SettingsScreen() {
  const { settings, update, colors, reduceMotion, screenReaderOn } = useSettings();

  return (
    <Screen>
      <Choice<TextSize>
        title="Text size"
        value={settings.textSize}
        onChange={(textSize) => update({ textSize })}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'large', label: 'Large' },
          { value: 'extraLarge', label: 'Extra large' },
        ]}
      />

      <Choice<Appearance>
        title="Appearance"
        value={settings.appearance}
        onChange={(appearance) => update({ appearance })}
        options={[
          { value: 'system', label: 'Match my iPhone' },
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />

      <View
        style={[styles.option, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1.5 }]}
      >
        <AppText variant="label" style={styles.flex} nativeID="hc-label">
          High contrast
        </AppText>
        <Switch
          accessibilityLabel="High contrast"
          value={settings.highContrast}
          onValueChange={(highContrast) => update({ highContrast })}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      <View style={styles.group}>
        <AppText variant="heading" accessibilityRole="header">
          From your iPhone settings
        </AppText>
        <AppText muted>VoiceOver: {screenReaderOn ? 'on' : 'off'}</AppText>
        <AppText muted>Reduce Motion: {reduceMotion ? 'on' : 'off'}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: { gap: space.sm },
  option: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.md,
  },
  flex: { flex: 1 },
});
