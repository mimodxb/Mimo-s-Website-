
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Shield, CheckCircle, HelpCircle, ArrowRight, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';
import Footer from '@/components/Footer';

const WhatYouWillReceivePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-20">
      <GradientBackground />
      
      {/* Hero */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#E0A995] mb-6">
            What You'll Receive
          </h1>
          <p className="text-xl text-[#A8B3AF] leading-relaxed">
            We don't just give you advice—we build a tangible, professional asset. 
            Here is exactly what you get when you purchase a Legal Complaint Case Package.
          </p>
        </motion.div>
      </section>

      {/* The 3 Core Deliverables */}
      <section className="py-16 px-6 bg-[#0F1C15]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Your Final Deliverables Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="bg-[#13251E] p-8 rounded-xl border border-[#E0A995]/20 shadow-lg hover:shadow-[#E0A995]/10 transition-shadow">
              <div className="w-12 h-12 bg-[#E0A995]/10 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-[#E0A995]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#EBE8E3]">1. The Structured Complaint PDF</h3>
              <p className="text-[#A8B3AF] text-sm leading-relaxed mb-4">
                A formally formatted, multi-page document that narrates your case chronologically, cites the relevant failures (contractual or service), and states your demands clearly.
              </p>
              <ul className="text-sm text-[#A8B3AF] space-y-2">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Professional Typography</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Executive Summary</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Clear "Relief Sought" Section</li>
              </ul>
            </div>

            {/* Item 2 */}
            <div className="bg-[#13251E] p-8 rounded-xl border border-[#E0A995]/20 shadow-lg hover:shadow-[#E0A995]/10 transition-shadow">
               <div className="w-12 h-12 bg-[#E0A995]/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#E0A995]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#EBE8E3]">2. Evidence Index & Guidance</h3>
              <p className="text-[#A8B3AF] text-sm leading-relaxed mb-4">
                We don't just attach files; we label them. Your package includes an index that references your exhibits (e.g., "Exhibit A: Contract") directly within the complaint text.
              </p>
              <ul className="text-sm text-[#A8B3AF] space-y-2">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Labeled Exhibits</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Gap Analysis (Missing Proof)</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Organization Strategy</li>
              </ul>
            </div>

            {/* Item 3 */}
            <div className="bg-[#13251E] p-8 rounded-xl border border-[#E0A995]/20 shadow-lg hover:shadow-[#E0A995]/10 transition-shadow">
               <div className="w-12 h-12 bg-[#E0A995]/10 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="w-6 h-6 text-[#E0A995]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#EBE8E3]">3. Next Steps & Escalation Guide</h3>
              <p className="text-[#A8B3AF] text-sm leading-relaxed mb-4">
                We tell you what to do with the document. Who should you email? Which regulator should be copied? We provide a roadmap for delivery.
              </p>
               <ul className="text-sm text-[#A8B3AF] space-y-2">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Submission Instructions</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Regulator Contacts (if applicable)</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#E0A995]" /> Email Templates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations & Disclaimer */}
      <section className="py-16 px-6">
         <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#E0A995]/5 border-l-4 border-[#E0A995] p-6 rounded-r-xl">
               <h3 className="text-xl font-bold text-[#E0A995] mb-2">What This Service Does NOT Include</h3>
               <ul className="list-disc list-inside text-[#A8B3AF] space-y-2">
                  <li>We do <strong>not</strong> file lawsuits or go to court for you.</li>
                  <li>We do <strong>not</strong> provide legal advice or guarantee a specific financial outcome.</li>
                  <li>We are <strong>not</strong> a law firm. We are professional documentation specialists.</li>
               </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                     <Lock className="w-5 h-5 text-[#E0A995]" /> Confidentiality
                  </h3>
                  <p className="text-[#A8B3AF] text-sm">
                     Your data is encrypted and handled with strict confidentiality. We do not share your case details with any third parties or the counterparty unless explicitly directed by you.
                  </p>
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                     <Shield className="w-5 h-5 text-[#E0A995]" /> Why This Matters
                  </h3>
                  <p className="text-[#A8B3AF] text-sm">
                     A structured complaint is taken 10x more seriously than an angry email. Corporate legal teams respect clear, emotionless, evidence-backed documentation.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#0F1C15]">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#EBE8E3] mb-6">Ready to Professionalize Your Case?</h2>
            <p className="text-[#A8B3AF] mb-8">
               Start by filling out our secure intake form. It takes about 10-15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button 
                  size="lg"
                  onClick={() => navigate('/legal-complaint-intake')}
                  className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] font-bold"
               >
                  Start Intake Now
               </Button>
               <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-[#E0A995]/30 text-[#E0A995]"
               >
                  <HelpCircle className="w-4 h-4 mr-2" /> Questions Before Starting?
               </Button>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatYouWillReceivePage;
