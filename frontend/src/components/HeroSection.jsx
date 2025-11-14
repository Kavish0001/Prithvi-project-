import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Phone } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary-light))] to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
    
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Car Broke Down?
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--success))] bg-clip-text text-transparent">
              We'll Get You Moving
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instant step-by-step guides, animated tutorials, and AI voice assistance 
            for every car emergency. Get help in seconds, not hours.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary-light))] flex items-center justify-center">
                <Zap className="h-5 w-5 text-[hsl(var(--primary))]" />
              </div>
              <span className="text-muted-foreground">Instant Solutions</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--success-light))] flex items-center justify-center">
                <Shield className="h-5 w-5 text-[hsl(var(--success))]" />
              </div>
              <span className="text-muted-foreground">Safety First</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--emergency-light))] flex items-center justify-center">
                <Phone className="h-5 w-5 text-[hsl(var(--emergency))]" />
              </div>
              <span className="text-muted-foreground">24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;