import { Text, TextProps } from 'react-native';

import { useSettings } from '../settings/SettingsContext';
import { type, TypeVariant } from '../theme/typography';

type Props = TextProps & {
  variant?: TypeVariant;
  color?: string;
  muted?: boolean;
};

/**
 * Text that respects both the system Dynamic Type setting (allowFontScaling)
 * and GuideCart's own text-size setting.
 */
export function AppText({ variant = 'body', color, muted, style, ...rest }: Props) {
  const { colors, textScale } = useSettings();
  const base = type[variant];
  return (
    <Text
      allowFontScaling
      maxFontSizeMultiplier={2.2}
      style={[
        base,
        {
          fontSize: base.fontSize * textScale,
          lineHeight: base.lineHeight * textScale,
          color: color ?? (muted ? colors.textMuted : colors.text),
        },
        style,
      ]}
      {...rest}
    />
  );
}
