import React from 'react';
import { AlertTriangle, Wrench } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--primary))] text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">
                CarRescue
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Emergency Breakdown Guide
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[hsl(var(--emergency))]">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-semibold hidden sm:inline">
              24/7 Emergency Support
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;