
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import ItemCard from '@/components/ItemCard';
import InquiryForm from '@/components/InquiryForm';
import CheckoutModal from '@/components/CheckoutModal';
import GradientBackground from '@/components/GradientBackground';

const GeneralServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'inquiry' or 'checkout'

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', 'general');
      
      if (data) setServices(data);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  return (
    <>
      <Helmet><title>General Services | Mimo's Collective</title></Helmet>
      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-28 pb-20 px-4">
        <GradientBackground />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-[#E0A995]">General Services</h1>
          
          {isLoading ? (
            <div className="text-center py-20 text-[#A8B3AF]">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.length > 0 ? services.map(service => (
                <ItemCard 
                  key={service.id} 
                  item={service} 
                  onRequestInfo={(item) => openModal(item, 'inquiry')}
                  onBuyNow={(item) => openModal(item, 'checkout')}
                />
              )) : (
                <div className="col-span-full text-center py-12 text-[#A8B3AF] border border-dashed border-[#E0A995]/20 rounded-xl">
                  No general services currently available. Check back soon.
                </div>
              )}
            </div>
          )}
        </div>

        {selectedItem && (
          <>
            <InquiryForm 
              isOpen={modalType === 'inquiry'} 
              onClose={() => setModalType(null)} 
              item={selectedItem} 
            />
            <CheckoutModal 
              isOpen={modalType === 'checkout'} 
              onClose={() => setModalType(null)} 
              item={selectedItem} 
            />
          </>
        )}
      </div>
    </>
  );
};

export default GeneralServicesPage;
