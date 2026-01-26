import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShoppingCart,
  UserCheck,
  Mail,
  ShoppingBag,
  LogIn,
  Phone
} from 'lucide-react';
import { Button } from './ui/button';
import LogoComponent from '@/components/LogoComponent';
import CurrencySelector from '@/components/CurrencySelector';
import LanguageSelector from '@/components/LanguageSelector';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { messagingService } from '@/lib/messagingService';
import UnreadBadge from './UnreadBadge';
import { useCart } from '@/hooks/useCart';

/**
 * CenterCallButton Component
 * Floating center button for phone call functionality
 */
const CenterCallButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Call"
      title="Call Us"
      className="
        absolute left-1/2 top-[calc(50%+70px)] -translate-x-1/2 -translate-y-1/2
        z-[100]
        h-12 w-12 md:h-14 md:w-14
        rounded-full
        border-2 border-[#E0A995]/40
        bg-[#0A1612]/80 backdrop-blur-md
        shadow-[0_0_0_1px_rgba(224,169,149,0.1)]
        hover:border-[#E0A995]/80
        hover:shadow-[0_0_24px_rgba(224,169,149,0.2)]
        hover:scale-105
        active:scale-95
        transition-all duration-300
        animate-[pulse-glow_3s_ease-in-out_infinite]
        focus:outline-none focus:ring-2 focus:ring-[#E0A995]/40
      "
      style={{
        animation: 'pulse-glow 3s ease-in-out infinite'
      }}
    >
      <Phone className="mx-auto h-6 w-6 text-[#E0A995]" strokeWidth={2.5} />
    </button>
  );
};

/**
 * Header Component
 * Complete navigation structure with primary and secondary nav bars
 */
const Header = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userRole } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Cart badge bounce animation state
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [prevCount, setPrevCount] = useState(totalCartItems);
  const [shouldBounce, setShouldBounce] = useState(false);

  // Scroll listener effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Unread messages effect
  useEffect(() => {
    if (user) {
      messagingService
        .getUnreadCount(user.id, userRole === 'admin' ? 'admin' : 'client')
        .then(setUnreadCount)
        .catch(console.error);
    }
  }, [user, userRole]);

  // Cart badge bounce trigger
  useEffect(() => {
    if (totalCartItems > prevCount) {
      setShouldBounce(true);
      setTimeout(() => setShouldBounce(false), 600);
    }
    setPrevCount(totalCartItems);
  }, [totalCartItems, prevCount]);

  // Handle call button click
  const handleCallClick = () => {
    window.location.href = 'tel:+994501234567'; // Replace with your actual phone number
  };

  // Enhanced boxed navigation button styling
  const navBoxStyle = `
    group
    relative
    h-11
    px-5 py-2.5
    border border-[#E0A995]/30
    bg-[#0A1612]/60 backdrop-blur-sm
    rounded-lg
    text-sm font-medium text-[#A8B3AF]
    
    transform transition-all duration-300 ease-out
    hover:scale-[1.02]
    hover:bg-[#E0A995]/10
    hover:border-[#E0A995]/60
    hover:text-[#E0A995]
    active:scale-[0.98]
    
    shadow-[0_2px_8px_rgba(0,0,0,0.1)]
    hover:shadow-[0_4px_16px_rgba(224,169,149,0.15)]
    
    flex items-center justify-center whitespace-nowrap
    
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-1/2
    after:-translate-x-1/2
    after:h-0.5
    after:bg-[#E0A995]
    after:transition-all
    after:duration-300
    after:w-0
    hover:after:w-3/4
  `;

  const activeNavBoxStyle = `
    bg-[#E0A995]/15
    border-[#E0A995]/70
    text-[#E0A995]
    shadow-[0_0_12px_rgba(224,169,149,0.1)]
    after:w-3/4
  `;

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(224, 169, 149, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(224, 169, 149, 0);
          }
        }
        
        @keyframes bounce-scale {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.1); }
        }
        
        .animate-bounce-scale {
          animation: bounce-scale 0.6s ease-out;
        }
      `}</style>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? 'bg-[#0A1612]/95 backdrop-blur-xl border-b border-[#E0A995]/10 py-1 shadow-lg'
            : 'bg-[#0A1612]/85 backdrop-blur-md py-2'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* PRIMARY NAVIGATION */}
          <div className="flex items-center justify-between relative mb-2">
            {/* CENTER CALL BUTTON */}
            <CenterCallButton onClick={handleCallClick} />

            {/* LEFT SECTION - Logo + Primary Navigation */}
            <div className="flex items-center gap-4 relative z-10">
              <NavLink to="/" className="flex items-center">
                <LogoComponent 
                  size="md" 
                  className={`
                    transition-all duration-500 ease-out
                    ${scrolled ? 'h-9 w-auto' : 'h-10 w-auto'}
                  `}
                />
              </NavLink>

              <div className="hidden xl:flex items-center gap-2">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Biography
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/media/filmography"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Filmography
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/media/gallery"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Media
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/media/presskit"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Press Kit
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Contact
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/mimo-collective/legal-complaint-service"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Featured
                </NavLink>
              </div>
            </div>

            {/* RIGHT SECTION - Primary Navigation */}
            <div className="flex items-center gap-2 relative z-10">
              <div className="hidden xl:flex items-center gap-2">
                <NavLink
                  to="/mimo-collective/shop"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''} gap-2`
                  }
                >
                  <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  Shop
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/mimo-collective/offers"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Exclusive Offers
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/mimo-collective/projects"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Projects
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Brands
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/partnership"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Partnership
                </NavLink>
                <div className="h-8 w-px bg-[#E0A995]/20" />
                
                <NavLink
                  to="/terms-and-conditions"
                  className={({ isActive }) =>
                    `${navBoxStyle} ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Legal
                </NavLink>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                onClick={() => setIsOpen(true)}
                variant="ghost"
                size="icon"
                className="xl:hidden h-11 w-11 hover:text-[#E0A995] transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* SECONDARY NAVIGATION - Utilities */}
          <div className="flex items-center justify-end gap-3 pt-1.5 border-t border-[#E0A995]/10">
            <div className="hidden md:flex items-center gap-2">
              <div className={navBoxStyle}>
                <LanguageSelector />
              </div>
              <div className="h-6 w-px bg-[#E0A995]/20" />
              
              <div className={navBoxStyle}>
                <CurrencySelector />
              </div>
              <div className="h-6 w-px bg-[#E0A995]/20" />
              
              {/* Sign In / Sign Up Button - Only if user NOT logged in */}
              {!user && (
                <Button
                  onClick={() => navigate('/auth')}
                  className={`
                    ${navBoxStyle} 
                    gap-2 
                    bg-[#E0A995]/10 
                    border-[#E0A995]/50 
                    text-[#E0A995] 
                    hover:bg-[#E0A995] 
                    hover:text-[#0A1612] 
                    hover:border-[#E0A995]
                  `}
                >
                  <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  Sign In / Sign Up
                </Button>
              )}
            </div>

            {/* Cart Button */}
            <Button
              onClick={onCartClick}
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 hover:text-[#E0A995] transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span 
                  className={`
                    absolute -top-1 -right-1 
                    bg-[#E0A995] text-[#0A1612] 
                    text-xs w-5 h-5 rounded-full 
                    flex items-center justify-center font-bold shadow-lg
                    ${shouldBounce ? 'animate-bounce-scale' : ''}
                  `}
                >
                  {totalCartItems}
                </span>
              )}
            </Button>

            {/* User-Specific Actions */}
            {user && (
              <>
                <Button
                  onClick={() => navigate('/client-messaging')}
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:text-[#E0A995] transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Mail className="w-5 h-5" />
                  <UnreadBadge count={unreadCount} />
                </Button>
                <Button
                  onClick={() => navigate('/admin')}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:text-[#E0A995] transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <UserCheck className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0A1612]/98 backdrop-blur-xl z-[200] p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <LogoComponent size="md" className="h-10 w-auto" />
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 hover:text-[#E0A995] transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-3">
                {/* Primary Navigation */}
                <div className="text-[#E0A995] text-xs font-semibold mb-2 px-2">PRIMARY NAVIGATION</div>
                
                <NavLink
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Biography
                </NavLink>
                
                <NavLink
                  to="/media/filmography"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Filmography
                </NavLink>
                
                <NavLink
                  to="/media/gallery"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Media
                </NavLink>
                
                <NavLink
                  to="/media/presskit"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Press Kit
                </NavLink>
                
                <NavLink
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Contact
                </NavLink>
                
                <NavLink
                  to="/mimo-collective/legal-complaint-service"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Featured
                </NavLink>

                {/* Divider */}
                <div className="h-px bg-[#E0A995]/20 my-2" />
                
                <div className="text-[#E0A995] text-xs font-semibold mb-2 px-2">SHOP & SERVICES</div>
                
                <NavLink
                  to="/mimo-collective/shop"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base gap-2 ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop
                </NavLink>
                
                <NavLink
                  to="/mimo-collective/offers"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Exclusive Offers
                </NavLink>
                
                <NavLink
                  to="/mimo-collective/projects"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Projects
                </NavLink>
                
                <NavLink
                  to="/brands"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Brands
                </NavLink>
                
                <NavLink
                  to="/partnership"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Partnership
                </NavLink>
                
                <NavLink
                  to="/terms-and-conditions"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${navBoxStyle} text-base ${isActive ? activeNavBoxStyle : ''}`
                  }
                >
                  Legal
                </NavLink>

                {/* Divider */}
                <div className="h-px bg-[#E0A995]/20 my-2" />

                {/* Mobile Sign In Button */}
                {!user && (
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/auth');
                    }}
                    className={`
                      ${navBoxStyle} 
                      text-base gap-2 
                      bg-[#E0A995]/10 
                      border-[#E0A995]/50 
                      text-[#E0A995]
                      hover:bg-[#E0A995] 
                      hover:text-[#0A1612]
                    `}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In / Sign Up
                  </Button>
                )}
              </nav>

              {/* Mobile Selectors */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E0A995]/20">
                <div className={`${navBoxStyle} flex-1`}>
                  <LanguageSelector />
                </div>
                <div className={`${navBoxStyle} flex-1`}>
                  <CurrencySelector />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;