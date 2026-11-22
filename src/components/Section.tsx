import type { ReactNode } from 'react'
import { PixelIcon, type PixelIconName } from './PixelIcon'

const toneClass = { canvas: 'bg-canvas', surface: 'bg-surface' } as const

/** Full-bleed band with centered content. `relative` + opaque fill lets it cover the hero as it lags. */
export function Section({ tone, children }: { tone: keyof typeof toneClass; children: ReactNode }) {
  return (
    <section className={`relative ${toneClass[tone]}`}>
      <div className="mx-auto w-full max-w-frame px-4 py-16 sm:px-6">{children}</div>
    </section>
  )
}

export function SectionTitle({ icon, children }: { icon: PixelIconName; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-green/30 bg-green-wash text-green">
        <PixelIcon name={icon} />
      </span>
      <h2 className="text-[2rem] leading-tight font-extrabold tracking-tight text-balance text-ink">
        {children}
      </h2>
    </div>
  )
}
