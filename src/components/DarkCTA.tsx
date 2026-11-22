import type { MouseEvent } from 'react'
import { FadingLines } from './FadingLines'

export function DarkCTA({
  onOpenContact,
}: {
  onOpenContact: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <footer className="relative overflow-hidden bg-dark px-4 py-28 text-center">
      <FadingLines />
      <button
        type="button"
        onClick={onOpenContact}
        className="relative z-10 bg-green px-8 py-4 text-[1.125rem] font-bold text-ink transition-colors duration-200 hover:bg-pop-lime focus-visible:outline-dark-ink"
      >
        contact me
      </button>
    </footer>
  )
}
