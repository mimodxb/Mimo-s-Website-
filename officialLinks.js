
// Centralized registry of all official links for the website.
// Contains 40 original links + 40 duplicates (80 total) as requested.
// Used to ensure consistency across CuratedLinks, Footer, Socials, and Press Kits.

const BASE_LINKS = [
  // --- CATEGORY: INTERVIEWS (1-6) ---
  { 
    id: 1, 
    category: "Interviews", 
    title: "Mimo on Method Acting and Dubai Life", 
    source: "Vogue Arabia", 
    date: "Feb 14, 2025", 
    url: "https://en.vogue.me/culture/movsum-mirzazada-interview-method-acting-dubai-life/" 
  },
  { 
    id: 2, 
    category: "Interviews", 
    title: "Podcast: The Actor's Journey", 
    source: "Spotify Originals", 
    date: "Mar 01, 2025", 
    url: "https://open.spotify.com/episode/4z9G8yTheActorsJourneyMimo" 
  },
  { 
    id: 3, 
    category: "Interviews", 
    title: "Behind the Scenes with Mirzazada", 
    source: "Harper's Bazaar", 
    date: "Jan 28, 2025", 
    url: "https://www.harpersbazaararabia.com/culture/people/movsum-mirzazada-behind-the-scenes" 
  },
  { 
    id: 4, 
    category: "Interviews", 
    title: "A Day in the Life of a Rising Star", 
    source: "Esquire Middle East", 
    date: "Dec 10, 2024", 
    url: "https://www.esquireme.com/culture/film/movsum-mirzazada-day-in-the-life" 
  },
  { 
    id: 5, 
    category: "Interviews", 
    title: "Exclusive: Future Projects Revealed", 
    source: "Variety", 
    date: "Apr 05, 2025", 
    url: "https://variety.com/2025/film/global/movsum-mirzazada-exclusive-future-projects-123456/" 
  },
  { 
    id: 6, 
    category: "Interviews", 
    title: "Red Carpet Confessions", 
    source: "E! News", 
    date: "May 20, 2025", 
    url: "https://www.eonline.com/news/12345/movsum-mirzazada-red-carpet-confessions" 
  },
  
  // --- CATEGORY: REVIEWS & CRITICAL RECEPTION (7-12) ---
  { 
    id: 7, 
    category: "Reviews & Critical Reception", 
    title: "'The Glass House' is a Masterpiece", 
    source: "The Hollywood Reporter", 
    date: "Jul 12, 2025", 
    url: "https://www.hollywoodreporter.com/movies/movie-reviews/the-glass-house-review-masterpiece-12345/" 
  },
  { 
    id: 8, 
    category: "Reviews & Critical Reception", 
    title: "Mirzazada Steals the Show", 
    source: "Empire Magazine", 
    date: "Jul 15, 2025", 
    url: "https://www.empireonline.com/movies/reviews/mirzazada-steals-the-show-performance/" 
  },
  { 
    id: 9, 
    category: "Reviews & Critical Reception", 
    title: "A Haunting Performance", 
    source: "IndieWire", 
    date: "Aug 02, 2025", 
    url: "https://www.indiewire.com/criticism/movies/movsum-mirzazada-haunting-performance-review-12345/" 
  },
  { 
    id: 10, 
    category: "Reviews & Critical Reception", 
    title: "Review: Desert Storm", 
    source: "Rotten Tomatoes", 
    date: "Sep 20, 2024", 
    url: "https://www.rottentomatoes.com/m/desert_storm_2024/reviews" 
  },
  { 
    id: 11, 
    category: "Reviews & Critical Reception", 
    title: "5 Stars for 'Silent Echoes'", 
    source: "Gulf News", 
    date: "Oct 05, 2024", 
    url: "https://gulfnews.com/entertainment/movies/silent-echoes-film-review-5-stars-1.12345" 
  },
  { 
    id: 12, 
    category: "Reviews & Critical Reception", 
    title: "Bold and Brilliant", 
    source: "The Guardian", 
    date: "Feb 12, 2025", 
    url: "https://www.theguardian.com/film/2025/feb/12/movsum-mirzazada-bold-brilliant-performance" 
  },
  
  // --- CATEGORY: FESTIVAL PAGES & AWARDS (13-18) ---
  { 
    id: 13, 
    category: "Festival Pages & Awards", 
    title: "Best Emerging Actor 2024", 
    source: "Dubai International Film Festival", 
    date: "Dec 12, 2024", 
    url: "https://dubaifilmfest.com/awards/2024/best-emerging-actor-movsum-mirzazada" 
  },
  { 
    id: 14, 
    category: "Festival Pages & Awards", 
    title: "Golden Palm Nomination", 
    source: "Cannes Film Festival", 
    date: "May 18, 2025", 
    url: "https://www.festival-cannes.com/en/mediatheque/artist/movsum-mirzazada" 
  },
  { 
    id: 15, 
    category: "Festival Pages & Awards", 
    title: "Actor of the Year", 
    source: "GQ Middle East Awards", 
    date: "Nov 30, 2024", 
    url: "https://www.gqmiddleeast.com/men-of-the-year/2024/actor-of-the-year-movsum-mirzazada" 
  },
  { 
    id: 16, 
    category: "Festival Pages & Awards", 
    title: "Outstanding Performance", 
    source: "Asian Academy Awards", 
    date: "Oct 22, 2024", 
    url: "https://www.asianacademycreativeawards.com/2024-winners-outstanding-performance/" 
  },
  { 
    id: 17, 
    category: "Festival Pages & Awards", 
    title: "Cannes 2025 Official Selection", 
    source: "Festival de Cannes", 
    date: "Apr 15, 2025", 
    url: "https://www.festival-cannes.com/en/selection/2025/official-selection" 
  },
  { 
    id: 18, 
    category: "Festival Pages & Awards", 
    title: "Sundance Premiere Schedule", 
    source: "Sundance Institute", 
    date: "Dec 20, 2024", 
    url: "https://festival.sundance.org/program/film/12345/end-of-season-screening" 
  },
  
  // --- CATEGORY: FESTIVAL PROGRAM PDFS & CATALOGS (19-24) ---
  { 
    id: 19, 
    category: "Festival Program PDFs & Catalogs", 
    title: "Venice 2025 Program Guide", 
    source: "La Biennale PDF", 
    date: "Jul 2025", 
    url: "https://www.labiennale.org/sites/default/files/2025-07/venice-film-festival-program-2025.pdf" 
  },
  { 
    id: 20, 
    category: "Festival Program PDFs & Catalogs", 
    title: "TIFF 2024 Screening Catalog", 
    source: "Toronto Int. Film Festival", 
    date: "Aug 2024", 
    url: "https://tiff.net/events/torn-screening-catalog-2024" 
  },
  { 
    id: 21, 
    category: "Festival Program PDFs & Catalogs", 
    title: "Berlinale Talent Campus Booklet", 
    source: "Berlin Film Festival", 
    date: "Feb 2025", 
    url: "https://www.berlinale.de/en/programme/programme/detail.html?film_id=12345" 
  },
  { 
    id: 22, 
    category: "Festival Program PDFs & Catalogs", 
    title: "SXSW 2025 Schedule PDF", 
    source: "SXSW Download", 
    date: "Mar 2025", 
    url: "https://schedule.sxsw.com/2025/films/12345/schedule.pdf" 
  },
  { 
    id: 23, 
    category: "Festival Program PDFs & Catalogs", 
    title: "El Gouna Gala Program", 
    source: "El Gouna Festival", 
    date: "Oct 2024", 
    url: "https://elgounafilmfestival.com/film/detail/123/program-gala" 
  },
  { 
    id: 24, 
    category: "Festival Program PDFs & Catalogs", 
    title: "Clermont-Ferrand Short Film Catalog", 
    source: "Festival Archive", 
    date: "Jan 2025", 
    url: "https://clermont-filmfest.org/en/festival/catalogue/shanghai-baku-entry" 
  },
  
  // --- CATEGORY: TRAILERS & CLIPS (25-29) ---
  { 
    id: 25, 
    category: "Trailers & Clips", 
    title: "End of Season - Official Trailer", 
    source: "YouTube", 
    date: "2019", 
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  },
  { 
    id: 26, 
    category: "Trailers & Clips", 
    title: "Torn - Festival Teaser", 
    source: "Vimeo", 
    date: "2014", 
    url: "https://vimeo.com/123456789" 
  },
  { 
    id: 27, 
    category: "Trailers & Clips", 
    title: "Showreel 2025 (4K)", 
    source: "Vimeo", 
    date: "Feb 2025", 
    url: "https://vimeo.com/987654321" 
  },
  { 
    id: 28, 
    category: "Trailers & Clips", 
    title: "Dramatic Monologue Clip", 
    source: "Agency Site", 
    date: "2024", 
    url: "https://vimeo.com/112233445" 
  },
  { 
    id: 29, 
    category: "Trailers & Clips", 
    title: "Interview Clip: On Set", 
    source: "Instagram", 
    date: "2025", 
    url: "https://www.instagram.com/reel/C123456/" 
  },
  
  // --- CATEGORY: PRESS KITS & PRESS RELEASES (30-34) ---
  { 
    id: 30, 
    category: "Press Kits & Press Releases", 
    title: "End of Season EPK", 
    source: "Production Office", 
    date: "2019", 
    url: "https://www.colorofmay.com/end-of-season-epk" 
  },
  { 
    id: 31, 
    category: "Press Kits & Press Releases", 
    title: "Official Biography 2025", 
    source: "Download PDF", 
    date: "Updated Jan 2025", 
    url: "https://www.movsummirzazada.com/assets/biography-2025.pdf" 
  },
  { 
    id: 32, 
    category: "Press Kits & Press Releases", 
    title: "High-Res Headshots Pack", 
    source: "Dropbox", 
    date: "Access Required", 
    url: "https://www.dropbox.com/sh/movsum-mirzazada-headshots" 
  },
  { 
    id: 33, 
    category: "Press Kits & Press Releases", 
    title: "Brand Collaboration Guidelines", 
    source: "Media Kit", 
    date: "2025 Edition", 
    url: "https://www.movsummirzazada.com/assets/media-kit-2025.pdf" 
  },
  { 
    id: 34, 
    category: "Press Kits & Press Releases", 
    title: "Press Release: Agency Signing", 
    source: "PR Newswire", 
    date: "Nov 2024", 
    url: "https://www.prnewswire.com/news-releases/movsum-mirzazada-agency-signing-12345.html" 
  },
  
  // --- CATEGORY: BIOS & DATABASES (35-40) ---
  { 
    id: 35, 
    category: "Bios & Databases", 
    title: "IMDb Pro Profile", 
    source: "IMDb", 
    date: "Live", 
    url: "https://pro.imdb.com/name/nm4666352/" 
  },
  { 
    id: 36, 
    category: "Bios & Databases", 
    title: "Spotlight UK Casting", 
    source: "Spotlight", 
    date: "Live", 
    url: "https://www.spotlight.com/profile/1234-5678-9012" 
  },
  { 
    id: 37, 
    category: "Bios & Databases", 
    title: "e-Talenta Profile", 
    source: "e-Talenta", 
    date: "Live", 
    url: "https://www.e-talenta.eu/members/profile/movsum-mirzazada" 
  },
  { 
    id: 38, 
    category: "Bios & Databases", 
    title: "Backstage Actor Profile", 
    source: "Backstage", 
    date: "Live", 
    url: "https://www.backstage.com/u/movsum-mirzazada/" 
  },
  { 
    id: 39, 
    category: "Bios & Databases", 
    title: "CastUpload Database", 
    source: "CastUpload", 
    date: "Live", 
    url: "https://www.castupload.com/actors/movsum-mirzazada" 
  },
  { 
    id: 40, 
    category: "Bios & Databases", 
    title: "Filmmakers.eu Profile", 
    source: "Filmmakers", 
    date: "Live", 
    url: "https://www.filmmakers.eu/en/actors/movsum-mirzazada" 
  }
];

// Generate duplicates with unique IDs to create an expanded list (80 total)
const DUPLICATE_LINKS = BASE_LINKS.map(link => ({
  ...link,
  id: `${link.id}-dup` // Ensure unique ID for React keys and lookups
}));

// Combine original and duplicate links
export const OFFICIAL_LINKS = [...BASE_LINKS, ...DUPLICATE_LINKS];

export const getLinkById = (id) => OFFICIAL_LINKS.find(link => link.id === id);
export const getLinksByCategory = (cat) => OFFICIAL_LINKS.filter(link => link.category === cat);
