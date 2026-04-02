import { atom } from 'nanostores';

/**
 * Shared counter store — demonstrates cross-framework state sharing.
 * All 5 framework counters can read/write the same value via Nano Stores.
 */
export const $count = atom<number>(0);

export function increment(): void {
  $count.set($count.get() + 1);
}

export function decrement(): void {
  $count.set($count.get() - 1);
}

export function reset(): void {
  $count.set(0);
}
