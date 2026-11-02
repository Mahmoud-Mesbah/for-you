// ─────────────────────────────────────────────────────────────
// All fixed text and configurable details live here.
// ─────────────────────────────────────────────────────────────

// Relationship counter start (local time). Edit to change the counter.
export const RELATIONSHIP_START = '2025-07-21T00:00:00'
export const RELATIONSHIP_START_LABEL = 'since 21 July 2025'

// Music. Add your own file to /public/music and set `src` (e.g. '/music/habeeby-da.mp3').
// While `src` is empty, a soft built-in melody plays instead so the player still works.
export const track = {
  title: 'habeeby da',
  src: '/Albumaty.Com_tww_lyt_hbyby_dh_.mp3',
}

export const envelopeContent = {
  heading: 'for you',
  hint: 'tap the seal',
}

export const letterContent = {
  title: 'my fav person',
  // One entry per line, exactly as in the reference.
  lines: [
    'حبيت اعمل هديه جديده',
    'وعايزين نملاه صورنا بقا',
    'بس قبل اي حاجه عايز',
    'تعرفي اني بحبك وربنا',
    'يخليكي ليا يقلبيي ويلا بقا',
    'انبهري 😂❤️',
  ],
  button: 'Our memories',
}

export const memoriesContent = {
  heading: 'our memories',
  hint: 'tap or swipe',
}

export const counterContent = {
  heading: 'together for',
  labels: { days: 'DAYS', hours: 'HOURS', mins: 'MINS', secs: 'SECS' },
  since: RELATIONSHIP_START_LABEL,
  tagline: 'and every second with you count',
}

export const specialDaysContent = {
  heading: 'our special days',
  // `lang` controls text direction and font. `date` is optional.
  events: [
    { id: 1, lang: 'ar', text: 'اول مره نزلنا ديت سوا', date: '24 May 2025' },
    { id: 2, lang: 'ar', text: 'اول مره قولتلك بحبك', date: '27 June 2025' },
    { id: 3, lang: 'ar', text: 'خطوبتنا😍', date: '30 December 2025' },
    { id: 4, lang: 'en', text: 'don’t miss this day', date: '6 January 2026' },
    { id: 5, lang: 'en', text: 'i love youuu', date: '' },
  ],
}

export const finalContent = {
  title: 'Forever & Together',
  button: 'Read it again',
}
