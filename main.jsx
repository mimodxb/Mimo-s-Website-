
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import { Toaster } from "@/components/ui/toaster";
import RedirectMiddleware from '@/components/RedirectMiddleware';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <RedirectMiddleware>
            <App />
          </RedirectMiddleware>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </>
);
