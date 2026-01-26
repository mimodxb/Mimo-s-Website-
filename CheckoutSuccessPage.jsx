
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen pt-32 px-4 pb-12 flex flex-col items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Order Successful | Mimo's Collective</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <GradientBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full bg-[#0A1612]/80 backdrop-blur-xl border border-[#E0A995]/20 rounded-2xl p-8 text-center shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-[#EBE8E3] mb-2">Order Confirmed!</h1>
        <p className="text-[#A8B3AF] mb-8">
          Thank you for your purchase. Your order has been received and is being processed. You will receive an email confirmation shortly.
        </p>
        
        <div className="space-y-4">
          <Link to="/mimo-collective/shop">
            <Button className="w-full bg-[#E0A995] hover:bg-[#D49A89] text-[#0A1612] font-semibold py-6">
              <ShoppingBag className="mr-2 h-5 w-5" /> Continue Shopping
            </Button>
          </Link>
          
          <Link to="/client-messaging">
             <Button variant="outline" className="w-full border-[#E0A995]/30 text-[#E0A995] hover:bg-[#E0A995]/10 py-6">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccessPage;
