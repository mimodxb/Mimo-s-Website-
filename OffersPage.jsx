
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';
import { Copy, Gift, Ticket, Tag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OfferCard = ({ offer }) => {
  const { toast } = useToast();
  
  const copyCode = () => {
    navigator.clipboard.writeText(offer.code);
    toast({ title: "Copied!", description: "Coupon code copied to clipboard." });
  };

  return (
    <div className="bg-[#13251E]/80 border border-[#E0A995]/20 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E0A995]/50 transition-colors">
      <div className="w-12 h-12 bg-[#E0A995]/10 rounded-full flex items-center justify-center mb-4 text-[#E0A995]">
        {offer.type === 'discount' && <Tag />}
        {offer.type === 'gift' && <Gift />}
        {offer.type === 'ticket' && <Ticket />}
      </div>
      <h3 className="text-xl font-bold text-[#EBE8E3] mb-2">{offer.title}</h3>
      <p className="text-[#A8B3AF] text-sm mb-4">{offer.description}</p>
      
      {offer.code && (
        <div className="bg-[#0A1612] border border-dashed border-[#E0A995]/30 px-4 py-2 rounded-lg flex items-center gap-3 mb-4">
          <span className="font-mono text-[#E0A995] font-bold text-lg">{offer.code}</span>
          <Button variant="ghost" size="icon" onClick={copyCode} className="h-6 w-6 text-[#A8B3AF] hover:text-white">
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      <div className="text-xs text-[#A8B3AF]">
        {offer.expires_at ? `Expires: ${new Date(offer.expires_at).toLocaleDateString()}` : 'No Expiration'}
      </div>
    </div>
  );
};

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data } = await supabase.from('offers').select('*').eq('is_active', true);
      if (data) setOffers(data);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  const types = ['discount', 'voucher', 'ticket', 'gift', 'free_trial'];

  return (
    <>
      <Helmet><title>Exclusive Offers | Mimo's Collective</title></Helmet>
      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] pt-28 pb-20 px-4">
        <GradientBackground />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8 text-[#E0A995]">Exclusive Offers</h1>
          
          <Tabs defaultValue="discount" className="w-full">
            <TabsList className="bg-[#13251E] border border-[#E0A995]/20 mb-8 flex-wrap h-auto p-1">
              {types.map(t => (
                <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612]">{t.replace('_', ' ')}</TabsTrigger>
              ))}
            </TabsList>

            {types.map(type => (
              <TabsContent key={type} value={type}>
                {loading ? <div>Loading...</div> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.filter(o => o.type === type).map(offer => (
                      <OfferCard key={offer.id} offer={offer} />
                    ))}
                    {offers.filter(o => o.type === type).length === 0 && (
                      <div className="col-span-full py-12 text-center text-[#A8B3AF] border border-dashed border-[#E0A995]/20 rounded-xl">
                        No {type.replace('_', ' ')}s available at the moment.
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default OffersPage;
