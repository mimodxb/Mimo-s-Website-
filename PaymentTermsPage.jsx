
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const PaymentTermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3]">
      <Helmet>
        <title>Payment Terms | Movsum Mirzazada</title>
        <meta name="description" content="Payment Terms and Refund Policy for Legal Complaint Structuring Services." />
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
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Payment Terms</h1>
              <p className="text-gray-600 font-serif italic">Effective Date: January 1, 2024</p>
            </div>
            <CreditCard className="w-16 h-16 text-[#0A1612] hidden md:block" />
          </div>

          <div className="space-y-12 font-serif leading-relaxed text-lg text-gray-800">

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                 Fees & Pricing
              </h2>
              <p>
                All fees for Legal Complaint Structuring Services are listed clearly on the checkout page. The price covers the drafting, structuring, and one round of minor revisions. Fees are based on the selected Tier (Standard vs. Urgent) and are fixed regardless of the case outcome.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                 Payment Timing
              </h2>
              <p>
                Full payment is required upfront before the commencement of work. The Service Provider will not begin drafting or reviewing evidence until the payment has been successfully processed and confirmed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                 Payment Methods
              </h2>
              <p>
                We accept payments via major credit/debit cards (processed via Stripe), PayPal, and select Cryptocurrencies. All transactions are secured and encrypted.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                 Refund Policy
              </h2>
              <p>
                <strong>No Refunds After Commencement:</strong> Once the Service Provider has started reviewing your intake form or drafting documents, the fee becomes non-refundable to cover the time and expertise utilized.
              </p>
              <p className="mt-4">
                <strong>Partial Refunds:</strong> If you request cancellation <em>before</em> work has commenced (within 2 hours of payment), a refund may be issued minus a 10% administrative processing fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                 Chargebacks & Disputes
              </h2>
              <p>
                The Client agrees to contact the Service Provider first to resolve any billing issues. Initiating a chargeback without prior communication will be considered a breach of these terms and may result in the immediate termination of services and blacklisting from future services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                 Late or Failed Payments
              </h2>
              <p>
                If a payment fails or is reversed, the Service Provider reserves the right to withhold deliverables until the full amount is settled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-[#0A1612] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span>
                 Currency & Taxes
              </h2>
              <p>
                Unless otherwise stated, all fees are in United States Dollars (USD). The Client is responsible for any applicable local taxes, VAT, or currency conversion fees charged by their bank.
              </p>
            </section>

            <section className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-bold mb-4">8. Acceptance of Payment Terms</h2>
              <p>
                By proceeding with checkout, you explicitly agree to these Payment Terms, including the No Refund policy once work commences.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentTermsPage;
