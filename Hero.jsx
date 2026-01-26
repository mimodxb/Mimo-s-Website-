
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import GradientBackground from './GradientBackground';
import LogoComponent from './LogoComponent';
import { getLinkById } from '@/lib/officialLinks';

const Hero = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  const handleActorClick = () => {
    const imdbLink = getLinkById(35); // ID 35 is IMDb Pro
    if (imdbLink) {
      window.open(imdbLink.url, '_blank');
    } else {
      navigate('/media?tab=filmography');
    }
  };

  const handleBrandClick = () => {
    // Navigate to the Legal Complaint Service page
    navigate('/mimo-collective/legal-complaint-service');
  };

  return <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <GradientBackground />
      
      {/* Left Side - Actor Profile */}
      <motion.div initial={{
      opacity: 0,
      x: -50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      duration: 0.8
    }} className="relative flex flex-col items-center justify-center px-8 py-20 lg:py-32 z-10 border-b lg:border-b-0 lg:border-r border-[#E0A995]/10 bg-[#0A1612]/30 backdrop-blur-[2px]">
        <div className="max-w-md text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E0A995]/20 to-transparent blur-2xl" />
            <img className="relative w-full h-full rounded-full object-cover border border-[#E0A995]/40 shadow-2xl shadow-black/40" alt="Smiling man with curly hair and beard against a dark background" src="https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/33e7c639afb549955711f5eb336b04fa.png" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#EBE8E3]">
              Movsum Mirzazada <span className="text-[#E0A995]">'Mimo'</span>
            </h1>
            <p className="text-lg text-[#A8B3AF] font-light tracking-wide">International Award-Winning Actor & Creative Director</p>
          </div>

          <Button onClick={handleActorClick} className="bg-[#E0A995] hover:bg-[#D49A89] text-[#0A1612] font-semibold px-8 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#E0A995]/20">
            View IMDb Profile
          </Button>
        </div>
      </motion.div>

      {/* Right Side - Brand Profile */}
      <motion.div initial={{
      opacity: 0,
      x: 50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      duration: 0.8
    }} className="relative flex flex-col items-center justify-center px-8 py-20 lg:py-32 z-10 bg-[#0A1612]/30 backdrop-blur-[2px]">
        <div className="max-w-md text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E0A995]/20 to-transparent blur-2xl" />
            <div className="relative w-full h-full rounded-full glass-panel flex items-center justify-center border border-[#E0A995]/30 p-10">
              <LogoComponent size="xl" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#EBE8E3]">
              Mimo's <span className="text-[#E0A995]">Collective</span>
            </h2>
            <p className="text-lg text-[#A8B3AF] font-light tracking-wide">
              Creative Entrepreneurship & Exclusive Offers
            </p>
          </div>

          <Button onClick={handleBrandClick} className="bg-transparent border border-[#E0A995] hover:bg-[#E0A995] text-[#E0A995] hover:text-[#0A1612] font-semibold px-8 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#E0A995]/20">
            Explore The Brand
          </Button>
        </div>
      </motion.div>
    </section>;
};
export default Hero;
