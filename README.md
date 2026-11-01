# Romantic Letter

React + Vite + TailwindCSS + Framer Motion. Static, no backend, no storage.

    npm install
    npm run dev      # develop
    npm run build    # production build (dist/)

Deploy: push to GitHub, import the repo in Vercel (framework preset: Vite).

## What to customize

| What | Where |
| --- | --- |
| Photos (9 placeholders) | `src/data/images.js` |
| Relationship start date | `RELATIONSHIP_START` in `src/data/content.js` |
| Letter text, special days, labels | `src/data/content.js` |
| Music | put an mp3 in `public/music/` and set `track.src` in `src/data/content.js` (e.g. `/music/song.mp3`) |

Until `track.src` is set, a soft built-in melody plays so the player works.
