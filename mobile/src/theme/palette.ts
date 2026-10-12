/**
 * GuideCart colour tokens.
 *
 * Brand direction: warm ivory #FAF7F0, forest green #294B3D, sage #E6E9DA,
 * terracotta #B65F40. Terracotta only reaches 4.18:1 on ivory, so text and
 * buttons use the darker #9A4E33 (5.59:1). Every text/background pair below
 * is checked by `npm run check:contrast` against WCAG 2.2 AA (4.5:1 text,
 * 3:1 non-text). Status is never conveyed by colour alone: every status also
 * carries an icon and words.
 */
export type Palette = {
  background: string;
  surface: string; // cards, list rows
  surfaceAlt: string; // sage panels
  text: string;
  textMuted: string;
  primary: string; // main buttons
  onPrimary: string;
  accent: string; // secondary call to action (terracotta)
  onAccent: string;
  border: string; // control outlines (>= 3:1 against background)
  focus: string;
  success: string;
  warning: string;
  danger: string;
};

export const light: Palette = {
  background: '#FAF7F0',
  surface: '#FFFFFF',
  surfaceAlt: '#E6E9DA',
  text: '#1F2A24',
  textMuted: '#4F5D53',
  primary: '#294B3D',
  onPrimary: '#FAF7F0',
  accent: '#9A4E33',
  onAccent: '#FFFFFF',
  border: '#7A877E',
  focus: '#9A4E33',
  success: '#294B3D',
  warning: '#7A4A00',
  danger: '#A12B1F',
};

export const dark: Palette = {
  background: '#121A16',
  surface: '#1C2620',
  surfaceAlt: '#24312A',
  text: '#F2EFE6',
  textMuted: '#BFC8BF',
  primary: '#8FC4A8',
  onPrimary: '#0E1512',
  accent: '#E8A487',
  onAccent: '#1A0F0A',
  border: '#7F8F85',
  focus: '#E8A487',
  success: '#8FC4A8',
  warning: '#F0C36B',
  danger: '#FF9B8F',
};

export const highContrastLight: Palette = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F1EA',
  text: '#000000',
  textMuted: '#1F1F1F',
  primary: '#0F2A1F',
  onPrimary: '#FFFFFF',
  accent: '#6B2E17',
  onAccent: '#FFFFFF',
  border: '#000000',
  focus: '#6B2E17',
  success: '#0F2A1F',
  warning: '#4D2E00',
  danger: '#7A0E05',
};

export const highContrastDark: Palette = {
  background: '#000000',
  surface: '#000000',
  surfaceAlt: '#141414',
  text: '#FFFFFF',
  textMuted: '#EDEDED',
  primary: '#FFE873',
  onPrimary: '#000000',
  accent: '#FFFFFF',
  onAccent: '#000000',
  border: '#FFFFFF',
  focus: '#FFE873',
  success: '#7CF0B0',
  warning: '#FFE873',
  danger: '#FF8A80',
};

export const palettes = { light, dark, highContrastLight, highContrastDark };
