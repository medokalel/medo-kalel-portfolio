export interface Tech {
  name: string
  /** Brand color used for the icon dot and its glow */
  color: string
}

export const techs: readonly Tech[] = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'HTML5', color: '#e34f26' },
  { name: 'CSS3', color: '#1572b6' },
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'REST API', color: '#6366f1' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'Git', color: '#f05032' },
  { name: 'GitHub', color: '#ffffff' },
]

/** First marquee row: the first 8 techs. */
export const firstRow: readonly Tech[] = techs.slice(0, 8)
/** Second marquee row: the last 2 techs, then the full list again, so both rows are similar in length. */
export const secondRow: readonly Tech[] = [...techs.slice(8), ...techs]