import { atom, computed } from 'nanostores';

export type Theme = 'light' | 'dark' | 'system';

/** Current theme preference */
export const $theme = atom<Theme>('system');

/** Resolved theme (accounts for system preference) */
export const $resolvedTheme = computed($theme, (theme) => {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});

/** Toggle between light and dark */
export function toggleTheme(): void {
  const current = $resolvedTheme.get();
  const next = current === 'light' ? 'dark' : 'light';
  $theme.set(next);
  persistTheme(next);
  applyTheme(next);
}

/** Set a specific theme */
export function setTheme(theme: Theme): void {
  $theme.set(theme);
  persistTheme(theme);
  applyTheme(theme === 'system' ? $resolvedTheme.get() : theme);
}

/** Apply theme class to document */
function applyTheme(resolved: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

/** Persist theme to localStorage */
function persistTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('theme', theme);
}

/** Initialize theme from localStorage (call once on client) */
export function initTheme(): void {
  if (typeof localStorage === 'undefined') return;
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) {
    $theme.set(stored);
    applyTheme(stored === 'system' ? $resolvedTheme.get() : stored);
  } else {
    applyTheme($resolvedTheme.get());
  }
}
