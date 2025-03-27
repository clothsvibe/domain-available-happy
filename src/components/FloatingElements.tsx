
import React from 'react';
import { cn } from "@/lib/utils";

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient */}
      <div className="absolute top-[-50%] right-[-20%] w-[70%] h-[70%] bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-[120px] animate-pulse-subtle" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-300/20 to-primary/20 rounded-full blur-[100px] animate-pulse-subtle" 
           style={{ animationDelay: '2s' }} />
      
      {/* Floating elements */}
      <div className="absolute top-[15%] left-[20%] w-6 h-6 rounded-full bg-primary/30 animate-float"
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-[25%] right-[25%] w-4 h-4 rounded-full bg-blue-400/30 animate-float"
           style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] left-[15%] w-5 h-5 rounded-full bg-blue-300/30 animate-float"
           style={{ animationDelay: '2s' }} />
      
      {/* Decorative lines */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-[15%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </div>
  );
};

export default FloatingElements;
