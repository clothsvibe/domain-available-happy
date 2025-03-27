
import React from 'react';
import { cn } from "@/lib/utils";

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background overlays to darken the background image slightly */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-[-50%] right-[-20%] w-[70%] h-[70%] bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-full blur-[120px] animate-pulse-subtle"></div>
      <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-amber-300/10 to-primary/10 rounded-full blur-[100px] animate-pulse-subtle" 
           style={{ animationDelay: '2s' }}></div>
      
      {/* Floating elements */}
      <div className="absolute top-[15%] left-[20%] w-6 h-6 rounded-full bg-primary/20 animate-float"
           style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-[25%] right-[25%] w-4 h-4 rounded-full bg-amber-400/20 animate-float"
           style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[20%] left-[15%] w-5 h-5 rounded-full bg-amber-300/20 animate-float"
           style={{ animationDelay: '2s' }}></div>
      
      {/* Decorative lines */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-[15%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
    </div>
  );
};

export default FloatingElements;
