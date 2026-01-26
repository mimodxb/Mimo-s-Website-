
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductsList from '@/components/ProductsList';
import GradientBackground from '@/components/GradientBackground';

const ShopPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 relative overflow-hidden">
      <Helmet>
        <title>Shop | Mimo's Collective</title>
        <meta name="description" content="Explore exclusive merchandise and products from Mimo's Collective." />
      </Helmet>
      <GradientBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#EBE8E3] mb-4">
            Mimo's <span className="text-[#E0A995]">Shop</span>
          </h1>
          <p className="text-lg text-[#A8B3AF] max-w-2xl mx-auto">
            Discover exclusive collections, limited edition merchandise, and curated products.
          </p>
        </div>
        
        <ProductsList />
      </div>
    </div>
  );
};

export default ShopPage;
