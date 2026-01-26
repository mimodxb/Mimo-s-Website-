
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Award,
  Film,
  Briefcase,
  Globe,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  Quote,
  Mic,
  Cpu,
  GraduationCap,
  FileCheck,
  Medal,
} from "lucide-react";

// If your project supports "@/..." keep this import.
// If Hostinger Horizon in your setup doesn't support aliases, change to a relative path:
// e.g. "../components/GradientBackground"
import GradientBackground from "@/components/GradientBackground";
import VideoIntroduction from "@/components/VideoIntroduction";

/* ---------------------------------------------
   DATA (keep content separate from UI)
---------------------------------------------- */

const STATS = [
  { label: "Screen Credits", value: "24" },
  { label: "Theatre Plays", value: "34" },
  { label: "Intl. Awards", value: "5+" },
  { label: "Languages", value: "5" },
];

const TIMELINE_EVENTS = [
  {
    id: "2011-debut",
    year: "2011",
    title: "Cinematic Debut",
    description:
      'Early role in the award-winning film "Buta", initiating a career that would grow to include 24 screen appearances.',
    icon: Film,
  },
  {
    id: "2014-cannes",
    year: "2014",
    title: "Cannes Breakthrough",
    description:
      'International premiere of "Torn" at Cannes Film Festival Directors\' Fortnight. A pivotal collaboration with director Elmar Imanov.',
    icon: Globe,
  },
  {
    id: "2015-events",
    year: "2015",
    title: "Major Event Operations",
    description:
      "Contributed to the Baku European Games and later the 2016 Formula 1 Grand Prix, building a foundation in high-stakes event management.",
    icon: Users,
  },
  {
    id: "2016-international",
    year: "2016",
    title: "International Scale",
    description:
      'Starred in "Ali and Nino" (Dir. Asif Kapadia) and "Shanghai, Baku". Began balancing artistic pursuits with hospitality management studies.',
    icon: Film,
  },
  {
    id: "2019-peak",
    year: "2019",
    title: "Critical Peak",
    description:
      'Lead role in "End of Season". Won Best Male Actor at Moscow Premiere Film Festival and the FIPRESCI Prize at Rotterdam.',
    icon: Award,
  },
  {
    id: "2022-collective",
    year: "2022",
    title: "Mimo's Collective",
    description:
      "Founded a digital lifestyle and e-commerce brand in Dubai promoting sustainable fashion, content creation, and his 5 cats.",
    icon: Briefcase,
  },
  {
    id: "present-ambassador",
    year: "Present",
    title: "Global Ambassador",
    description:
      "Bridging the worlds of cinema and luxury retail between Baku and Dubai, continuing to expand a versatile international portfolio.",
    icon: Star,
  },
];

const PROFESSIONAL_EXPERIENCE = [
  {
    id: "four-more-2023",
    role: "Operations & Retail Manager",
    company: "Four&More Living Interior Designs LLC",
    location: "Dubai",
    period: "Oct 2023 – Nov 2025",
    description:
      "Revamped vendor management across 15+ suppliers, improving stock fulfillment by 25% and reducing delays by 37%. Installed and trained staff on Lightspeed POS, and built fully operational SMM and eCommerce systems to drive digital growth.",
  },
  {
    id: "collective-africa-2021",
    role: "Sales Executive",
    company: "Collective Africa by Tashas",
    location: "Dubai",
    period: "Aug 2021 – Oct 2023",
    description:
      "Boosted monthly sales revenue by 28% using CRM analytics to target premium clients. Secured exclusive distribution agreements increasing premium product sales by AED 750K quarterly.",
  },
  {
    id: "flamingo-room-2019",
    role: "Dining Experience Coordinator",
    company: "Flamingo Room by Tashas Restaurant",
    location: "UAE",
    period: "Sept 2019 – Jul 2021",
    description:
      "Delivered fast, accurate service to high-volume tables. Upsold menu items to enhance revenue while collaborating closely with kitchen teams to ensure smooth service flow and consistent guest satisfaction.",
  },
  {
    id: "corniche-2018",
    role: "Reservations Sales Manager",
    company: "Corniche Hotel Baku",
    location: "Baku",
    period: "Jun 2018 – Aug 2019",
    description:
      "Responded to 50+ daily booking inquiries during peak season. Collaborated with Revenue and Front Office teams to maintain 90% occupancy rates without compromising guest experience.",
  },
  {
    id: "alumni-2016",
    role: "Executive Director Assistant",
    company: "The US Educated Azerbaijani Alumni Association",
    location: "Baku",
    period: "Sept 2016 – Jan 2018",
    description:
      "Centralized communications across 12+ active vendors and implemented standardized procurement protocols, improving stock fulfillment rate by 25%.",
  },
];

const EDUCATION = [
  {
    id: "tourism-college",
    degree: "Diploma in Tourism Management - Hospitality",
    school: "Azerbaijan State Tourism College",
    period: "2016 – 2018",
    details: "Graduated with distinction (Highest Rate).",
  },
  {
    id: "school-46",
    degree: "Humanities/Humanistic Studies",
    school: "Secondary School No. 46 (Agabey Novruzbeyli)",
    period: "2005 – 2016",
    details: "High School Diploma.",
  },
];

const CERTIFICATIONS = [
  "Azerbaijan Theatre Workers Union - Member (since 2019)",
  "Certificate in Public & Governmental Affairs Engagement",
  "Definition of Objectives & Conflict Management",
  "First-Aid Certification (BCC Academy)",
  "Musical Theory and Literature (Youth Creativity Center)",
  "European Games & F1 Grand Prix Contributor (2015/2016)",
];

const AWARDS = [
  {
    id: "best-male-actor-2019",
    title: "Best Male Actor",
    event: "Moscow Premiere Film Festival",
    year: "2019",
    work: "End of Season",
    icon: Award,
  },
  {
    id: "fipresci-2019",
    title: "FIPRESCI Prize",
    event: "Intl. Film Festival Rotterdam",
    year: "2019",
    work: "End of Season",
    icon: Star,
  },
  {
    id: "goeast-2019",
    title: "Official Selection",
    event: "GoEast Film Festival Wiesbaden",
    year: "2019",
    work: "End of Season",
    icon: Globe,
  },
  {
    id: "batumi-best-film-2019",
    title: "Best Film",
    event: "Batumi International Art-House Film Festival",
    year: "2019",
    work: "End of Season",
    icon: Film,
  },
  {
    id: "baku-2015",
    title: "Certificate of Appreciation",
    event: "Baku 2015 European Games",
    year: "2015",
    work: "Event Operations",
    icon: Medal,
  },
  {
    id: "f1-2016",
    title: "Certificate of Excellence",
    event: "Formula 1 Azerbaijan Grand Prix",
    year: "2016",
    work: "Event Management",
    icon: FileCheck,
  },
  {
    id: "dubai-exchange-2022",
    title: "Cultural Commendation",
    event: "Dubai Cultural Exchange",
    year: "2022",
    work: "Cross-Cultural Relations",
    icon: Users,
  },
];

const COLLABORATIONS = [
  {
    id: "elmar-imanov",
    name: "Elmar Imanov",
    role: "Director",
    desc: "A defining partnership spanning 'Torn' and 'End of Season', establishing a new wave of Azerbaijani arthouse cinema.",
  },
  {
    id: "asif-kapadia",
    name: "Asif Kapadia",
    role: "Director",
    desc: "Worked under the direction of the Academy Award winner on the epic historical drama 'Ali and Nino'.",
  },
];

const SKILLS = [
  {
    id: "languages",
    category: "Languages",
    icon: Mic,
    items: [
      "Azerbaijani (Native)",
      "English (Fluent)",
      "Russian (Advanced)",
      "Turkish (Fluent)",
      "Arabic (Conversational)",
    ],
  },
  {
    id: "corporate-tech",
    category: "Corporate & Tech",
    icon: Cpu,
    items: [
      "AI & Machine Learning",
      "Web Design/Coding",
      "Automations",
      "SMM & eCommerce",
      "Lightspeed POS",
      "Adobe Creative Suite",
    ],
  },
  {
    id: "leadership-art",
    category: "Leadership & Art",
    icon: Briefcase,
    items: [
      "Project Management",
      "Influence Marketing",
      "Motion Capture",
      "AI Voice Tools",
      "Creative Direction",
      "Customer Experience",
    ],
  },
];

/* ---------------------------------------------
   UI COMPONENTS
---------------------------------------------- */

function TimelineItemContent({ event, isExpanded, onToggle, align = "left" }) {
  const controlsId = `timeline-panel-${event.id}`;
  const reduceMotion = useReducedMotion();

  return (
    <m.button
      type="button"
      layout
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      initial={false}
      animate={{
        backgroundColor: isExpanded ? "rgba(15, 28, 21, 1)" : "rgba(10, 22, 18, 1)",
        borderColor: isExpanded ? "rgba(224, 169, 149, 0.6)" : "rgba(224, 169, 149, 0.2)",
      }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
      className={[
        "relative p-6 rounded-lg border",
        "hover:border-[#E0A995]/50 cursor-pointer group shadow-lg shadow-black/30 overflow-hidden",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A995] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1612]",
        align === "right" ? "text-right" : "text-left",
        isExpanded ? "shadow-[0_0_20px_rgba(224,169,149,0.1)]" : "",
      ].join(" ")}
    >
      {/* Year watermark */}
      <span
        className={[
          "text-5xl font-bold text-[#E0A995]/5 absolute -top-4",
          align === "right" ? "right-4" : "left-4",
          "transition-colors group-hover:text-[#E0A995]/10 select-none pointer-events-none",
        ].join(" ")}
      >
        {event.year}
      </span>

      <m.div layout="position" className="relative z-10">
        <div className={`flex items-center gap-4 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
          <div className="flex-grow">
            <span className="text-[#E0A995] text-xs font-bold uppercase tracking-wider mb-1 block">
              {event.year}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#EBE8E3] group-hover:text-[#E0A995] transition-colors">
              {event.title}
            </h3>
          </div>

          <m.div
            aria-hidden="true"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "backOut" }}
            className="text-[#E0A995] flex-shrink-0"
          >
            <ChevronDown size={20} />
          </m.div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <m.div
              id={controlsId}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <m.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.25, delay: 0.05 }}
                className="text-[#A8B3AF] text-sm leading-relaxed mt-4 pt-4 border-t border-[#E0A995]/20"
              >
                {event.description}
              </m.p>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.button>
  );
}

function ProfessionalItemContent({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controlsId = `job-panel-${job.id}`;
  const reduceMotion = useReducedMotion();

  return (
    <m.button
      type="button"
      layout
      onClick={() => setIsExpanded((v) => !v)}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      initial={false}
      animate={{
        backgroundColor: isExpanded ? "rgba(15, 28, 21, 1)" : "rgba(10, 22, 18, 1)",
        borderColor: isExpanded ? "rgba(224, 169, 149, 0.6)" : "rgba(224, 169, 149, 0.2)",
      }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3 }}
      className={[
        "group relative rounded-lg border p-8 cursor-pointer hover:border-[#E0A995]/50 overflow-hidden text-left w-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A995] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1612]",
      ].join(" ")}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E0A995] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-lg" />

      <m.div layout="position" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-4">
          <div className="flex-grow">
            <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] group-hover:text-[#E0A995] transition-colors">
              {job.role}
            </h3>
            <div className="flex items-center gap-2 text-[#E0A995] mt-1 font-medium">
              <Briefcase size={16} />
              <span>{job.company}</span>
            </div>
          </div>

          <div className="text-left md:text-right flex-shrink-0 flex items-start gap-4">
            <div>
              <span className="block text-[#A8B3AF] font-bold">{job.period}</span>
              <span className="block text-[#E0A995]/60 text-sm">{job.location}</span>
            </div>

            <m.div
              aria-hidden="true"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "backOut" }}
              className="text-[#E0A995] flex-shrink-0 mt-1"
            >
              <ChevronDown size={20} />
            </m.div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <m.div
              id={controlsId}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <m.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.25, delay: 0.05 }}
                className="text-[#A8B3AF] leading-relaxed border-t border-[#E0A995]/10 pt-4 mt-4"
              >
                {job.description}
              </m.p>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.button>
  );
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */

export default function AboutPage() {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax effects (disabled when user prefers reduced motion)
  const heroY = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, reduceMotion ? 1 : 0]);

  const fadeInUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.6 } },
    }),
    [reduceMotion]
  );

  const staggerContainer = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: reduceMotion ? 0 : 0.15 } },
    }),
    [reduceMotion]
  );

  return (
    <>
      <Helmet>
        <title>About | Movsum Mirzazada "Mimo"</title>
        <meta
          name="description"
          content="Biography of Movsum Mirzazada. Discover the journey of the award-winning actor and Senior Retail & Customer Experience Manager."
        />
        {/* Optional but professional for sharing */}
        <meta property="og:title" content='About | Movsum Mirzazada "Mimo"' />
        <meta
          property="og:description"
          content="Actor & creative professional bridging cinematic storytelling and executive leadership in customer experience."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.movsummirzazada.com/about" />
      </Helmet>

      <LazyMotion features={domAnimation}>
        {/* Skip link (small but very “pro” accessibility upgrade) */}
        <a
          href="#about-main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#E0A995] focus:text-[#0A1612] focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <div className="bg-[#0A1612] text-[#EBE8E3] min-h-screen relative overflow-x-hidden font-sans selection:bg-[#E0A995] selection:text-[#0A1612]">
          <GradientBackground />

          <main id="about-main">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[80vh] px-6 md:px-12 text-center z-10 flex flex-col items-center justify-center overflow-hidden">
              <m.div
                style={{ y: heroY, opacity: heroOpacity }}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-4xl mx-auto relative z-20"
              >
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#E0A995]/10 border border-[#E0A995]/20 text-[#E0A995] text-xs md:text-sm tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                  Actor & Creative Professional
                </span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#EBE8E3] mb-8 leading-[1.1]">
                  The Man Behind <br className="hidden md:block" />
                  the{" "}
                  <span className="text-[#E0A995] italic relative inline-block">
                    Vision
                    {!reduceMotion && (
                      <m.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute w-full h-4 -bottom-2 left-0 text-[#E0A995]"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                      </m.svg>
                    )}
                  </span>
                </h1>

                <p className="mt-8 text-lg md:text-2xl text-[#A8B3AF] max-w-2xl mx-auto leading-relaxed font-light">
                  Bridging the gap between cinematic storytelling and executive leadership in customer experience.
                </p>
              </m.div>

              {/* Scroll Indicator */}
              <m.div
                style={{ opacity: heroOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduceMotion ? { duration: 0 } : { delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#A8B3AF]/50"
                aria-hidden="true"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#E0A995] to-transparent" />
              </m.div>
            </section>

            {/* --- BIOGRAPHY SECTION --- */}
            <section className="py-24 px-6 md:px-12 z-10 relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Video Column */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: reduceMotion ? 0 : 0.8 }}
                  className="lg:col-span-5 relative group"
                >
                  <div className="absolute inset-0 bg-[#E0A995] rounded-2xl transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 opacity-20" />
                  <div className="absolute inset-0 border border-[#E0A995]/30 rounded-2xl transform -translate-x-3 -translate-y-3 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />

                  <div className="relative z-10">
                    <VideoIntroduction />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 bg-white/5 backdrop-blur-sm rounded border border-white/5"
                      >
                        <span className="text-2xl font-serif font-bold text-[#E0A995] block">
                          {stat.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#A8B3AF]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Press Kit Link (accessible + secure) */}
                  <div className="mt-8 flex justify-center">
                    <a
                      href="/assets/movsum-mirzazada-cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-8 py-4 bg-[#E0A995] text-[#0A1612] font-semibold rounded hover:bg-[#c99683] transition-all duration-300 w-full justify-center"
                    >
                      <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                      <span>Download CV / Press Kit</span>
                    </a>
                  </div>
                </m.div>

                {/* Text Column */}
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}
                  className="lg:col-span-7 space-y-8"
                >
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#EBE8E3] mb-6">
                    A Narrative of Quiet Intensity
                  </h2>

                  <div className="text-[#A8B3AF] text-lg leading-relaxed space-y-6 font-light">
                    <p>
                      In the landscape of contemporary international arthouse cinema,{" "}
                      <strong className="text-[#E0A995] font-medium">Movsum Mirzazada (Mimo)</strong>{" "}
                      has emerged as a figure of "quiet intensity". With a career spanning 24 films and 34 theatre
                      productions, his work is characterized by an understated power and a capacity to convey deep-seated
                      turmoil beneath a deceptively placid surface.
                    </p>

                    <p>
                      Best known for his leading role in <em>End of Season</em> (2019)—which won the FIPRESCI Prize at
                      Rotterdam and earned him the Best Male Actor award at the Moscow Premiere Film Festival—Movsum
                      embodies the "director's actor". His collaborative relationships with filmmakers like Elmar Imanov
                      have positioned him at the center of a new wave of Azerbaijani cinema gaining critical traction on
                      the world stage.
                    </p>

                    <AnimatePresence initial={false}>
                      {isBioExpanded && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
                          className="space-y-6 overflow-hidden"
                        >
                          <p>
                            Beyond the screen, Mimo lives by the philosophy:{" "}
                            <em className="text-[#E0A995]">
                              "Life is service - whether you serve a guest, an audience, or a customer, always give your
                              best."
                            </em>{" "}
                            This ethos bridges his artistic career with a successful tenure in luxury retail and
                            hospitality management. From contributing to the Baku Formula 1 Grand Prix to managing
                            operations for high-profile brands in Dubai, he applies the same dedication to customer
                            experience as he does to character study.
                          </p>
                          <p>
                            In 2022, he founded <strong>Mimo's Collective</strong>, a digital lifestyle brand based in
                            Dubai that champions sustainable fashion, curated e-commerce, and creative content—often
                            featuring his 5 cats, the brand's beloved mascots. Today, he continues to work as a versatile
                            cultural ambassador, blending the worlds of cinematic storytelling and creative
                            entrepreneurship.
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => setIsBioExpanded((v) => !v)}
                      aria-expanded={isBioExpanded}
                      className="flex items-center gap-2 text-[#E0A995] hover:text-[#EBE8E3] transition-colors mt-4 text-sm tracking-widest uppercase font-semibold border-b border-transparent hover:border-[#E0A995] pb-1"
                    >
                      {isBioExpanded ? (
                        <>
                          Read Less <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Read Full Biography <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quote Block */}
                  <div className="bg-[#0F1C15] p-10 rounded-r-2xl border-l-4 border-[#E0A995] relative mt-12 shadow-lg shadow-black/20">
                    <Quote className="absolute top-6 right-6 text-[#E0A995]/20 w-10 h-10" aria-hidden="true" />
                    <p className="text-xl md:text-2xl font-serif italic text-[#EBE8E3] relative z-10 leading-normal">
                      "Life is service - whether you serve a guest, an audience, or a customer, always give your best."
                    </p>
                  </div>
                </m.div>
              </div>
            </section>

            {/* --- SKILLS & EXPERTISE --- */}
            <section className="py-20 px-6 md:px-12 bg-[#0F1C15]/30 z-10 relative">
              <div className="max-w-6xl mx-auto">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3]">Competencies</h2>
                  <div className="h-0.5 w-16 bg-[#E0A995] mx-auto mt-6" />
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SKILLS.map((skillGroup, idx) => {
                    const Icon = skillGroup.icon;
                    return (
                      <m.div
                        key={skillGroup.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : idx * 0.08,
                        }}
                        className="bg-[#0A1612] p-8 rounded-lg border border-[#E0A995]/10 hover:border-[#E0A995]/40 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-[#E0A995]/10 rounded-full text-[#E0A995] group-hover:bg-[#E0A995] group-hover:text-[#0A1612] transition-colors">
                            <Icon size={24} />
                          </div>
                          <h3 className="text-xl font-serif font-bold text-[#EBE8E3]">{skillGroup.category}</h3>
                        </div>

                        <ul className="space-y-3">
                          {skillGroup.items.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-[#A8B3AF]">
                              <span className="w-1.5 h-1.5 bg-[#E0A995] rounded-full" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* --- PROFESSIONAL EXPERIENCE --- */}
            <section className="py-24 px-6 md:px-12 z-10 relative bg-[#0A1612] bg-gradient-to-b from-[#0A1612] via-[#0F1C15] to-[#0A1612]">
              <div className="max-w-4xl mx-auto">
                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  className="text-4xl font-serif font-bold text-[#EBE8E3] text-center mb-20"
                >
                  Professional Career
                </m.h2>

                <div className="space-y-8">
                  {PROFESSIONAL_EXPERIENCE.map((job, index) => (
                    <m.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.45,
                        delay: reduceMotion ? 0 : index * 0.06,
                      }}
                    >
                      <ProfessionalItemContent job={job} />
                    </m.div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- EDUCATION & CERTIFICATIONS --- */}
            <section className="py-24 px-6 md:px-12 z-10 relative">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Education */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.55 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <GraduationCap className="text-[#E0A995] w-8 h-8" />
                    <h2 className="text-3xl font-serif font-bold text-[#EBE8E3]">Education</h2>
                  </div>

                  <div className="space-y-6">
                    {EDUCATION.map((edu) => (
                      <div key={edu.id} className="bg-white/5 p-6 rounded-lg border-l-2 border-[#E0A995]">
                        <h3 className="text-xl font-bold text-[#EBE8E3] mb-1">{edu.degree}</h3>
                        <p className="text-[#E0A995]">{edu.school}</p>
                        <div className="flex justify-between items-center mt-2 text-sm text-[#A8B3AF] gap-4">
                          <span>{edu.period}</span>
                          <span className="italic text-right">{edu.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </m.div>

                {/* Certifications */}
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.55 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <FileCheck className="text-[#E0A995] w-8 h-8" />
                    <h2 className="text-3xl font-serif font-bold text-[#EBE8E3]">Certifications</h2>
                  </div>

                  <div className="space-y-4">
                    {CERTIFICATIONS.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-start gap-3 p-4 bg-[#0F1C15] rounded-lg border border-transparent hover:border-[#E0A995]/30 transition-colors"
                      >
                        <div className="mt-1 w-2 h-2 rounded-full bg-[#E0A995] flex-shrink-0" aria-hidden="true" />
                        <span className="text-[#A8B3AF]">{cert}</span>
                      </div>
                    ))}
                  </div>
                </m.div>
              </div>
            </section>

            {/* --- AWARDS & RECOGNITION --- */}
            <section className="py-24 px-6 md:px-12 bg-[#0F1C15]/50 relative z-10">
              <div className="max-w-7xl mx-auto">
                <m.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#EBE8E3]">
                      Awards & Recognition
                    </h2>
                    <p className="text-[#A8B3AF] mt-2 max-w-md">
                      Honors from film festivals and major international events.
                    </p>
                  </div>
                  <div className="h-px bg-[#E0A995]/30 flex-grow md:ml-12 mb-2" />
                </m.div>

                <m.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {AWARDS.map((award) => {
                    const Icon = award.icon;
                    return (
                      <m.div
                        key={award.id}
                        variants={fadeInUp}
                        className="bg-[#0A1612] border border-[#E0A995]/20 p-8 rounded-lg hover:border-[#E0A995]/60 hover:shadow-[0_0_30px_rgba(224,169,149,0.1)] transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Icon size={60} aria-hidden="true" />
                        </div>

                        <h3 className="text-lg font-bold text-[#EBE8E3] mb-2 relative z-10">{award.title}</h3>
                        <p className="text-[#E0A995] text-sm mb-6 font-medium tracking-wide relative z-10">
                          {award.event}
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end gap-4">
                          <div>
                            <span className="text-xs text-[#A8B3AF] uppercase tracking-wider block mb-1">Project</span>
                            <span className="text-sm text-[#EBE8E3] italic">{award.work}</span>
                          </div>
                          <span className="text-xl font-bold text-[#E0A995]/40">{award.year}</span>
                        </div>
                      </m.div>
                    );
                  })}
                </m.div>
              </div>
            </section>

            {/* --- CAREER MILESTONES (TIMELINE) --- */}
            <section className="py-24 px-6 md:px-12 relative z-10 overflow-hidden">
              <div className="max-w-4xl mx-auto">
                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  className="text-4xl font-serif font-bold text-[#EBE8E3] text-center mb-20"
                >
                  Career Milestones
                </m.h2>

                <div className="relative">
                  {/* Central Line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E0A995]/0 via-[#E0A995]/40 to-[#E0A995]/0 transform md:-translate-x-1/2" />

                  {TIMELINE_EVENTS.map((event, index) => {
                    const isExpanded = expandedEventId === event.id;
                    const handleToggle = () => setExpandedEventId(isExpanded ? null : event.id);
                    const Icon = event.icon;

                    return (
                      <m.div
                        key={event.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : index * 0.06,
                        }}
                        className="mb-16 flex flex-col md:flex-row items-start md:items-center relative"
                      >
                        {/* Left column (desktop) */}
                        <div
                          className={`hidden md:block w-1/2 ${
                            index % 2 === 0 ? "order-1 pr-16" : "order-3 pl-16"
                          }`}
                        >
                          {index % 2 === 0 && (
                            <TimelineItemContent
                              event={event}
                              isExpanded={isExpanded}
                              onToggle={handleToggle}
                              align="right"
                            />
                          )}
                        </div>

                        {/* Icon Node */}
                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center order-2 z-10">
                          <div
                            className={[
                              "w-16 h-16 bg-[#0A1612] border-2 border-[#E0A995] rounded-full flex items-center justify-center text-[#E0A995]",
                              "shadow-[0_0_20px_rgba(224,169,149,0.2)] transition-all duration-300",
                              isExpanded
                                ? "scale-110 shadow-[0_0_30px_rgba(224,169,149,0.4)] bg-[#E0A995]/10"
                                : "",
                            ].join(" ")}
                            aria-hidden="true"
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Right column (desktop & mobile) */}
                        <div
                          className={`w-full md:w-1/2 pl-24 md:pl-0 ${
                            index % 2 !== 0 ? "md:pl-16 order-3" : "md:hidden order-3"
                          }`}
                        >
                          <div className={index % 2 === 0 ? "md:hidden" : ""}>
                            <TimelineItemContent
                              event={event}
                              isExpanded={isExpanded}
                              onToggle={handleToggle}
                              align="left"
                            />
                          </div>
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* --- COLLABORATIONS --- */}
            <section className="py-20 px-6 md:px-12 z-10 relative bg-[#0F1C15]">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-[#EBE8E3] mb-12 text-center">
                  Key Collaborations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {COLLABORATIONS.map((collab) => (
                    <m.div
                      key={collab.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: reduceMotion ? 0 : 0.4 }}
                      className="p-10 border border-[#E0A995]/20 bg-[#0A1612] relative overflow-hidden group hover:bg-[#0A1612]/80 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#E0A995] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                      <h3 className="text-3xl font-serif text-[#EBE8E3] mb-2">{collab.name}</h3>
                      <span className="text-[#E0A995] text-xs uppercase tracking-[0.2em] mb-6 block">
                        {collab.role}
                      </span>
                      <p className="text-[#A8B3AF] font-light leading-relaxed">{collab.desc}</p>
                    </m.div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-32 px-6 text-center z-10 relative">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-[#EBE8E3] text-2xl font-serif italic mb-8">
                  "Dedicated to the craft, driven by the story."
                </p>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#E0A995]/50 to-transparent mx-auto" />
              </m.div>
            </section>
          </main>
        </div>
      </LazyMotion>
    </>
  );
}
