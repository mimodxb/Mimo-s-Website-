import React from 'react';
import { cn } from '@/lib/utils';
const LogoComponent = ({
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-24 w-24',
    xl: 'h-48 w-48'
  };
  return <div className={cn("relative flex items-center justify-center rounded-full border border-[#D4A574] shadow-[0_0_12px_rgba(212,165,116,0.4)] bg-[#0A1612]/20 backdrop-blur-sm aspect-square transition-all duration-300 hover:shadow-[0_0_16px_rgba(212,165,116,0.6)] hover:border-[#E0A995]", sizeClasses[size] || sizeClasses.md, className)} {...props}>
      <img src="https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/mimos-collective-logo-main-transparent-with-word-3oIgo.png" alt="Mimo's Collective Logo" className="h-[65%] w-[65%] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
    </div>;
};
export default LogoComponent;