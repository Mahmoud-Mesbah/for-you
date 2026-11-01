
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=1000&q=75`

export const memoryImages = [
  { id: 1, alt: 'Couple walking hand in hand through a field', src: unsplash('photo-1516589178581-6cd7833ae3b2') },
  { id: 2, alt: 'Couple running through a garden', src: unsplash('photo-1519741497674-611481863552') },
  { id: 3, alt: 'Couple holding white tulips', src: unsplash('photo-1522673607200-164d1b6ce486') },
  { id: 4, alt: 'Couple watching the sunset by the water', src: unsplash('photo-1501901609772-df0848060b8a') },
  { id: 5, alt: 'Couple sitting together at night', src: unsplash('photo-1529634806980-85c3dd6d34ac') },
  { id: 6, alt: 'Woman by the sea at dusk', src: unsplash('photo-1518199266791-5375a83190b7') },
  { id: 7, alt: 'Roses and candlelight', src: unsplash('photo-1494774157365-9e04c6720e47') },
  { id: 8, alt: 'Holding hands', src: unsplash('photo-1474552226712-ac0f0961a954') },
  { id: 9, alt: 'Couple dancing in the street', src: unsplash('photo-1457301353672-324d6d14f471') },
]

// Shown when any image above fails to load.
export const fallbackImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a1424"/><stop offset="1" stop-color="#2c070c"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#g)"/>
  <path d="M200 300c-60-40-80-70-80-100a42 42 0 0 1 80-18 42 42 0 0 1 80 18c0 30-20 60-80 100z" fill="none" stroke="#e6c277" stroke-width="5" stroke-linejoin="round"/>
</svg>`)
