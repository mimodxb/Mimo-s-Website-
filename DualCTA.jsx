
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Briefcase } from 'lucide-react';
import AudioCallButton from './AudioCallButton';

const DualCTA = () => {
  const handleActingContact = () => {
    window.location.href = 'mailto:contact@movsummirzazada.com?subject=Acting%20Representation%20Inquiry';
  };
  const handleBusinessContact = () => {
    window.location.href = 'mailto:contact@movsummirzazada.com?subject=Business%20Partnership%20Inquiry';
  };
  return <section className="relative py-24 px-8 bg-[#0F1C15]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#EBE8E3] mb-4">Let’s Collaborate</h2>
          <p className="text-lg text-[#A8B3AF]"> Direct your inquiry to the appropriate channel</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Acting Inquiries */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="relative group">
            <div className="relative p-12 glass-card rounded-lg h-full border border-[#EBE8E3]/10 bg-[#13251E]/40">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E0A995]/0 to-[#E0A995]/0 group-hover:from-[#E0A995]/5 group-hover:to-transparent rounded-lg transition-all duration-300" />
              
              <div className="relative space-y-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#13251E] border border-[#E0A995]/30 flex items-center justify-center group-hover:border-[#E0A995] transition-all duration-300">
                  <Mail className="w-8 h-8 text-[#E0A995]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#EBE8E3]">Media & Art  Representation</h3>
                  <p className="text-[#A8B3AF]">For Casting, Collaborations, Shooting, Interview, TV Programs, and Representation related</p>
                </div>

                <Button onClick={handleActingContact} className="w-full bg-[#E0A995] hover:bg-[#D49A89] text-[#0A1612] font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#E0A995]/20">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Your Inquiry
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Business Inquiries */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="relative group">
            <div className="relative p-12 glass-card rounded-lg h-full border border-[#EBE8E3]/10 bg-[#13251E]/40">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E0A995]/0 to-[#E0A995]/0 group-hover:from-[#E0A995]/5 group-hover:to-transparent rounded-lg transition-all duration-300" />
              
              <div className="relative space-y-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#13251E] border border-[#E0A995]/30 flex items-center justify-center group-hover:border-[#E0A995] transition-all duration-300">
                  <Briefcase className="w-8 h-8 text-[#E0A995]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#EBE8E3]">
                    Business & Brand
                  </h3>
                  <p className="text-[#A8B3AF]">For Strategic collaborations, Creative direction, AI & Digital media projects and Brand partnerships related</p>
                </div>

                <Button onClick={handleBusinessContact} className="w-full bg-transparent border border-[#E0A995] hover:bg-[#E0A995] text-[#E0A995] hover:text-[#0A1612] font-semibold py-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#E0A995]/20">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Business Inquiries
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Audio Call Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-4 pt-8 border-t border-[#E0A995]/10"
        >
          <p className="text-[#A8B3AF] text-sm tracking-wide">Prefer a more direct conversation?</p>
          <AudioCallButton variant="outline" className="px-8 py-6 text-lg border-[#E0A995]/40 hover:bg-[#E0A995]/10" />
        </motion.div>
      </div>
    </section>;
};
export default DualCTA;
