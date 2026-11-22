export type Video = {
  title: string
  platform: string
  blurb: string
  /** The post itself, linked under the blurb. */
  href: string
  /**
   * Player URL, so it plays on the page:
   *   YouTube  https://www.youtube-nocookie.com/embed/<id>?autoplay=1&playsinline=1&rel=0
   *   TikTok   https://www.tiktok.com/player/v1/<id>?autoplay=1&rel=0
   *   Instagram https://www.instagram.com/reel/<id>/embed/  (some reels only link out, so test it)
   * Leave it out when the post can't be embedded. The still then links out.
   */
  embed?: string
  /** An image in public/images. It gets cropped to 9:16. */
  still: string
  /** Which part of the still survives the crop, e.g. 'object-left', plus a zoom to lose stray text. */
  crop?: string
}

export const VIDEOS: Video[] = [
  {
    title: 'chè thái',
    platform: 'tiktok',
    blurb: 'An 18-second cooking edit answering “viet desserts suck” with a glass of chè Thái.',
    href: 'https://www.tiktok.com/@b4chle/video/7665869308655930637',
    embed: 'https://www.tiktok.com/player/v1/7665869308655930637?autoplay=1&rel=0&description=0&music_info=0',
    still: '/images/cooking-still.jpg',
    crop: 'origin-top scale-105',
  },
  {
    title: 'undercover athletes',
    platform: 'instagram',
    blurb: 'A street trivia game I edited for Wahoops, with UVA women’s soccer players undercover as the interviewers.',
    href: 'https://www.instagram.com/reel/Dc1QBXMRY3-/',
    embed: 'https://www.instagram.com/reel/Dc1QBXMRY3-/embed/',
    still: '/images/wahoops-soccer-still.jpg',
  },
  {
    title: 'tourism in virginia',
    platform: 'youtube',
    blurb: 'A short on why tourism matters to my state. It took bronze at FBLA nationals my junior year.',
    href: 'https://www.youtube.com/watch?v=5MPob2nP_Yk',
    embed: 'https://www.youtube-nocookie.com/embed/5MPob2nP_Yk?autoplay=1&playsinline=1&rel=0',
    still: '/images/fbla-video-still.jpg',
    crop: 'object-left',
  },
]

// While this is empty the section shows three "coming soon" frames.
export const UGC_VIDEOS: Video[] = [
  {
    title: 'how to start clipping',
    platform: 'instagram',
    blurb: 'A Higgsfield partner video on starting a clipping side hustle, from first search to posted clip.',
    href: 'https://www.instagram.com/reel/Df38kTNCKkj/',
    embed: 'https://www.instagram.com/reel/Df38kTNCKkj/embed/',
    still: '/images/ugc-clipping-start-still.jpg',
  },
  {
    title: 'anything helps',
    platform: 'instagram',
    blurb: 'A Higgsfield partner video that opens on an animated street story and turns into a tutorial on AI shorts.',
    href: 'https://www.instagram.com/reel/Df1Oi7wimlS/',
    // No `embed`: Instagram's player only offers "Watch on Instagram" for this one.
    still: '/images/ugc-animated-story-still.jpg',
  },
  {
    title: 'gameplay to shorts',
    platform: 'instagram',
    blurb: 'A Higgsfield partner video on turning gameplay footage into YouTube Shorts with Claude.',
    href: 'https://www.instagram.com/reel/DfyiumxiYUu/',
    embed: 'https://www.instagram.com/reel/DfyiumxiYUu/embed/',
    still: '/images/ugc-clipping-workflow-still.jpg',
  },
]
