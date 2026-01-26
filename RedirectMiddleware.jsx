
import React, { useLayoutEffect, useState } from 'react';

/**
 * RedirectMiddleware Component
 * 
 * This component acts as a client-side wrapper to enforce the 'www' subdomain.
 * It detects if the application is accessed via 'movsummirzazada.com' (non-www)
 * and automatically redirects the user to 'www.movsummirzazada.com'.
 * 
 * --- PRODUCTION CONFIGURATION NOTICE ---
 * 
 * IMPORTANT: This client-side redirect serves as a fallback for development and testing.
 * 
 * For a Production Environment:
 * The hosting provider (Vercel, Netlify, Hostinger, AWS, etc.) should be configured
 * to issue a true HTTP 301 Permanent Redirect status code.
 * 
 * - Vercel: Configure redirect rules in vercel.json or Dashboard.
 * - Netlify: Configure redirect rules in netlify.toml or Dashboard.
 * - Standard Web Servers: Use .htaccess (Apache) or server blocks (Nginx) for 301 redirects.
 * 
 * Client-side redirects (like the one below) do not send 301 status codes to search engines,
 * which is why server-side configuration is the definitive solution for SEO.
 */
const RedirectMiddleware = ({ children }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useLayoutEffect(() => {
    // Ensure this runs only in the browser environment
    if (typeof window === 'undefined') return;

    const targetHost = 'movsummirzazada.com';
    const currentHost = window.location.hostname;

    // Check if the current hostname matches exactly the non-www domain
    if (currentHost === targetHost) {
      // Prevent content from rendering while we redirect
      setIsRedirecting(true);

      const destination = `https://www.${targetHost}${window.location.pathname}${window.location.search}${window.location.hash}`;
      
      // Perform the redirect using replace() to avoid keeping the non-www URL in history
      window.location.replace(destination);
    }
  }, []);

  // If a redirect is in progress, we render nothing to prevent a flash of content
  if (isRedirecting) {
    return null; 
  }

  // Otherwise, render the application normally
  return <>{children}</>;
};

export default RedirectMiddleware;
