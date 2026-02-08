// Updates for existing murals with new high-quality photos
// Image paths are relative to _mural-images-raw/organized/ for upload to Vercel Blob

export interface ExistingMuralUpdate {
  slug: string; // Match to existing mural in database
  heroImage?: string; // New hero image path (optional - only if better than current)
  thumbnailImage?: string; // New thumbnail path
  galleryImages: string[]; // Additional gallery images to add
}

export const existingMuralUpdates: ExistingMuralUpdate[] = [
  {
    slug: "galaxy-dreams",
    galleryImages: [
      "existing/galaxy-dreams/galaxy-dreams-01.jpg",
    ],
  },

  {
    slug: "psychedelic-summer",
    galleryImages: [
      "existing/psychedelic-summer/psychedelic-summer-01.jpg",
    ],
  },

  {
    slug: "zen",
    galleryImages: [
      "existing/zen/zen-01.jpg",
    ],
  },

  {
    slug: "molson-coors",
    heroImage: "existing/molson-coors/molson-coors-04-coors-sign.jpg", // Professional photo with "Coors EST. 1873"
    thumbnailImage: "existing/molson-coors/molson-coors-04-coors-sign.jpg",
    galleryImages: [
      "existing/molson-coors/molson-coors-01.jpg",
      "existing/molson-coors/molson-coors-02.jpg",
      "existing/molson-coors/molson-coors-03.jpg",
      "existing/molson-coors/molson-coors-04-coors-sign.jpg",
    ],
  },

  {
    slug: "protect-your-peace",
    galleryImages: [
      "existing/protect-your-peace/protect-your-peace-01.jpg",
      "existing/protect-your-peace/protect-your-peace-02.jpg",
      "existing/protect-your-peace/protect-your-peace-03.jpg",
    ],
  },

  {
    slug: "la-rumba",
    galleryImages: [
      "existing/la-rumba/la-rumba-01.jpg",
    ],
  },

  {
    slug: "colfax-canvas",
    heroImage: "existing/colfax-canvas/colfax-canvas-05-drone-full-wall.jpg", // Drone panoramic - best overview
    thumbnailImage: "existing/colfax-canvas/colfax-canvas-01-ground-level.jpg",
    galleryImages: [
      "existing/colfax-canvas/colfax-canvas-01-ground-level.jpg",
      "existing/colfax-canvas/colfax-canvas-02-ground-level-alt.jpg",
      "existing/colfax-canvas/colfax-canvas-03-panel-skull-lilies.png",
      "existing/colfax-canvas/colfax-canvas-04-panel-eagle-flowers.png",
      "existing/colfax-canvas/colfax-canvas-05-drone-full-wall.jpg",
      "existing/colfax-canvas/colfax-canvas-06-left-portion.jpg",
      "existing/colfax-canvas/colfax-canvas-07-full-panoramic.jpg",
    ],
  },

  {
    slug: "you-can-navigate-any-current",
    galleryImages: [
      "existing/you-can-navigate-any-current/you-can-navigate-any-current-01.jpg",
    ],
  },

  {
    slug: "rocky-road-trips",
    heroImage: "existing/rocky-road-trips/rocky-road-trips-01-vw-bus.jpg", // VW bus + mountains - iconic shot
    thumbnailImage: "existing/rocky-road-trips/rocky-road-trips-01-vw-bus.jpg",
    galleryImages: [
      "existing/rocky-road-trips/rocky-road-trips-01-vw-bus.jpg",
    ],
  },

  {
    slug: "underwater-haven",
    galleryImages: [
      "existing/underwater-haven/underwater-haven-01.jpg",
      "existing/underwater-haven/underwater-haven-02.jpg",
      "existing/underwater-haven/underwater-haven-03-wide.jpg",
      "existing/underwater-haven/underwater-haven-04-wide.jpg",
    ],
  },

  {
    slug: "tiger-stance",
    heroImage: "existing/tiger-stance/tiger-stance-05-front-best.jpg", // Marked as BEST in catalog
    thumbnailImage: "existing/tiger-stance/tiger-stance-05-front-best.jpg",
    galleryImages: [
      "existing/tiger-stance/tiger-stance-01.jpg",
      "existing/tiger-stance/tiger-stance-02.jpg",
      "existing/tiger-stance/tiger-stance-03.jpg",
      "existing/tiger-stance/tiger-stance-04-detail.jpg",
      "existing/tiger-stance/tiger-stance-05-front-best.jpg",
    ],
  },

  {
    slug: "octopus-bar",
    // Note: This mural has two distinct versions (exterior grey + interior purple taps)
    // May need to verify which one is the primary or if they should be separate entries
    galleryImages: [
      "existing/octopus-bar/octopus-bar-01-exterior.jpg", // Grey octopus, moon, clouds on brick
      "existing/octopus-bar/octopus-bar-02-interior-taps.jpg", // Purple octopus behind bar taps
    ],
  },

  {
    slug: "surfside-burger-bar",
    heroImage: "existing/surfside-burger-bar/surfside-burger-bar-01-drone.jpg", // Drone shot shows full building
    thumbnailImage: "existing/surfside-burger-bar/surfside-burger-bar-02-front.jpg",
    galleryImages: [
      "existing/surfside-burger-bar/surfside-burger-bar-01-drone.jpg",
      "existing/surfside-burger-bar/surfside-burger-bar-02-front.jpg",
      "existing/surfside-burger-bar/surfside-burger-bar-03-night-vw-side.jpg",
    ],
  },

  {
    slug: "spread-love-colorado",
    heroImage: "existing/spread-love-colorado/spread-love-colorado-01.jpg", // Professional photo - high quality
    thumbnailImage: "existing/spread-love-colorado/spread-love-colorado-01.jpg",
    galleryImages: [
      "existing/spread-love-colorado/spread-love-colorado-01.jpg",
    ],
  },

  {
    slug: "all-stars-ink",
    galleryImages: [
      "existing/all-stars-ink/all-stars-ink-01.jpg",
    ],
  },

  {
    slug: "lion-heart",
    heroImage: "existing/lion-heart/lion-heart-01.jpg", // High-quality portrait shot
    thumbnailImage: "existing/lion-heart/lion-heart-01.jpg",
    galleryImages: [
      "existing/lion-heart/lion-heart-01.jpg",
    ],
  },
];
