/** Kept in its own file (no image imports) so build tooling, e.g. the sitemap plugin, can read it too. */
export const projectIds = ['portfolio', 'ecommerce', 'velora', 'qr', 'alex', 'weather'] as const
export type ProjectId = (typeof projectIds)[number]
