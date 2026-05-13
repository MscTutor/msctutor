// Static generation for /class/[classId] — pre-renders at build time
import { STATIC_CLASSES } from '@/lib/static-params'

export function generateStaticParams() {
  return STATIC_CLASSES.map(classId => ({ classId }))
}
export const revalidate = 86400   // Regenerate once per day
