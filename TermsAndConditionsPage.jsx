
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const TermsAndConditionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3]">
      <Helmet>
        <title>Terms & Conditions | Movsum Mirzazada</title>
        <meta name="description" content="Terms and Conditions for Legal Complaint Structuring Services." />
      </Helmet>

      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 text-[#A8B3AF] hover:text-[#E0A995]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-black p-8 md:p-16 rounded-xl shadow-2xl print:shadow-none print:p-0"
        >
          <div className="border-b-2 border-black pb-8 mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Terms & Conditions</h1>
              <p className="text-gray-600 font-serif italic">Effective Date: January 1, 2024</p>
            </div>
            <Shield className="w-16 h-16 text-[#0A1612] hidden md:block" />
          </div>

          <div className="space-y-12 font-serif leading-relaxed text-lg text-gray-800">
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                Scope of Services
              </h2>
              <p>
                Movsum Mirzazada ("Service Provider") agrees to provide professional document structuring, organization, and drafting assistance ("Services") to the Client. The Services explicitly include the formatting of client-provided facts into a professional complaint structure, organization of evidence, and general escalation guidance. The Service Provider will deliver the work product in PDF format as specified in the selected package.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
              <h2 className="text-2xl font-bold mb-4 text-red-700 flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                2. Non-Lawyer Disclaimer
              </h2>
              <p className="font-bold">
                THE SERVICE PROVIDER IS NOT A LAW FIRM, IS NOT A LICENSED ATTORNEY, AND DOES NOT PROVIDE LEGAL ADVICE OR LEGAL REPRESENTATION.
              </p>
              <p className="mt-4">
                The Services provided constitute administrative and documentation support only. No attorney-client relationship is created. The Client is solely responsible for the legal merit of their claims and is strongly advised to consult with a licensed attorney for legal advice or court representation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                No Guarantee of Outcome
              </h2>
              <p>
                The Service Provider makes no warranties or guarantees regarding the outcome of any dispute, negotiation, or legal proceeding. The effectiveness of the deliverables depends on numerous factors outside the Service Provider's control, including the responsiveness of the opposing party and the applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                 Client Responsibilities
              </h2>
              <p>
                The Client agrees to provide accurate, truthful, and complete information. The Service Provider relies entirely on the facts provided by the Client and does not independently verify the authenticity of evidence. The Client assumes full liability for any false or misleading information included in the deliverables at their direction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                 Revisions
              </h2>
              <p>
                The Client is entitled to one (1) round of minor revisions (e.g., factual corrections, typo fixes) within 7 days of delivery. Substantial changes to the scope or new evidence introduction after the initial draft may incur additional fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                 Confidentiality
              </h2>
              <p>
                The Service Provider agrees to keep all Client information, evidence, and communications strictly confidential. No information will be shared with third parties unless required by law or explicitly authorized by the Client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span>
                 Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, the Service Provider's liability for any claim arising out of the Services shall be limited to the amount of fees actually paid by the Client. In no event shall the Service Provider be liable for any indirect, special, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">8</span>
                 Termination of Service
              </h2>
              <p>
                The Service Provider reserves the right to refuse service or terminate the agreement if the Client requests unethical actions, provides fraudulent information, or engages in abusive behavior. In such cases, a prorated refund may be issued at the Service Provider's discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">9</span>
                 Governing Principles
              </h2>
              <p>
                These terms shall be governed by general principles of contract law. Any disputes arising from these terms shall be resolved through amicable negotiation.
              </p>
            </section>

            <section className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-bold mb-4">10. Acceptance of Terms</h2>
              <p>
                By checking the "I agree" box during the intake process and proceeding with payment, the Client acknowledges that they have read, understood, and agreed to be bound by these Terms & Conditions.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
