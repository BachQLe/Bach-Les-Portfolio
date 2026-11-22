import { useEffect, useState, type ReactNode } from 'react'
import { UGC_VIDEOS, VIDEOS, type Video } from '../videos'
import { Section, SectionTitle } from './Section'
import { PixelIcon } from './PixelIcon'
import { ColorSlab } from './deco/ColorSlab'

// Backgrounds cycle by position, so a new video gets one automatically.
const SLABS = [
  { color: 'bg-pop-pink', image: '/images/texture-lounge.jpg', rotate: -1.5 },
  { color: 'bg-pop-mint', image: '/images/texture-bar.jpg', rotate: 1.5 },
  { color: 'bg-pop-blue', image: '/images/texture-deco.jpg', rotate: -1 },
  { color: 'bg-pop-coral', image: '/images/texture-bar.jpg', rotate: 1.5 },
  { color: 'bg-pop-violet', image: '/images/texture-deco.jpg', rotate: -1.5 },
  { color: 'bg-pop-yellow', image: '/images/texture-lounge.jpg', rotate: 1 },
]

const TIKTOK_ORIGIN = 'https://www.tiktok.com'
const TIKTOK_PLAYING = 1

const badgeClass =
  'absolute bottom-2 left-2 flex h-10 w-10 items-center justify-center bg-green text-ink transition-colors duration-200 group-hover:bg-pop-lime'

function Still({ video }: { video: Video }) {
  return (
    <span className="block h-full w-full overflow-hidden rounded-still">
      <img
        src={video.still}
        alt=""
        width={450}
        height={800}
        loading="lazy"
        className={`h-full w-full object-cover ${video.crop ?? ''}`}
      />
    </span>
  )
}

/** The still until it's clicked, then the platform's player in the same frame. */
function Player({ video, playing, onPlay }: { video: Video; playing: boolean; onPlay: () => void }) {
  if (!video.embed) {
    return (
      <a
        href={video.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`watch ${video.title} on ${video.platform} (opens in a new tab)`}
        className="group absolute inset-0 block"
      >
        <Still video={video} />
        <span className={badgeClass}>
          <PixelIcon name="arrow-up-right" />
        </span>
      </a>
    )
  }

  if (playing) {
    return (
      <iframe
        // The play button unmounts, so hand keyboard focus to the player.
        ref={(frame) => frame?.focus({ preventScroll: true })}
        src={video.embed}
        title={video.title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        // YouTube refuses to play without a referrer.
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full rounded-still bg-dark"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`play ${video.title}`}
      className="group absolute inset-0 block w-full cursor-pointer"
    >
      <Still video={video} />
      <span className={badgeClass}>
        <PixelIcon name="play" />
      </span>
    </button>
  )
}

/** The torn background and white mat around every video. */
function SlabFrame({ index, seed, children }: { index: number; seed: string; children: ReactNode }) {
  return (
    <div className="relative isolate p-4 lg:p-5">
      <div className="absolute inset-0 -z-10">
        <ColorSlab seed={seed} {...SLABS[index % SLABS.length]} className="h-full w-full" />
      </div>
      <div className="paper rounded-mat p-1">
        <div className="relative aspect-[9/16]">{children}</div>
      </div>
    </div>
  )
}

const gridClass = 'mx-auto mt-8 grid max-w-xs gap-x-5 gap-y-12 sm:max-w-none sm:grid-cols-3 lg:gap-x-8'

function VideoGrid({
  videos,
  firstSlab = 0,
  playing,
  onPlay,
}: {
  videos: Video[]
  firstSlab?: number
  playing?: string
  onPlay: (href: string) => void
}) {
  if (videos.length === 0) {
    return (
      <ul className={gridClass}>
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <SlabFrame index={firstSlab + i} seed={`coming-soon-${i}`}>
              <p className="flex h-full items-center justify-center rounded-still bg-canvas font-pixel text-[10px] text-muted">
                coming soon
              </p>
            </SlabFrame>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={gridClass}>
      {videos.map((video, i) => (
        <li key={video.href}>
          <SlabFrame index={firstSlab + i} seed={video.href}>
            <Player video={video} playing={playing === video.href} onPlay={() => onPlay(video.href)} />
          </SlabFrame>

          <h3 className="mt-4 text-[1.25rem] leading-tight font-bold text-balance text-ink">{video.title}</h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-pretty text-muted">{video.blurb}</p>
          <a
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 py-2 font-pixel text-[10px] text-ink underline decoration-green decoration-2 underline-offset-4 hover:bg-green-wash"
          >
            <span translate="no">{video.platform}</span>
            <PixelIcon name="arrow-up-right" size={10} />
            <span className="sr-only">: {video.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function VideoSections() {
  // Shared by both grids. One at a time: starting a video unmounts, and so stops, the last one.
  const [playing, setPlaying] = useState<string>()

  // TikTok's player always autoplays muted, and ignores an unmute sent before
  // playback starts. Unmute once per player, so muting it by hand still sticks.
  useEffect(() => {
    const unmuted = new WeakSet<MessageEventSource>()
    function unmuteTikTok({ origin, source, data }: MessageEvent) {
      if (origin !== TIKTOK_ORIGIN || !source || unmuted.has(source)) return
      if (data?.type !== 'onStateChange' || data.value !== TIKTOK_PLAYING) return
      unmuted.add(source)
      source.postMessage({ type: 'unMute', 'x-tiktok-player': true }, { targetOrigin: origin })
    }
    window.addEventListener('message', unmuteTikTok)
    return () => window.removeEventListener('message', unmuteTikTok)
  }, [])

  return (
    <>
      <Section tone="canvas">
        <SectionTitle icon="film">videos</SectionTitle>
        <VideoGrid videos={VIDEOS} playing={playing} onPlay={setPlaying} />
      </Section>
      <Section tone="surface">
        <SectionTitle icon="play">UGC videos</SectionTitle>
        <VideoGrid videos={UGC_VIDEOS} firstSlab={3} playing={playing} onPlay={setPlaying} />
      </Section>
    </>
  )
}
