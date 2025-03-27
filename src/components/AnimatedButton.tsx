
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        "before:absolute before:inset-0 before:bg-primary/10 before:translate-x-[-100%] before:hover:translate-x-0 before:transition-transform before:duration-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default AnimatedButton;
