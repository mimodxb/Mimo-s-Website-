import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import EditorialSection from '@/components/EditorialSection';
import HighlightsSection from '@/components/HighlightsSection';
import DualCTA from '@/components/DualCTA';
import OfficialLinks from '@/components/OfficialLinks';
import PressLogos from '@/components/PressLogos';
import HypnoticBackground from '@/components/HypnoticBackground';

const HomePage = () => {
  const pageTitle = "Movsum Mirzazada – Official Website";
  const pageDescription = "Official portfolio of Movsum Mirzazada, an international award-winning actor, founder, and creative director. Explore his work in cinema, creative projects, and entrepreneurial ventures.";
  const pageImage = "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/1761746969690-1-mtaiw.jpg";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Movsum Mirzazada",
    "alternateName": "Movsum Mirzazade",
    "jobTitle": "Film Director",
    "description": "Movsum Mirzazada, widely known as 'Mimo', is an award-winning Azerbaijani actor and creative entrepreneur. Recognized for his compelling performances in international cinema, including the FIPRESCI Prize-winning film 'End of Season', and as the founder of Mimo's Collective.",
    "url": "https://www.movsummirzazada.com/",
    "image": pageImage,
    "nationality": {
      "@type": "Country",
      "name": "Azerbaijani"
    },
    "knowsAbout": [
      "Cinematic Arts",
      "Film Production",
      "Acting",
      "Creative Direction",
      "Retail Management",
      "Event Operations"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Actor",
        "category": "Arts, Design, Entertainment, Sports, and Media"
      },
      {
        "@type": "Occupation",
        "name": "Film Director",
        "category": "Arts, Design, Entertainment, Sports, and Media"
      }
    ],
    "sameAs": [
      "https://www.imdb.com/name/nmXXXXXXXX/",
      "https://www.instagram.com/movsummirzazada/",
      "https://www.linkedin.com/in/movsum-mirzazada/",
      "https://twitter.com/movsummirzazada",
      "https://www.tiktok.com/@movsummirzazada"
    ],
    "subjectOf": [
      {
        "@type": "Movie",
        "name": "Torn",
        "datePublished": "2014"
      },
      {
        "@type": "Movie",
        "name": "Shanghai, Baku",
        "datePublished": "2016"
      },
      {
        "@type": "Movie",
        "name": "End of Season",
        "datePublished": "2019"
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Movsum Mirzazada, Mimo, actor, End of Season, FIPRESCI Prize, Azerbaijani cinema, international films, Cannes" />
        {/* SEO Improvement 7C - Canonical Discipline */}
        <link rel="canonical" href="https://www.movsummirzazada.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://movsummirzazada.com/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://movsummirzazada.com/" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={pageImage} />

        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <HypnoticBackground />

      <div className="relative z-10 min-h-screen text-[#EBE8E3] overflow-x-hidden selection:bg-[#E0A995] selection:text-[#0A1612]">
        <Hero />
        <EditorialSection />
        <HighlightsSection />
        <DualCTA />
        <OfficialLinks />
        <PressLogos />

        {/* SEO Improvement 7A - Explicit Crawlable Internal Links */}
        <nav aria-label="Site navigation" className="sr-only">
          <ul>
            <li><a href="https://www.movsummirzazada.com/">Home</a></li>
            <li><a href="https://www.movsummirzazada.com/about">About</a></li>
            <li><a href="https://www.movsummirzazada.com/media">Media</a></li>
            <li><a href="https://www.movsummirzazada.com/media?tab=filmography">Filmography</a></li>
            <li><a href="https://www.movsummirzazada.com/media?tab=gallery">Gallery</a></li>
            <li><a href="https://www.movsummirzazada.com/media?tab=press">Press</a></li>
            <li><a href="https://www.movsummirzazada.com/media?tab=press-kit">Press Kit</a></li>
            <li><a href="https://www.movsummirzazada.com/mimo-collective/shop">Shop</a></li>
            <li><a href="https://www.movsummirzazada.com/mimo-collective/legal-complaint-service">Legal Complaint Service</a></li>
            <li><a href="https://www.movsummirzazada.com/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HomePage;