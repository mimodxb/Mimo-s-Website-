import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import MediaPage from '@/pages/MediaPage';
import ChatPage from '@/pages/ChatPage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutSuccessPage from '@/pages/CheckoutSuccessPage';
import MimoCollectivePage from '@/pages/MimoCollectivePage';
import GeneralServicesPage from '@/pages/GeneralServicesPage';
import PartnersServicesPage from '@/pages/PartnersServicesPage';
import BrandsPage from '@/pages/BrandsPage';
import CollaborationsPage from '@/pages/CollaborationsPage';
import OffersPage from '@/pages/OffersPage';
import AdminPage from '@/pages/AdminPage';
import LegalComplaintServicePage from '@/pages/LegalComplaintServicePage';
import LegalComplaintClientDashboard from '@/components/LegalComplaintClientDashboard';
import LegalComplaintIntakeForm from '@/components/LegalComplaintIntakeForm';
import ClientMessagingPage from '@/components/ClientMessagingPage';
import LegalComplaintCaseDeliverable from '@/components/LegalComplaintCaseDeliverable';
import SampleCaseStructure from '@/components/SampleCaseStructure';
import WhatYouWillReceivePage from '@/pages/WhatYouWillReceivePage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import PaymentTermsPage from '@/pages/PaymentTermsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import FloatingParticles from '@/components/FloatingParticles';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { CartProvider } from '@/hooks/useCart';

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] overflow-x-hidden selection:bg-[#E0A995] selection:text-[#0A1612]">
          <FloatingParticles />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="chat" element={<ChatPage />} />
              
              {/* Added explicit /shop route per user request for "E-Commerce of Services" button */}
              <Route path="shop" element={<ShopPage />} />
              
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="checkout-success" element={<CheckoutSuccessPage />} />
              
              <Route path="mimo-collective">
                <Route index element={<MimoCollectivePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="general-services" element={<GeneralServicesPage />} />
                <Route path="partners-services" element={<PartnersServicesPage />} />
                <Route path="brands" element={<BrandsPage />} />
                <Route path="collaborations" element={<CollaborationsPage />} />
                <Route path="offers" element={<OffersPage />} />
                <Route path="legal-complaint-service" element={<LegalComplaintServicePage />} />
              </Route>
              
              <Route path="legal-complaint-intake" element={<ProtectedRoute><LegalComplaintIntakeForm /></ProtectedRoute>} />
              <Route path="legal-complaint-dashboard" element={<ProtectedRoute><LegalComplaintClientDashboard /></ProtectedRoute>} />
              <Route path="legal-complaint-what-you-receive" element={<WhatYouWillReceivePage />} />
              
              <Route path="client-messaging" element={<ProtectedRoute><ClientMessagingPage /></ProtectedRoute>} />
              <Route path="client-messaging/:conversationId" element={<ProtectedRoute><ClientMessagingPage /></ProtectedRoute>} />
              
              <Route path="case-deliverable/:intakeId" element={<ProtectedRoute><LegalComplaintCaseDeliverable /></ProtectedRoute>} />
              <Route path="sample-case-structure" element={<SampleCaseStructure />} />
              
              <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="payment-terms" element={<PaymentTermsPage />} />
            </Route>
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
            
             <Route path="/admin/case-deliverables" element={
              <ProtectedRoute>
                 <AdminPage /> 
              </ProtectedRoute>
             } />
          </Routes>
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;