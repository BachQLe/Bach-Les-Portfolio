# Bach Le's Portfolio

One page: hero with contact info, about me, videos, UGC videos, why me, contact button.
Vite + React + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Adding a video

1. Put a still in `public/images/` (it gets cropped square).
2. Add an entry to `VIDEOS` or `UGC_VIDEOS` in `src/videos.ts`. The fields are documented there,
   including the `embed` URL formats that make a video play on the page.

Grids show three across and wrap into rows. On phones they stack. Backgrounds are assigned
automatically.

## Design rules

- Tokens live in the `@theme` block of `src/index.css`. There is no Tailwind config.
- Corners are square. The only exceptions are the `rounded-mat` / `rounded-still` video frames.
- Tegno (`font-display`) is for the hero headline only (its digits are hard to read). Figtree is
  for everything else, with Press Start 2P for tiny muted labels.
- `pop-*` inks are for decoration. Body text never sits on one.
- Sections are full-bleed bands, with no vertical rules down the sides.
- Never pass a position class to `ColorSlab`. Position a wrapper instead.
- No animation libraries, CSS only.
- Tegno is licensed for personal, non-commercial use only (`public/fonts/LICENSE.txt`).

## Deploy

Vercel, configured in `vercel.json`.
