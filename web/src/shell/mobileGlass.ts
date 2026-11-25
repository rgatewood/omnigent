// Shared iOS-style "liquid glass" treatment for the mobile chat header.
//
// The header paints no background and chat scrolls underneath it, so its
// controls — and the menu they open — sit on their own translucent, blurred
// surface, the way native iOS floating chrome does. All classes are `max-lg:`
// so the chat-first layout stays consistent below LunaOS Control's 1024px
// desktop boundary.

/** Translucent blurred surface: controls and the menus they open. */
export const MOBILE_GLASS_SURFACE =
  "max-lg:border max-lg:border-black/[0.06] max-lg:bg-background/70 max-lg:shadow-[0_6px_20px_-4px_rgb(0_0_0/0.18)] max-lg:backdrop-blur-xl max-lg:backdrop-saturate-150 dark:max-lg:border-white/10 dark:max-lg:bg-background/60";

/**
 * A control cluster's floating pill. No padding of its own so a single
 * ``size="icon"`` child stays exactly 40px — the sidebar toggle and the
 * session kebab must read as the same size.
 *
 * The exception is the Chat/Terminal track (ViewModeToggle): it paints its
 * own background out to its edge, so with no padding it collides with the
 * pill's border while an icon-only neighbour still clears it by the slack
 * inside its 40px box. Inset the leading edge by that slack — only when the
 * track is present — so ink sits 12px from either end. Assumes the track is
 * the cluster's leading child on mobile; a control added ahead of it would
 * take the inset instead.
 */
export const MOBILE_GLASS_PILL = `${MOBILE_GLASS_SURFACE} max-lg:rounded-full max-lg:has-data-[slot=view-mode-toggle]:pl-1.5`;
