import { TextStyle } from 'react-native';

/** Base sizes in points before the user's text-size multiplier is applied. */
export const type = {
  display: { fontSize: 36, lineHeight: 42, fontWeight: '700', letterSpacing: -0.5 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 18, lineHeight: 26, fontWeight: '400' },
  label: { fontSize: 19, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
} satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { md: 14, lg: 22, pill: 999 };

/** Apple HIG minimum is 44pt; GuideCart's primary controls are larger. */
export const MIN_TOUCH = 56;
