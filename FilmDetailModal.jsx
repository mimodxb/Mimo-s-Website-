
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Award, Globe, Clock, Calendar, Video, BookOpen, Quote, Users, Feather, Camera, Scissors, Volume2, Paintbrush, Zap, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FilmDetailModal = ({ film, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!film) return null;

  // Helper to get credit from either flat structure or nested credits object
  const getCredit = (key) => {
    if (film.credits && film.credits[key]) return film.credits[key];
    return film[key]; // Fallback to flat structure
  };

  const director = getCredit('director') || film.director;
  const writtenBy = getCredit('writer') || film.writtenBy;
  const dop = getCredit('cinematographer') || film.directorOfPhotography;
  const editor = getCredit('editor') || film.editor;
  const sound = getCredit('soundDesigner') || film.sound;
  const music = getCredit('composer');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-5xl bg-[#0A1612] border border-[#E0A995]/20 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-96">
             <img 
              src={film.image} 
              alt={film.title}
              className="w-full h-full object-cover top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1612] via-[#0A1612]/60 to-transparent" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 text-white bg-black/20 hover:bg-[#E0A995] hover:text-[#0A1612] rounded-full transition-all duration-300"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {film.hasAwards && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#E0A995] text-[#0A1612] text-xs font-bold uppercase tracking-wider rounded-full">
                    <Award className="w-3 h-3" /> Award Winning
                  </div>
                )}
                <div className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                  {film.year}
                </div>
                <div className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                  {film.format === 'feature' ? 'Feature Film' : 'Short Film'}
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#EBE8E3] mb-2 leading-tight">{film.title}</h2>
              {film.tagline && (
                <p className="text-lg md:text-xl text-[#A8B3AF] italic mb-4">{film.tagline}</p>
              )}
              {film.titleAlt && (
                <p className="text-lg md:text-xl text-[#A8B3AF] italic">{film.titleAlt}</p>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Synopsis */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-[#E0A995]" />
                  <h3 className="text-xl font-serif font-semibold text-[#EBE8E3]">Synopsis</h3>
                </div>
                <p className="text-[#A8B3AF] leading-relaxed text-lg">{film.synopsis}</p>
              </section>

              {/* Themes & Context */}
              {(film.themes || film.context) && (
                <section className="bg-[#13251E]/30 p-6 rounded-xl border border-[#E0A995]/10">
                  <h4 className="text-[#E0A995] font-serif font-medium mb-3">Themes & Context</h4>
                  {film.themes && <p className="text-[#A8B3AF] text-sm leading-relaxed mb-4">{film.themes}</p>}
                  {film.context && <p className="text-[#A8B3AF]/80 text-sm leading-relaxed italic border-l-2 border-[#E0A995]/30 pl-4">{film.context}</p>}
                </section>
              )}

              {/* Character Analysis */}
              {film.character && (
                <section>
                  <h3 className="text-xl font-serif font-semibold text-[#EBE8E3] mb-4">Character Analysis</h3>
                  <p className="text-[#A8B3AF] leading-relaxed">{film.character}</p>
                </section>
              )}

              {/* Director's Note */}
              {film.directorsNote && (
                 <section className="relative p-8 bg-[#E0A995]/5 rounded-xl border border-[#E0A995]/10">
                   <Quote className="absolute top-6 left-6 w-8 h-8 text-[#E0A995]/20" />
                   <blockquote className="relative z-10 text-center">
                     <p className="text-lg font-serif italic text-[#EBE8E3] mb-4">"{film.directorsNote}"</p>
                     <footer className="text-sm text-[#E0A995] font-medium tracking-wide uppercase">— Director's Note</footer>
                   </blockquote>
                 </section>
              )}

              {/* Critical Reception */}
              {film.critical && (
                <section>
                  <h3 className="text-xl font-serif font-semibold text-[#EBE8E3] mb-4">Critical Reception</h3>
                  <p className="text-[#A8B3AF] leading-relaxed">{film.critical}</p>
                </section>
              )}
            </div>

            {/* Right Column: Metadata */}
            <div className="space-y-8">
              {/* Key Stats */}
              <div className="bg-[#13251E]/50 rounded-xl p-6 border border-[#E0A995]/10 space-y-4">
                <div>
                   <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Director</h4>
                   <p className="text-[#EBE8E3] font-medium">{director}</p>
                </div>
                {film.role && (
                  <div>
                     <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Role</h4>
                     <p className="text-[#EBE8E3] font-medium">{film.role}</p>
                     {film.roleDescription && <p className="text-xs text-[#A8B3AF]">{film.roleDescription}</p>}
                  </div>
                )}
                <div>
                   <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Production</h4>
                   <p className="text-[#EBE8E3] text-sm">{film.production}</p>
                </div>
                {film.producedBy && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Produced By</h4>
                    <p className="text-[#EBE8E3] text-sm">{film.producedBy}</p>
                  </div>
                )}
                {film.cast && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Cast
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{film.cast}</p>
                  </div>
                )}
                {writtenBy && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Feather className="w-3 h-3" /> Written By
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{writtenBy}</p>
                  </div>
                )}
                {dop && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Camera className="w-3 h-3" /> Cinematography
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{dop}</p>
                  </div>
                )}
                {editor && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Scissors className="w-3 h-3" /> Editor
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{editor}</p>
                  </div>
                )}
                {sound && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> Sound Design
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{sound}</p>
                  </div>
                )}
                {music && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1 flex items-center gap-1">
                      <Music className="w-3 h-3" /> Music
                    </h4>
                    <p className="text-[#EBE8E3] text-sm">{music}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Runtime</h4>
                    <p className="text-[#EBE8E3] text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {film.runtime || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Year</h4>
                    <p className="text-[#EBE8E3] text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {film.year}
                    </p>
                  </div>
                </div>
                <div>
                   <h4 className="text-xs uppercase tracking-widest text-[#E0A995]/70 mb-1">Languages</h4>
                   <p className="text-[#A8B3AF] text-sm flex items-center gap-1">
                     <Globe className="w-3 h-3" /> {film.languages}
                   </p>
                </div>
              </div>

              {/* Premiere Info */}
              {film.premiere && (
                <div className="border-t border-[#E0A995]/10 pt-6">
                  <h4 className="text-[#E0A995] font-serif font-medium mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4" /> Premiere
                  </h4>
                  <p className="text-[#EBE8E3] text-sm mb-1">{film.premiere}</p>
                  {film.premiereDate && <p className="text-[#A8B3AF] text-xs">{film.premiereDate}</p>}
                  {film.section && <p className="text-[#E0A995]/70 text-xs mt-1">{film.section}</p>}
                </div>
              )}

              {/* Awards List */}
              {film.awards && film.awards.length > 0 && (
                <div className="border-t border-[#E0A995]/10 pt-6">
                  <h4 className="text-[#E0A995] font-serif font-medium mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Awards
                  </h4>
                  <ul className="space-y-3">
                    {film.awards.map((award, idx) => (
                      <li key={idx} className="text-sm text-[#A8B3AF] flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#E0A995] rounded-full mt-1.5 flex-shrink-0" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilmDetailModal;
