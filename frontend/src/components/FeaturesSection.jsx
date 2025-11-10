import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mic, FileText, Video, Zap, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Solutions',
    description: 'Get immediate help with step-by-step guides tailored to your specific car problem',
    color: 'text-[hsl(var(--primary))]',
    bgColor: 'bg-[hsl(var(--primary-light))]'
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Simply speak your problem and let AI detect the issue and load the right solution',
    color: 'text-[hsl(var(--success))]',
    bgColor: 'bg-[hsl(var(--success-light))]'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch animated DIY solution videos demonstrating each repair step clearly',
    color: 'text-[hsl(var(--primary))]',
    bgColor: 'bg-[hsl(var(--primary-light))]'
  },
  {
    icon: FileText,
    title: 'PDF Reports',
    description: 'Generate customized emergency reports with car details and solutions for mechanics',
    color: 'text-[hsl(var(--success))]',
    bgColor: 'bg-[hsl(var(--success-light))]'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Comprehensive safety tips and warnings to keep you protected during repairs',
    color: 'text-[hsl(var(--emergency))]',
    bgColor: 'bg-[hsl(var(--emergency-light))]'
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Access help anytime, anywhere - perfect for emergencies at any hour',
    color: 'text-[hsl(var(--primary))]',
    bgColor: 'bg-[hsl(var(--primary-light))]'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Everything You Need in an Emergency
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive tools and guides to handle any car breakdown situation
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-[hsl(var(--primary))] hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;