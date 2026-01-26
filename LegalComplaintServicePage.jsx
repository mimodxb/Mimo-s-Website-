
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, FileText, Scale, CheckCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';
import PricingTierSelector from '@/components/PricingTierSelector';
import PricingExplanation from '@/components/PricingExplanation';

const LegalComplaintServicePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Legal Complaint & Case Structuring | Movsum Mirzazada</title>
        <meta name="description" content="Professional documentation and structuring for legal complaints and disputes. Non-lawyer expert support." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-20">
        <GradientBackground />

        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1612] z-0" />
          <div className="max-w-5xl mx-auto text-center z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="bg-[#E0A995]/10 text-[#E0A995] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">
                Professional Case Structuring
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E0A995] via-[#F2D0C2] to-[#D49A89]">
                Turn Disputes into Professional Claims
              </h1>
              <p className="text-xl text-[#A8B3AF] max-w-2xl mx-auto mb-10 leading-relaxed">
                We organize your evidence, structure your arguments, and create professional documentation for consumer disputes, service failures, and formal complaints.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/legal-complaint-intake')} 
                  className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-8 py-6 text-lg rounded-full"
                >
                  Start Your Case
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} 
                  className="border-[#E0A995]/30 text-[#EBE8E3] px-8 py-6 text-lg rounded-full"
                >
                  How It Works
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 px-4 bg-[#0F1C15]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#E0A995] mb-6">What I Do</h2>
              <p className="text-lg text-[#A8B3AF] mb-6">
                Many legitimate complaints fail because they are poorly organized, emotional, or lack clear evidence. I bridge the gap between your grievance and a formal resolution process.
              </p>
              <ul className="space-y-4">
                {[
                  "Structure chaotic events into a clear timeline",
                  "Identify key contract breaches or failures",
                  "Format evidence for professional presentation",
                  "Draft formal letters of demand / complaint"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#EBE8E3]">
                    <CheckCircle className="w-5 h-5 text-[#E0A995]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#13251E] p-6 rounded-2xl border border-[#E0A995]/10 transform translate-y-8">
                <Shield className="w-8 h-8 text-[#E0A995] mb-4" />
                <h3 className="font-bold mb-2">Consumer Rights</h3>
                <p className="text-sm text-[#A8B3AF]">Product defects, refunds, warranty issues.</p>
              </div>
              <div className="bg-[#13251E] p-6 rounded-2xl border border-[#E0A995]/10">
                <FileText className="w-8 h-8 text-[#E0A995] mb-4" />
                <h3 className="font-bold mb-2">Service Disputes</h3>
                <p className="text-sm text-[#A8B3AF]">Contractors, agencies, subscriptions.</p>
              </div>
              <div className="bg-[#13251E] p-6 rounded-2xl border border-[#E0A995]/10 transform translate-y-8">
                <Scale className="w-8 h-8 text-[#E0A995] mb-4" />
                <h3 className="font-bold mb-2">Escalations</h3>
                <p className="text-sm text-[#A8B3AF]">Moving issues to management or regulators.</p>
              </div>
              <div className="bg-[#13251E] p-6 rounded-2xl border border-[#E0A995]/10">
                <AlertTriangle className="w-8 h-8 text-[#E0A995] mb-4" />
                <h3 className="font-bold mb-2">Harassment</h3>
                <p className="text-sm text-[#A8B3AF]">Documenting ongoing unfair treatment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="how-it-works" className="py-24 px-4 bg-[#0A1612] relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-[#EBE8E3] mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Submit Intake", desc: "Fill out the detailed form with your story and evidence." },
                { step: "02", title: "Review & Strategy", desc: "I analyze the case and propose the strongest angle." },
                { step: "03", title: "Documentation", desc: "I draft the formal complaint package and evidence log." },
                { step: "04", title: "Delivery", desc: "You receive a PDF package ready to send/file." }
              ].map((item, i) => (
                <div key={i} className="relative p-6 border-l border-[#E0A995]/30">
                  <span className="text-4xl font-bold text-[#E0A995]/20 absolute top-4 right-4">{item.step}</span>
                  <h3 className="text-xl font-bold text-[#E0A995] mb-2">{item.title}</h3>
                  <p className="text-[#A8B3AF]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 px-4 bg-[#0F1C15]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center text-[#EBE8E3] mb-12">Simple Pricing</h2>
            <PricingTierSelector 
              selectedTier={null} 
              onSelect={() => navigate('/legal-complaint-intake')} 
              showUrgentOption={false}
            />
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => document.getElementById('pricing-explanation').scrollIntoView({ behavior: 'smooth' })}
                className="text-[#E0A995] hover:text-[#D49A89] text-sm underline underline-offset-4"
              >
                Learn more about why we price this way
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Explanation */}
        <section className="bg-[#0A1612]">
          <PricingExplanation />
        </section>

        {/* Disclaimer */}
        <section className="py-12 px-4 bg-[#13251E]/50 border-t border-[#E0A995]/10">
          <div className="max-w-4xl mx-auto flex items-start gap-4 p-6 bg-[#E0A995]/5 rounded-xl border border-[#E0A995]/20">
            <AlertTriangle className="w-6 h-6 text-[#E0A995] shrink-0" />
            <div>
              <h3 className="font-bold text-[#E0A995] mb-2">Important Disclaimer</h3>
              <p className="text-sm text-[#A8B3AF]">
                Movsum Mirzazada is NOT a lawyer, attorney, or law firm. This service provides administrative support, document formatting, and case structuring based on provided facts. It does not constitute legal advice or representation in court. If you require legal advice, please consult a qualified attorney in your jurisdiction.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#EBE8E3] mb-8">Ready to Professionalize Your Complaint?</h2>
          <Button 
            onClick={() => navigate('/legal-complaint-intake')} 
            className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-12 py-8 text-xl rounded-full"
          >
            Start Intake Process <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
          
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/legal-complaint-what-you-receive')}
              className="text-[#A8B3AF] hover:text-[#E0A995]"
            >
              See What You'll Receive <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default LegalComplaintServicePage;
