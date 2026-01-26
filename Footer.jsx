import React from 'react';
import { motion } from 'framer-motion';
import LogoComponent from '@/components/LogoComponent';
import { getLinkById } from '@/lib/officialLinks';
import { Link } from 'react-router-dom';

const socialLinks = [
  { name: 'IMDb', url: getLinkById(35)?.url || '#' },
  { name: 'Instagram', url: 'https://www.instagram.com/movsum_mirzazada/' },
  { name: 'Threads', url: 'https://www.threads.net/@movsum_mirzazada' },
  { name: 'X', url: 'https://x.com/mimo_mirzazada' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/movsum-mirzazada/' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-8 bg-[#0A1612] border-t border-[#E0A995]/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12"
        >
           {/* Left Column: Brand & Social */}
           <div className="flex flex-col items-center md:items-start space-y-8">
              <LogoComponent size="md" className="h-16 w-auto opacity-90" />
              <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm" aria-label="Social media links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A8B3AF] hover:text-[#E0A995] transition-colors duration-300 font-medium uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <p className="text-sm text-[#E0A995] font-light italic tracking-wide">
                Two Worlds. One Story.
              </p>
           </div>

           {/* Right Column: Legal */}
           <div className="flex flex-col items-center md:items-end space-y-4 text-center md:text-right">
              <h4 className="text-[#E0A995] font-serif font-bold text-lg mb-2">Legal & Policies</h4>
              <nav className="flex flex-col space-y-2 text-sm text-[#A8B3AF]">
                 <Link to="/mimo-collective/shop" className="hover:text-white transition-colors">Shop</Link>
                 <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                 <Link to="/payment-terms" className="hover:text-white transition-colors">Payment Terms</Link>
                 <Link to="/legal-complaint-what-you-receive" className="hover:text-white transition-colors">What You'll Receive</Link>
                 <Link to="/sample-case-structure" className="hover:text-white transition-colors">Sample Case Output</Link>
              </nav>
           </div>
        </motion.div>

        {/* Bottom Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[#E0A995]/20 to-transparent" />

        <div className="text-center text-sm text-[#A8B3AF]/60 space-y-2">
          <p>
            © 2011-{currentYear} Movsum Mirzazada | Azerbaijan | UAE. All rights reserved. 
          </p>
          <p>
             <a 
              href="mailto:legal@movsummirzazada.com" 
              className="hover:text-[#E0A995] hover:underline transition-colors duration-300"
            >
              legal@movsummirzazada.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;