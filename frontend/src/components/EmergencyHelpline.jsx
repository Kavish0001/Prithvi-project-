import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Phone, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export const EmergencyHelpline = () => {
  const [copied, setCopied] = useState(false);
  const helplineNumber = '1033';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(helplineNumber);
    setCopied(true);
    toast.success('Number Copied!', {
      description: `${helplineNumber} copied to clipboard`
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const callHelpline = () => {
    window.location.href = `tel:${helplineNumber}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-2 border-[hsl(var(--emergency))] bg-gradient-to-r from-[hsl(var(--emergency-light))] to-background shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--emergency))] flex items-center justify-center flex-shrink-0">
                <Phone className="h-7 w-7 text-[hsl(var(--emergency-foreground))] animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Emergency Helpline
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-[hsl(var(--emergency))]">
                  {helplineNumber}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  24/7 Roadside Assistance
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                onClick={callHelpline}
                className="flex-1 sm:flex-none bg-[hsl(var(--emergency))] hover:bg-[hsl(var(--emergency))]/90 text-[hsl(var(--emergency-foreground))] shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-2 border-[hsl(var(--emergency))] text-[hsl(var(--emergency))] hover:bg-[hsl(var(--emergency-light))]"
                size="lg"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmergencyHelpline;