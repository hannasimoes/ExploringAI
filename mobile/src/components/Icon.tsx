import { SFSymbol, SymbolView } from 'expo-symbols';

/**
 * Decorative icon. Icons are always paired with visible text, so they are
 * hidden from screen readers to avoid duplicate announcements.
 */
export function Icon({ name, size = 26, color }: { name: SFSymbol; size?: number; color: string }) {
  return (
    <SymbolView
      name={name}
      size={size}
      tintColor={color}
      weight="semibold"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
    />
  );
}
