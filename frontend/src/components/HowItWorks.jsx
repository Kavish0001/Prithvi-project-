import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Search, FileText, Video, Download } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Select Your Problem',
    description: 'Choose your car details and the issue you\'re facing, or use voice assistant to describe the problem',
    color: 'text-[hsl(var(--primary))]',
    bgColor: 'bg-[hsl(var(--primary-light))]'
  },
  {
    number: 2,
    icon: FileText,
    title: 'Get Instant Guide',
    description: 'Receive a detailed step-by-step guide with safety tips and required tools for your specific problem',
    color: 'text-[hsl(var(--success))]',
    bgColor: 'bg-[hsl(var(--success-light))]'
  },
  {
    number: 3,
    icon: Video,
    title: 'Watch Tutorial',
    description: 'Follow along with animated video demonstrations showing exactly how to fix the issue safely',
    color: 'text-[hsl(var(--primary))]',
    bgColor: 'bg-[hsl(var(--primary-light))]'
  },
  {
    number: 4,
    icon: Download,
    title: 'Download Report',
    description: 'Generate and save a PDF report with all details to share with mechanics or for insurance purposes',
    color: 'text-[hsl(var(--success))]',
    bgColor: 'bg-[hsl(var(--success-light))]'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Get help in 4 simple steps - from problem to solution in minutes
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full border-2 hover:border-[hsl(var(--primary))] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-lg ${step.bgColor} flex items-center justify-center mx-auto mt-4`}>
                    <Icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-[hsl(var(--primary))]" />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[hsl(var(--primary))] rotate-45 translate-x-1" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;