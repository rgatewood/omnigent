// Reactive "is this a mobile-width viewport?" hook.
//
// The shell's responsive layout pivots on the LunaOS Control desktop
// breakpoint (`min-width: 1024px`), used both as CSS classes (`lg:` / `max-lg:`) and as
// the JS threshold in AppShell's `initialSidebarOpen`. This hook exposes the
// `max-lg` side of that line to component logic that can't be expressed in
// CSS alone (e.g. swapping a hover flyout for an in-place page on touch).

import { useSyncExternalStore } from "react";

// Mirror Tailwind's `max-lg` variant exactly so this hook stays in lockstep
// with the `max-lg:` / `lg:` classes used by the shell's structural layout.
const MOBILE_QUERY = "(max-width: 1023.98px)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * True when the viewport is narrower than LunaOS Control's `lg` breakpoint
 * (1024px) — i.e. the chat-first layout the shell's `max-lg:` classes target. Reactive:
 * components re-render when the viewport crosses the breakpoint. SSR-safe
 * (returns `false` on the server, matching `initialSidebarOpen`).
 */
export function useIsMobileViewport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
