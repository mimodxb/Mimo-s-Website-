
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Users, ShoppingBag, Gift, Globe, ChevronRight, Scale, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';
import ItemCard from '@/components/ItemCard';
import InquiryForm from '@/components/InquiryForm';
import { supabase } from '@/lib/customSupabaseClient';

const MimoCollectivePage = () => {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .limit(4);
        
      if (!error && data) setFeaturedItems(data);
      setIsLoading(false);
    };
    fetchFeatured();
  }, []);

  const handleRequestInfo = (item) => {
    setSelectedItem(item);
    setShowInquiry(true);
  };

  const categories = [
    { title: 'Shop', icon: ShoppingCart, path: '/mimo-collective/shop', desc: 'Merchandise & products' },
    { title: 'General Services', icon: Briefcase, path: '/mimo-collective/general-services', desc: 'Expert consulting & creative services' },
    { title: 'Partner Services', icon: Users, path: '/mimo-collective/partners-services', desc: 'Verified ecosystem partners' },
    { title: 'Brands', icon: ShoppingBag, path: '/mimo-collective/brands', desc: 'Curated fashion & lifestyle brands' },
    { title: 'Collaborations', icon: Globe, path: '/mimo-collective/collaborations', desc: 'Global & Personal Projects' },
    { title: 'Exclusive Offers', icon: Gift, path: '/mimo-collective/offers', desc: 'Discounts, tickets & gifts' },
  ];

  return (
    <>
      <Helmet>
        <title>Mimo's Collective | Movsum Mirzazada</title>
        <meta name="description" content="Discover Mimo's Collective - A curated marketplace of services, brands, and exclusive collaborations." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-20">
        <GradientBackground />

        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center z-10 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E0A995] to-[#D49A89]"
            >
              Mimo's Collective
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-[#A8B3AF] max-w-2xl mx-auto mb-10 font-light"
            >
              A curated ecosystem of creative services, partner brands, and exclusive lifestyle offers.
            </motion.p>
          </div>
        </section>

        {/* Featured Service: Legal Complaint (New) */}
        <section className="px-4 mb-16 relative z-10">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#13251E] to-[#0F1C15] rounded-2xl p-8 md:p-12 border border-[#E0A995]/20 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#E0A995] mb-2 font-bold uppercase tracking-wider text-sm">
                <Scale className="w-5 h-5" /> New Service
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#EBE8E3] mb-4">
                Legal Complaint & Case Structuring
              </h2>
              <p className="text-[#A8B3AF] mb-6 leading-relaxed">
                Turn disputes into professional claims. Expert non-lawyer support to structure your evidence, 
                timeline, and formal complaint documentation for faster resolutions.
              </p>
              <div className="flex gap-4 text-sm text-[#E0A995] font-medium mb-8">
                <span>Starter: $60</span>
                <span>•</span>
                <span>Standard: $150</span>
                <span>•</span>
                <span>Premium: $320</span>
              </div>
              <Button onClick={() => navigate('/mimo-collective/legal-complaint-service')} className="bg-[#E0A995] text-[#0A1612]">
                Explore Service <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Scale className="w-48 h-48 text-[#E0A995]/10" />
            </div>
          </div>
        </section>

        {/* Categories Navigation */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(cat.path)}
                className="bg-[#13251E]/80 backdrop-blur-md border border-[#E0A995]/20 p-6 rounded-2xl cursor-pointer hover:bg-[#E0A995]/10 transition-all duration-300 group hover:-translate-y-2"
              >
                <cat.icon className="w-8 h-8 text-[#E0A995] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-[#EBE8E3] mb-1">{cat.title}</h3>
                <p className="text-sm text-[#A8B3AF]">{cat.desc}</p>
                <div className="mt-4 flex items-center text-[#E0A995] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 px-4 bg-[#0F1C15]/50 border-t border-[#E0A995]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#EBE8E3] mb-10 flex items-center gap-4">
              <span className="w-12 h-px bg-[#E0A995]"></span>
              Featured Highlights
            </h2>
            
            {isLoading ? (
               <div className="text-center text-[#A8B3AF] py-20">Loading collective highlights...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredItems.map((item) => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    onRequestInfo={handleRequestInfo}
                    onBuyNow={null} // Brands usually request info first unless product specific
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {selectedItem && (
          <InquiryForm 
            isOpen={showInquiry} 
            onClose={() => setShowInquiry(false)} 
            item={selectedItem} 
          />
        )}
      </div>
    </>
  );
};

export default MimoCollectivePage;
