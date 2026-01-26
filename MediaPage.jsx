import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Mic, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { getLinkById } from '@/lib/officialLinks';

// Components
import TimelineSlider from '@/components/TimelineSlider';
import FilterBar from '@/components/FilterBar';
import SmartFilmCard from '@/components/SmartFilmCard';
import PressKitTab from '@/components/PressKitTab';
import FilmDetailModal from '@/components/FilmDetailModal';
import PhotoGallery from '@/components/PhotoGallery';

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const interviews = [
  {
    title: "Inside the Actor's Studio: A Conversation with Mimo",
    source: 'Variety',
    date: 'Oct 2025',
    url: getLinkById(5)?.url || '#' // Link ID 5
  },
  {
    title: "On 'The Glass House' and Method Acting",
    source: 'The Hollywood Reporter',
    date: 'Jul 2025',
    url: getLinkById(7)?.url || '#' // Link ID 7
  },
  {
    title: 'The Art of Transformation',
    source: 'Deadline',
    date: 'Mar 2025',
    url: getLinkById(3)?.url || '#' // Link ID 3
  }
];

const press = [
  {
    title: "Discovering Azerbaijan in Cannes: A Talk with the Torn Cast",
    source: 'Huffington Post / AZERTAC',
    date: 'Jun 2014',
    url: getLinkById(14)?.url || 'https://www.azernews.az' // Link ID 14
  },
  {
    title: "Review: End of Season - 'Deeply mysterious... refreshing evocation'",
    source: 'Cineuropa',
    date: 'Feb 2019',
    url: getLinkById(8)?.url || 'https://cineuropa.org' // Link ID 8
  },
  {
    title: "Best Male Actor Award at Moscow Premiere Festival",
    source: 'Trend.az',
    date: 'Aug 2019',
    url: getLinkById(13)?.url || 'https://en.trend.az' // Link ID 13
  },
  {
    title: "Review: End of Season - 'Excellent performances, especially Mir-Movsum Mirzazade'",
    source: 'Barbican Centre',
    date: 'Jan 2020',
    url: getLinkById(12)?.url || 'https://www.barbican.org.uk' // Link ID 12
  },
  {
    title: "Thought-provoking Azerbaijani films screened to Parisian cinephiles",
    source: 'AZERTAC',
    date: 'Apr 2015',
    url: getLinkById(17)?.url || 'https://azertac.az' // Link ID 17
  }
];

const videoLinks = [
  {
    title: "Official YouTube Channel",
    source: "YouTube",
    url: getLinkById(25)?.url || "https://www.youtube.com/@movsummirzazada",
    description: "Interviews, showreels, and behind-the-scenes footage.",
    icon: Youtube
  },
  {
    title: "Instagram Feed",
    source: "Instagram",
    url: "https://www.instagram.com/movsum_mirzazada/",
    description: "Visual diaries, latest updates, and reels (119K followers).",
    icon: Instagram
  }
];

// UPDATED FILMOGRAPHY DATA WITH COMPLETE CREDITS AND RESTORED POSTERS
const filmographyData = [
  {
    id: 'end-of-season',
    title: 'End of Season',
    titleAlt: 'Ende der Saison · Mövsümün Sonu',
    year: 2019,
    format: 'feature',
    role: 'Mahmud',
    director: 'Elmar Imanov',
    credits: {
      director: 'Elmar Imanov',
      writer: 'Anar Imanov',
      cinematographer: 'Berta Valin Escofet, Driss Azhari',
      editor: 'Ioseb "Soso" Bliadze',
      soundDesigner: 'Jonas Thoma',
      producer: 'Eva Blondiau'
    },
    tags: ['Drama', 'Coming-of-age', 'International'],
    hasAwards: true,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/3e2b9668b36b04a61ef2baf41c52599e.webp',
    roleDescription: 'Lead Role (18-year-old son)',
    production: 'Color of May, Azerbaijanfilm',
    countries: 'Germany, Azerbaijan',
    languages: 'Azerbaijani',
    runtime: '92 minutes',
    premiere: '48th International Film Festival Rotterdam (IFFR)',
    premiereDate: 'January 2019',
    section: 'Bright Future',
    awards: ['Best Male Actor – Moscow Premiere (2019)', 'FIPRESCI Prize – IFFR 2019'],
    synopsis: 'Set in a two-room apartment in a massive housing block on the outskirts of Baku, the film follows Mahmud, a restless 18-year-old whose obsessive search for his own apartment becomes a metaphor for independence.',
    externalLink: getLinkById(25)?.url // Trailer
  },
  {
    id: 'shanghai-baku',
    title: 'Shanghai, Baku',
    year: 2016,
    format: 'short',
    role: 'Samir',
    director: 'Teymur Hajiyev',
    credits: {
      director: 'Teymur Hajiyev',
      writer: 'Teymur Hajiyev, Ismail Imanov',
      cinematographer: 'Kirill Gerra',
      editor: 'Ru Hasanov',
      soundDesigner: 'Teymur Kerimov',
      producer: 'Teymur Hajiyev, Ru Hasanov'
    },
    tags: ['Drama', 'Coming-of-age'],
    hasAwards: true,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/7c409ba6fd46c178c33b7ce5a536f695.jpg',
    synopsis: 'Samir secretly films his sister kissing her boyfriend and blackmails her. A dark exploration of family dynamics, power, and moral boundaries in the Shanghai neighborhood of Baku.',
    runtime: '20 minutes',
    languages: 'Azerbaijani, Russian',
    awards: ['Special Mention - Tampere Film Festival'],
    externalLink: getLinkById(24)?.url // Catalog
  },
  {
    id: 'ali-and-nino',
    title: 'Ali and Nino',
    year: 2016,
    format: 'feature',
    role: 'Supporting',
    director: 'Asif Kapadia',
    credits: {
      director: 'Asif Kapadia',
      writer: 'Christopher Hampton',
      cinematographer: 'Gökhan Tiryaki',
      editor: 'Alexander Berner',
      composer: 'Dario Marianelli',
      producer: 'Kris Thykier'
    },
    tags: ['Historical', 'Drama', 'International'],
    hasAwards: false,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/243c9ce15b0858f7bff58e38fbb0a7bc.jpg',
    synopsis: 'Epic romantic drama based on the 1937 novel by Kurban Said. Set during World War I, telling the story of love across cultural boundaries between a Muslim Azerbaijani boy and a Christian Georgian girl.',
    runtime: '100 minutes',
    languages: 'English',
    production: 'PeaPie Films',
    externalLink: getLinkById(35)?.url // IMDb
  },
  {
    id: 'qanli-yanvar',
    title: 'Bloody January',
    titleAlt: 'Qanlı Yanvar',
    year: 2015,
    format: 'feature',
    role: 'Supporting',
    director: 'Vahid Mustafayev',
    credits: {
      director: 'Vahid Mustafayev',
      cinematographer: 'Afshin Alizadeh',
      composer: 'Arya Aziminejad'
    },
    tags: ['Historical', 'Drama'],
    hasAwards: false,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/cbb3c36cee0e14615b94c1fcb6043130.png',
    synopsis: 'Historical drama depicting the tragic events of Black January 1990 in Baku, focusing on the struggle for independence and the personal costs of revolution.',
    runtime: '135 minutes',
    languages: 'Azerbaijani, Russian',
    externalLink: getLinkById(35)?.url // IMDb
  },
  {
    id: 'torn',
    title: 'Torn',
    year: 2014,
    format: 'short',
    role: 'Kid',
    director: 'Elmar Imanov',
    credits: {
       director: 'Elmar Imanov',
       writer: 'Anar Imanov',
       cinematographer: 'Berta Valin Escofet',
       producer: 'Eva Blondiau'
    },
    tags: ['Drama', 'Coming-of-age', 'International'],
    hasAwards: true,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/2feb3e211e078cae712681b8162cfbfd.jpg',
    synopsis: 'A thematic exploration of fractured connections between adult and child worlds. Premiere at Cannes Directors\' Fortnight.',
    runtime: '23 minutes',
    awards: ['Cannes Directors\' Fortnight - Premiere'],
    externalLink: getLinkById(26)?.url // Teaser
  },
  {
    id: 'buta',
    title: 'Buta',
    year: 2011,
    format: 'feature',
    role: 'Buta (Main)',
    director: 'Ilgar Najaf',
    credits: {
      director: 'Ilgar Najaf',
      writer: 'Ilgar Najaf',
      cinematographer: 'Georgi Beridze',
      composer: 'Javanshir Guliyev',
      producer: 'Khamis Muradov, Ilgar Najaf'
    },
    tags: ['Drama', 'Coming-of-age'],
    hasAwards: true,
    image: 'https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/7c43cece9b4e61f4f79dfe9f4abd3d5f.jpg',
    synopsis: 'A lonely 7-year-old boy named Buta lives in a mountain village with his grandmother. He befriends an old man who was once a carpet weaver and discovers the beauty of traditional crafts and resilience.',
    runtime: '98 minutes',
    languages: 'Azerbaijani',
    awards: ['Asia Pacific Screen Awards - Best Children\'s Feature Film'],
    externalLink: getLinkById(35)?.url // IMDb
  }
];

// ============================================================================
// COMPONENT: MediaCard
// ============================================================================
const MediaCard = ({ title, source, date, icon: Icon, url }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6 rounded-xl group relative overflow-hidden transition-all duration-300 hover:border-[#E0A995]/40 hover:bg-[#E0A995]/5 cursor-pointer block"
  >
    <div className="flex items-start gap-5 relative z-10">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#13251E] flex items-center justify-center border border-[#E0A995]/20 group-hover:scale-110 group-hover:border-[#E0A995] transition-all duration-300 shadow-inner">
          <Icon className="w-5 h-5 text-[#E0A995] group-hover:text-[#EBE8E3] transition-colors" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            {/* Improvement 7: Press credibility - visible source */}
            <span className="text-xs font-bold uppercase tracking-widest text-[#E0A995] mb-1 block opacity-80">{source}</span>
            <h3 className="text-xl font-serif font-medium text-[#EBE8E3] leading-snug group-hover:text-[#E0A995] transition-colors duration-300">{title}</h3>
          </div>
          {/* Improvement 7: External link indicator */}
          <ArrowUpRight className="w-4 h-4 text-[#A8B3AF] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
        </div>
        <div className="mt-4 pt-4 border-t border-[#E0A995]/10 flex items-center justify-between">
          {/* Improvement 7: Press credibility - visible date */}
          <span className="text-xs text-[#A8B3AF]">{date}</span>
        </div>
      </div>
    </div>
  </motion.a>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
const MediaPage = () => {
  // State
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("filmography");
  const [timelineRange, setTimelineRange] = useState([2011, 2019]);
  const [filters, setFilters] = useState({
    format: 'all',
    awardsOnly: false,
    years: [],
    themes: [],
    search: ''
  });
  
  // Initialize tab from URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['filmography', 'gallery', 'interviews', 'press', 'press-kit'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Modals
  const [selectedFilm, setSelectedFilm] = useState(null);

  // --- Filtering Logic ---
  const filteredFilms = useMemo(() => {
    return filmographyData.filter(film => {
      // 1. Timeline Range
      const inTimeRange = film.year >= timelineRange[0] && film.year <= timelineRange[1];
      if (!inTimeRange) return false;

      // 2. Format
      if (filters.format !== 'all' && film.format !== filters.format) return false;

      // 3. Awards
      if (filters.awardsOnly && !film.hasAwards) return false;

      // 4. Specific Years
      if (filters.years.length > 0 && !filters.years.includes(film.year)) return false;

      // 5. Themes
      if (filters.themes.length > 0) {
        const hasTheme = film.tags?.some(tag => filters.themes.includes(tag));
        if (!hasTheme) return false;
      }

      // 6. Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch = 
          film.title.toLowerCase().includes(query) ||
          film.director.toLowerCase().includes(query) ||
          film.role.toLowerCase().includes(query) ||
          (film.synopsis && film.synopsis.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [filters, timelineRange]);

  return (
    <>
      <Helmet>
        <title>Media & Press Kit | Movsum Mirzazada</title>
        <meta name="description" content="Official filmography, press kit, and media assets for Movsum Mirzazada. Download headshots, bio, and view complete works." />
        {/* Improvement 7: Canonical discipline */}
        <link rel="canonical" href="https://www.movsummirzazada.com/media" />
      </Helmet>

      <div className="bg-[#0A1612] text-[#EBE8E3] min-h-screen relative overflow-hidden">
        <GradientBackground />

        {/* Improvement 7: Semantic main landmark */}
        <main>
          {/* Hero Section */}
          <section className="relative py-24 md:py-32 px-8 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Improvement 7: Single H1 for page hierarchy */}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#EBE8E3] mb-4">
                Media & <span className="text-[#E0A995]">Press Center</span>
              </h1>
              <p className="mt-4 text-lg text-[#A8B3AF] max-w-2xl mx-auto leading-relaxed">
                Complete filmography, gallery, and official press assets.
              </p>
            </motion.div>
          </section>

          {/* Main Content */}
          <section className="py-12 px-4 md:px-8 z-10 relative">
            <div className="max-w-7xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                
                {/* Tab Navigation */}
                <div className="sticky top-4 z-40 mb-12">
                  <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 bg-[#13251E]/80 backdrop-blur-md border border-[#E0A995]/20 p-1 rounded-xl shadow-2xl h-auto">
                    {['filmography', 'gallery', 'interviews', 'press', 'press-kit'].map(tab => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612] text-[#A8B3AF] hover:text-[#EBE8E3] py-3 rounded-lg capitalize font-medium transition-all"
                      >
                        {tab.replace('-', ' ')}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* FILMOGRAPHY TAB */}
                <TabsContent value="filmography" className="space-y-8 min-h-[600px]">
                  {/* Improvement 7: Tab-level H2 for semantic hierarchy */}
                  <h2 className="sr-only">Filmography</h2>
                  
                  <TimelineSlider 
                    minYear={2011} 
                    maxYear={2019} 
                    onChange={setTimelineRange} 
                  />
                  
                  <FilterBar 
                    onFilterChange={setFilters} 
                    filmCount={filteredFilms.length} 
                    totalCount={filmographyData.length} 
                  />

                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                      {filteredFilms.length > 0 ? (
                        filteredFilms.map((film) => (
                          <SmartFilmCard
                            key={film.id}
                            film={film}
                            onViewDetails={setSelectedFilm}
                          />
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center text-[#A8B3AF] bg-[#13251E]/30 rounded-2xl border border-dashed border-[#E0A995]/20">
                          <p className="text-xl font-serif text-[#EBE8E3] mb-2">No projects found</p>
                          <p className="text-sm">Try adjusting your timeline or filters</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>

                {/* GALLERY TAB */}
                <TabsContent value="gallery" className="min-h-[600px]">
                  {/* Improvement 7: Tab-level H2 for semantic hierarchy */}
                  <h2 className="sr-only">Gallery</h2>
                  {/* Integration of the new PhotoGallery component */}
                  <PhotoGallery />
                </TabsContent>

                {/* PRESS KIT TAB */}
                <TabsContent value="press-kit" className="min-h-[600px]">
                  {/* Improvement 7: Tab-level H2 for semantic hierarchy */}
                  <h2 className="sr-only">Press Kit</h2>
                  <PressKitTab />
                </TabsContent>

                {/* INTERVIEWS TAB */}
                <TabsContent value="interviews" className="min-h-[600px]">
                  {/* Improvement 7: Tab-level H2 for semantic hierarchy */}
                  <h2 className="sr-only">Interviews</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {interviews.map((item, i) => <MediaCard key={i} {...item} icon={PlayCircle} />)}
                  </div>
                </TabsContent>

                {/* PRESS TAB */}
                <TabsContent value="press" className="min-h-[600px]">
                  {/* Improvement 7: Tab-level H2 for semantic hierarchy */}
                  <h2 className="sr-only">Press & Reviews</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {press.map((item, i) => <MediaCard key={i} {...item} icon={Mic} />)}
                  </div>
                  <div className="mt-16">
                    <h3 className="text-2xl font-serif text-[#EBE8E3] mb-8 text-center">Follow Official Channels</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                      {videoLinks.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#13251E] border border-[#E0A995]/20 rounded-xl hover:bg-[#E0A995] hover:text-[#0A1612] transition-colors group">
                          <link.icon className="w-5 h-5 text-[#E0A995] group-hover:text-[#0A1612]" />
                          <span className="font-medium">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>

              </Tabs>

              {/* Improvement 7: Internal authority links - subtle crawlable navigation */}
              <nav aria-label="Related pages" className="mt-16 pt-8 border-t border-[#E0A995]/10 text-center">
                <p className="text-sm text-[#A8B3AF]">
                  <a href="https://www.movsummirzazada.com/about" className="hover:text-[#E0A995] transition-colors">Learn more about Movsum</a>
                  {' · '}
                  <a href="https://www.movsummirzazada.com/contact" className="hover:text-[#E0A995] transition-colors">Get in touch</a>
                </p>
              </nav>
            </div>
          </section>
        </main>

        {/* Modals */}
        <AnimatePresence>
          {selectedFilm && (
            <FilmDetailModal
              film={selectedFilm}
              onClose={() => setSelectedFilm(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MediaPage;