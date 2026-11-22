import { useEffect, useRef, type CSSProperties } from 'react'
import { ContactLinks } from './ContactLinks'
import { ColorSlab } from './deco/ColorSlab'

/**
 * The hero poster. Every child is positioned and sized in `cqw` against a
 * 16:9 container, so type and portrait scale in lockstep. Don't convert them
 * to rem/vw/%, they drift apart. The background sits on a full-bleed wrapper
 * so the poster has no visible side edges.
 *
 * Contact info sits to the right from `md` up, and below on phones. From `lg`
 * up the hero also lags the scroll by up to 100px so the next section rolls
 * over it. Not below that, where it would cover the contact links.
 */
const backdropStyle: CSSProperties = {
  backgroundImage: 'url(/images/hero/background-texture.jpg)',
}

const posterStyle: CSSProperties = {
  aspectRatio: '16 / 9',
  containerType: 'inline-size',
}

// Entrance: the two lines drop in, then the portrait pops up.
const line1Style: CSSProperties = { top: '2.5cqw', fontSize: '14.5cqw' }
const line2Style: CSSProperties = { top: '15.5cqw', fontSize: '14.5cqw', animationDelay: '200ms' }

const photoStyle: CSSProperties = {
  left: '30.639cqw',
  top: '25.5cqw',
  width: '38.7220cqw',
  height: '39.4024cqw',
  animationDelay: '600ms',
}

/*
 * The headline sits low enough that it dips into the hair, where solid
 * black reads as a smudge against dark hair instead of type. These two
 * layers are a white-outline duplicate of each line, masked by the
 * portrait's own alpha channel — visible only where the portrait is opaque,
 * i.e. exactly the silhouette, not a bounding box. Fill is transparent so
 * the underlying black line1/line2 still shows through the letterform;
 * only the stroke is drawn, tracing the edges against the dark hair.
 * Reusing the same PNG costs nothing extra over the network (browser cache,
 * same URL as the <img> below). mask-position is (photo origin − line
 * origin) so the reused portrait lines back up with where it's actually
 * drawn on screen; redo that math if `photoStyle` or either line's left/top
 * ever changes. */
const maskShared: CSSProperties = {
  color: 'transparent',
  WebkitTextStroke: '0.3cqw #fff',
  WebkitMaskImage: 'url(/images/hero/portrait.png)',
  maskImage: 'url(/images/hero/portrait.png)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '38.7220cqw 39.4024cqw',
  maskSize: '38.7220cqw 39.4024cqw',
}

const line1MaskStyle: CSSProperties = {
  ...line1Style,
  ...maskShared,
  WebkitMaskPosition: '30.639cqw 23cqw',
  maskPosition: '30.639cqw 23cqw',
}

const line2MaskStyle: CSSProperties = {
  ...line2Style,
  ...maskShared,
  WebkitMaskPosition: '30.639cqw 10cqw',
  maskPosition: '30.639cqw 10cqw',
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    function update() {
      raf = 0
      const el = sectionRef.current
      const slide = slideRef.current
      if (!el || !slide) return
      const rect = el.getBoundingClientRect()
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, 1 - rect.bottom / rect.height)) : 0
      // Only lg+ lags the scroll (see header comment); below that, no shift.
      const lag = window.matchMedia('(min-width: 1024px)').matches ? progress * 100 : 0
      slide.style.transform = `translate3d(0, ${lag.toFixed(1)}px, 0)`
    }

    function onScrollOrResize() {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (raf) cancelAnimationFrame(raf)
      if (slideRef.current) slideRef.current.style.transform = ''
    }
  }, [])

  return (
    <section ref={sectionRef}>
      <div
        ref={slideRef}
        className="overflow-hidden bg-cover bg-center lg:will-change-transform"
        style={backdropStyle}
      >
        <div className="mx-auto grid w-full max-w-frame md:grid-cols-[minmax(0,1fr)_17rem] md:pr-6">
          <div className="relative w-full self-end overflow-hidden" style={posterStyle}>
            <h1 className="font-display text-ink leading-none whitespace-nowrap">
              <span className="animate-hero-drop-in absolute inset-x-0 z-[1] text-center" style={line1Style}>
                HI I'M
              </span>{' '}
              <span className="animate-hero-drop-in absolute inset-x-0 z-[1] text-center" style={line2Style}>
                BACH LE
              </span>
            </h1>
            <img
              src="/images/hero/portrait.png"
              alt="Bach Le wearing pixel-art sunglasses"
              width={1023}
              height={1041}
              fetchPriority="high"
              className="animate-hero-pop-up absolute z-[2] block"
              style={photoStyle}
            />
            <div aria-hidden="true" className="font-display pointer-events-none leading-none whitespace-nowrap">
              <span className="animate-hero-drop-in absolute inset-x-0 z-[4] text-center" style={line1MaskStyle}>
                HI I'M
              </span>
              <span className="animate-hero-drop-in absolute inset-x-0 z-[4] text-center" style={line2MaskStyle}>
                BACH LE
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center border-t border-rule bg-surface px-6 py-9 md:border-0 md:bg-transparent md:px-0">
            <div className="relative isolate w-full max-w-[17rem]">
              <div className="absolute -inset-x-2 -inset-y-3 -z-10">
                <ColorSlab seed="hero-contact" color="bg-pop-lime" rotate={2} className="h-full w-full" />
              </div>
              <div className="paper p-5 text-ink">
                <h2 className="font-pixel text-[10px] text-muted">reach me directly</h2>
                <ContactLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
