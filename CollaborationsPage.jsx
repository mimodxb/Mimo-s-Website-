
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard from '@/components/ItemCard';
import InquiryForm from '@/components/InquiryForm';
import GradientBackground from '@/components/GradientBackground';

const CollaborationsPage = () => {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchCollabs = async () => {
      // Assuming collaborations are stored in services table with specific categories
      const { data } = await supabase
        .from('services')
        .select('*')
        .in('category', ['collaboration_personal', 'collaboration_global']);
      
      if (data) setCollabs(data);
      setLoading(false);
    };
    fetchCollabs();
  }, []);

  const openInquiry = (item) => {
    setSelectedItem(item);
    setShowInquiry(true);
  };

  return (
    <>
      <Helmet><title>Collaborations | Mimo's Collective</title></Helmet>
      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-28 pb-20 px-4">
        <GradientBackground />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-[#E0A995]">Collaborations</h1>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="bg-[#13251E] border border-[#E0A995]/20 mb-8">
              <TabsTrigger value="personal" className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612]">Personal Projects</TabsTrigger>
              <TabsTrigger value="global" className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612]">Global Initiatives</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {collabs.filter(c => c.category === 'collaboration_personal').map(item => (
                     <ItemCard key={item.id} item={item} onRequestInfo={openInquiry} />
                   ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="global">
              {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {collabs.filter(c => c.category === 'collaboration_global').map(item => (
                     <ItemCard key={item.id} item={item} onRequestInfo={openInquiry} />
                   ))}
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

export default CollaborationsPage;
