import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, useColorScheme } from 'react-native';

import { Palette, palettes } from '../theme/palette';

export type Appearance = 'system' | 'light' | 'dark';
export type TextSize = 'standard' | 'large' | 'extraLarge';

export type Settings = {
  appearance: Appearance;
  highContrast: boolean;
  textSize: TextSize;
};

const DEFAULTS: Settings = { appearance: 'system', highContrast: false, textSize: 'standard' };
const STORAGE_KEY = 'guidecart.settings.v1';

/** Multiplier applied on top of the system Dynamic Type size. */
export const TEXT_SCALE: Record<TextSize, number> = { standard: 1, large: 1.2, extraLarge: 1.4 };

type SettingsValue = {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  colors: Palette;
  isDark: boolean;
  textScale: number;
  /** True when the OS "Reduce Motion" setting is on. */
  reduceMotion: boolean;
  /** True when VoiceOver/TalkBack is running; used to avoid double speech. */
  screenReaderOn: boolean;
};

const SettingsContext = createContext<SettingsValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReaderOn, setScreenReaderOn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => raw && setSettings({ ...DEFAULTS, ...JSON.parse(raw) }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderOn);
    const subs = [
      AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion),
      AccessibilityInfo.addEventListener('screenReaderChanged', setScreenReaderOn),
    ];
    return () => subs.forEach((s) => s.remove());
  }, []);

  const value = useMemo<SettingsValue>(() => {
    const isDark =
      settings.appearance === 'dark' || (settings.appearance === 'system' && systemScheme === 'dark');
    const colors = settings.highContrast
      ? isDark
        ? palettes.highContrastDark
        : palettes.highContrastLight
      : isDark
        ? palettes.dark
        : palettes.light;
    return {
      settings,
      update: (patch) =>
        setSettings((prev) => {
          const next = { ...prev, ...patch };
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
          return next;
        }),
      colors,
      isDark,
      textScale: TEXT_SCALE[settings.textSize],
      reduceMotion,
      screenReaderOn,
    };
  }, [settings, systemScheme, reduceMotion, screenReaderOn]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
