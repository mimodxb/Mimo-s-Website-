
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Shield, 
  Info, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingExplanation = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('why-priced');

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: 'why-priced',
      title: "Why This Service Is Priced This Way",
      icon: <HelpCircle className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            Unlike automated templates or basic AI generators, this service involves <strong>custom, case-specific work</strong> tailored to your unique situation. We don't just plug your name into a form; we analyze your evidence, structure your narrative, and ensure your complaint aligns with professional standards.
          </p>
          <p>
            The pricing reflects the hours of <strong>focused attention</strong> required to turn a chaotic dispute into a structured, persuasive legal argument.
          </p>
        </div>
      )
    },
    {
      id: 'what-paying-for',
      title: "What You're Paying For",
      icon: <CheckCircle className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            You are investing in a comprehensive service that goes beyond simple drafting. Your fee covers:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#A8B3AF]">
            <li>
              <strong>Initial Case Review:</strong> A thorough examination of your provided facts and evidence.
            </li>
            <li>
              <strong>Strategic Structuring:</strong> Organizing events chronologically to maximize impact.
            </li>
            <li>
              <strong>Evidence Management:</strong> Labeling and referencing exhibits clearly within the text.
            </li>
            <li>
              <strong>Professional Drafting:</strong> Creating <strong>professional, institution-ready documentation</strong> that signals seriousness to the opposing party.
            </li>
            <li>
              <strong>Review & Refinement:</strong> We include revisions to ensure <strong>clarity in how your case is presented</strong>.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'how-compares',
      title: "How This Compares",
      icon: <DollarSign className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            <strong>Vs. Law Firms:</strong> Hiring a lawyer for a formal demand letter or complaint can easily cost $500–$1,500+ per hour. Our service provides a structured, high-quality alternative for a fraction of that cost, perfect for small claims or initial dispute stages.
          </p>
          <p>
            <strong>Vs. DIY:</strong> Writing it yourself is free, but often emotional and disorganized. This service offers <strong>experience navigating complex systems</strong>, saving you time and stress while significantly improving the quality of your submission.
          </p>
        </div>
      )
    },
    {
      id: 'value',
      title: "A Note on Value",
      icon: <Shield className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            A well-structured complaint brings immediate value. It ensures your grievance is taken seriously by corporate legal teams or regulators. By presenting a clear, evidence-backed narrative, you benefit from a <strong>reduced risk of procedural rejection</strong>.
          </p>
          <p>
             The ultimate value is peace of mind—knowing your case has received <strong>thoughtful review</strong> and is presented in the strongest possible light without the exorbitant cost of full legal representation.
          </p>
        </div>
      )
    },
    {
      id: 'transparency',
      title: "Transparency",
      icon: <Info className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            We believe in <strong>clear communication</strong> about costs. The price listed is the price you pay. There are no hidden retainer fees, hourly billing surprises, or administrative add-ons. 
          </p>
          <p>
            If your case requires work beyond the standard scope (e.g., hundreds of pages of evidence), we will discuss any custom requirements upfront before you pay a dime.
          </p>
        </div>
      )
    },
    {
      id: 'unsure',
      title: "If You're Unsure",
      icon: <AlertCircle className="w-5 h-5 text-[#E0A995]" />,
      content: (
        <div className="space-y-4">
          <p>
            Not every dispute needs a paid service. If your issue is simple (e.g., a straightforward refund for a returned item), a free template might suffice. However, if your situation involves multiple events, ignored communications, or complex service failures, professional structuring is highly recommended.
          </p>
          <div className="pt-4">
            <Button 
              onClick={() => navigate('/contact?subject=Case%20Review%20Inquiry')}
              variant="outline"
              className="border-[#E0A995] text-[#E0A995] hover:bg-[#E0A995]/10 w-full sm:w-auto"
            >
              Ask a Question Before Starting <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div id="pricing-explanation" className="w-full max-w-2xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#E0A995] mb-4">
          Understanding Our Pricing
        </h2>
        <p className="text-[#A8B3AF]">
          We believe in complete transparency about where your money goes and the value we deliver.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="bg-[#13251E] rounded-xl border border-[#E0A995]/10 overflow-hidden transition-colors hover:border-[#E0A995]/30"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0A1612] rounded-full border border-[#E0A995]/10">
                  {section.icon}
                </div>
                <span className="font-bold text-[#EBE8E3] text-lg">{section.title}</span>
              </div>
              {openSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-[#E0A995]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#A8B3AF]" />
              )}
            </button>
            
            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-6 pl-[4.25rem] text-[#A8B3AF] leading-relaxed border-t border-[#E0A995]/5 pt-4">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingExplanation;
