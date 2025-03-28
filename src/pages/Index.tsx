
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DomainCard from '@/components/DomainCard';
import ContactForm from '@/components/ContactForm';
import FloatingElements from '@/components/FloatingElements';
import { useIsMobile } from '@/hooks/use-mobile';
import { Mail, MessageSquare } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const domain = "mamadrop.ma";
  const email = "sale@mamadrop.ma";
  const whatsappNumber = "+447308658080";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  useEffect(() => {
    // Add a small delay for the initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <FloatingElements />
      
      <div className="container px-4 sm:px-6 py-12 md:py-24 mx-auto relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block mb-3 px-3 py-1 bg-primary/90 text-black rounded-full text-sm animate-fade-in font-sans font-medium">
            Domain for Sale
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 animate-fade-in-up">
            Premium Domain<br className="md:hidden" /> 
            <span className="text-gradient">Available</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in-up font-sans" style={{ animationDelay: '0.1s' }}>
            Secure this exceptional domain name for your business or project.
          </p>
        </div>
        
        {/* Domain Card */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <DomainCard domain={domain} />
        </div>
        
        {/* Contact Information */}
        <Card className="w-full max-w-3xl mx-auto glass-panel border-0 shadow-lg shadow-primary/5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                Interested in this domain?
              </h2>
              <p className="text-muted-foreground font-sans">
                Please use the form below or contact us directly:
              </p>
              <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4">
                <a 
                  href={`mailto:${email}`} 
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group font-sans"
                >
                  <Mail className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                  {email}
                </a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors group font-sans"
                >
                  <MessageSquare className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                  {whatsappNumber}
                </a>
              </div>
            </div>
            
            <Separator className="my-6 bg-primary/20" />
            
            <ContactForm />
          </CardContent>
        </Card>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground font-sans">
          <p>&copy; {new Date().getFullYear()} • All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
