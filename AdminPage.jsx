
import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import BrandsAdmin from '@/components/admin/BrandsAdmin';
import ServicesAdmin from '@/components/admin/ServicesAdmin';
import PartnersAdmin from '@/components/admin/PartnersAdmin';
import OffersAdmin from '@/components/admin/OffersAdmin';
import OrdersAdmin from '@/components/admin/OrdersAdmin';
import InquiriesAdmin from '@/components/admin/InquiriesAdmin';
import FeatureSlotsAdmin from '@/components/admin/FeatureSlotsAdmin';
import LegalComplaintsAdmin from '@/components/admin/LegalComplaintsAdmin';
import MessagingAdmin from '@/components/admin/MessagingAdmin';

const AdminPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('brands');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] font-sans">
      <header className="bg-[#13251E] border-b border-[#E0A995]/20 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-serif font-bold text-[#E0A995]">Mimo's Admin</h1>
          <span className="text-xs bg-[#E0A995]/20 text-[#E0A995] px-2 py-1 rounded-full uppercase tracking-wider">Super Admin</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-[#A8B3AF] hover:text-white gap-2">
            <Home className="w-4 h-4" /> Site
          </Button>
          <Button variant="outline" onClick={handleSignOut} className="border-red-500/30 text-red-500 hover:bg-red-500/10 gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-[#13251E] border border-[#E0A995]/20 p-1 h-auto inline-flex min-w-full md:min-w-0">
              {['Brands', 'Services', 'Partners', 'Offers', 'Orders', 'Inquiries', 'Feature Slots', 'Legal Intakes', 'Messaging'].map((tab) => {
                const value = tab.toLowerCase().replace(' ', '-');
                return (
                  <TabsTrigger 
                    key={value} 
                    value={value}
                    className="data-[state=active]:bg-[#E0A995] data-[state=active]:text-[#0A1612] px-4 py-2 whitespace-nowrap"
                  >
                    {tab}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="bg-[#0F1C15]/50 border border-[#E0A995]/10 rounded-xl p-6 min-h-[500px]">
            <TabsContent value="brands"><BrandsAdmin /></TabsContent>
            <TabsContent value="services"><ServicesAdmin /></TabsContent>
            <TabsContent value="partners"><PartnersAdmin /></TabsContent>
            <TabsContent value="offers"><OffersAdmin /></TabsContent>
            <TabsContent value="orders"><OrdersAdmin /></TabsContent>
            <TabsContent value="inquiries"><InquiriesAdmin /></TabsContent>
            <TabsContent value="feature-slots"><FeatureSlotsAdmin /></TabsContent>
            <TabsContent value="legal-intakes"><LegalComplaintsAdmin /></TabsContent>
            <TabsContent value="messaging"><MessagingAdmin /></TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
