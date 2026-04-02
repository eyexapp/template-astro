import { atom } from 'nanostores';

/** Sidebar open state */
export const $sidebarOpen = atom<boolean>(false);

export function toggleSidebar(): void {
  $sidebarOpen.set(!$sidebarOpen.get());
}

/** Mobile menu open state */
export const $mobileMenuOpen = atom<boolean>(false);

export function toggleMobileMenu(): void {
  $mobileMenuOpen.set(!$mobileMenuOpen.get());
}

export function closeMobileMenu(): void {
  $mobileMenuOpen.set(false);
}
