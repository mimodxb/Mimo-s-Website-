
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, MessageSquare, Shield, CheckCircle, ArrowRight, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

const LegalComplaintServicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#E0A995]/5 z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Scale className="w-16 h-16 text-[#E0A995] mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#E0A995]">
              Professional Legal Complaint Structuring
            </h1>
            <p className="text-xl text-[#A8B3AF] mb-8 leading-relaxed max-w-2xl mx-auto">
              We help you organize your evidence, articulate your legal arguments, and present a professional complaint case—without the high cost of a law firm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/legal-complaint-intake')}
                className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-8 py-6 text-lg font-bold"
              >
                Start Your Case <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/sample-case-structure')}
                className="border-[#E0A995] text-[#E0A995] hover:bg-[#E0A995]/10 px-8 py-6 text-lg"
              >
                <Eye className="mr-2 w-5 h-5" /> View Sample Output
              </Button>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center text-xs text-[#A8B3AF] opacity-80">
               <span className="flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" /> Non-Lawyer Documentation & Process Support</span>
               <span className="hidden md:inline">|</span>
               <span>No legal advice or legal representation provided.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#0F1C15]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: FileText,
              title: "Structured Documentation",
              desc: "We transform your raw notes and evidence into a coherent, professional legal document ready for submission."
            },
            {
              icon: MessageSquare,
              title: "Direct Messaging",
              desc: "Communicate securely with our specialists via our integrated portal to refine your case details."
            },
            {
              icon: Shield,
              title: "Confidential & Secure",
              desc: "Your data is encrypted and protected. We prioritize your privacy throughout the process."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A1612] p-8 rounded-xl border border-[#E0A995]/10 hover:border-[#E0A995]/30 transition-colors"
            >
              <feature.icon className="w-10 h-10 text-[#E0A995] mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[#A8B3AF] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-[#E0A995]">How It Works</h2>
          <div className="space-y-12">
            {[
              "Submit your initial complaint intake form with basic details.",
              "Our team reviews your submission and opens a secure messaging channel.",
              "We collaborate to gather evidence and structure your arguments.",
              "Receive your professionally formatted Legal Complaint Case PDF."
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E0A995] text-[#0A1612] flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <p className="text-lg text-[#EBE8E3]">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Legal Links */}
      <section className="py-12 bg-[#0A1612] border-t border-[#E0A995]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm font-bold text-[#E0A995]">
             <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
             <span>|</span>
             <Link to="/payment-terms" className="hover:underline">Payment Terms</Link>
          </div>
          <p className="text-xs text-[#A8B3AF] max-w-2xl mx-auto">
             Disclaimer: Movsum Mirzazada is not a law firm and does not provide legal advice or representation. All services are strictly for documentation structuring and administrative support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalComplaintServicePage;
