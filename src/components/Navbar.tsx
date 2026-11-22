import type { MouseEvent } from 'react'
import { PixelIcon } from './PixelIcon'

export function Navbar({
  onOpenContact,
}: {
  onOpenContact: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <header className="sticky top-0 z-40 bg-pop-lime">
      <div className="mx-auto flex w-full max-w-frame items-center justify-between gap-2 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-1.5 text-ink sm:gap-2">
          <PixelIcon name="smile" size={22} />
          <span translate="no" className="text-base font-extrabold tracking-[-0.01em] whitespace-nowrap sm:text-[1.25rem]">
            bach le’s portfolio
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenContact}
          className="shrink-0 bg-ink px-2.5 py-2.5 whitespace-nowrap sm:px-5 text-[0.8125rem] font-bold text-pop-lime transition-opacity duration-200 hover:opacity-80 focus-visible:outline-ink"
        >
          contact me
        </button>
      </div>
    </header>
  )
}
