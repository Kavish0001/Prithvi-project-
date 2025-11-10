import React from 'react';
import { Wrench, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--primary))] text-primary-foreground">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">CarRescue</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted emergency car breakdown guide. Get instant help when you need it most.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  Common Problems
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  Emergency Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  Voice Assistant
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  PDF Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Emergency: 1033</p>
                  <p className="text-xs text-muted-foreground">24/7 Available</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                <a href="mailto:help@carrescue.com" className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
                  help@carrescue.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  Serving nationwide
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} CarRescue. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-[hsl(var(--emergency))] fill-current" /> for safer roads
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;