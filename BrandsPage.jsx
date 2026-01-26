
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard from '@/components/ItemCard';
import InquiryForm from '@/components/InquiryForm';
import GradientBackground from '@/components/GradientBackground';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data } = await supabase.from('brands').select('*');
      if (data) setBrands(data);
      setIsLoading(false);
    };
    fetchBrands();
  }, []);

  const openInquiry = (item) => {
    setSelectedItem(item);
    setShowInquiry(true);
  };

  const myBrands = brands.filter(b => b.category === 'my_brands');
  const otherBrands = brands.filter(b => b.category !== 'my_brands');

  return (
    <>
      <Helmet><title>Brands | Mimo's Collective</title></Helmet>
      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-28 pb-20 px-4">
        <GradientBackground />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-[#E0A995]">Brands</h1>
          
          <Tabs defaultValue="my_brands" className="w-full">
            <TabsList className="bg-[#13251E] border border-[#E0A995]/20 mb-8">
              <TabsTrigger value="my_brands" className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612]">My Brands</TabsTrigger>
              <TabsTrigger value="other_brands" className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612]">Partner Brands</TabsTrigger>
            </TabsList>

            <TabsContent value="my_brands">
              {isLoading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {myBrands.map(brand => <ItemCard key={brand.id} item={brand} onRequestInfo={openInquiry} />)}
                  {myBrands.length === 0 && <div className="p-8 text-[#A8B3AF]">No personal brands listed yet.</div>}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="other_brands">
              {isLoading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {otherBrands.map(brand => <ItemCard key={brand.id} item={brand} onRequestInfo={openInquiry} />)}
                  {otherBrands.length === 0 && <div className="p-8 text-[#A8B3AF]">No partner brands listed yet.</div>}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        {selectedItem && <InquiryForm isOpen={showInquiry} onClose={() => setShowInquiry(false)} item={selectedItem} />}
      </div>
    </>
  );
};

export default BrandsPage;
