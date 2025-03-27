
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DomainCardProps {
  domain: string;
  className?: string;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden glass-panel animate-fade-in-up border-0 shadow-lg shadow-primary/5",
      className
    )}>
      <CardContent className="p-6 flex flex-col items-center">
        <Badge className="mb-3 bg-primary/90 text-black hover:bg-primary/100 transition-colors font-semibold">Premium Domain</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-center tracking-tight mb-2">
          {domain}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-amber-500 rounded-full mt-2 mb-4"></div>
        <div className="text-center text-muted-foreground mt-2 font-sans">
          This premium domain is available for purchase.
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainCard;
