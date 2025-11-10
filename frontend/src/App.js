import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BreakdownForm from './components/BreakdownForm';
import GuideDisplay from './components/GuideDisplay';
import VoiceAssistant from './components/VoiceAssistant';
import EmergencyHelpline from './components/EmergencyHelpline';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [carDetails, setCarDetails] = useState(null);

  const handleProblemSelect = (problem, details) => {
    setSelectedProblem(problem);
    setCarDetails(details);
    
    // Scroll to guide section
    setTimeout(() => {
      const guideSection = document.getElementById('guide-section');
      if (guideSection) {
        guideSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleVoiceProblem = (problem, details) => {
    setSelectedProblem(problem);
    setCarDetails(details);
    
    setTimeout(() => {
      const guideSection = document.getElementById('guide-section');
      if (guideSection) {
        guideSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--primary-light))] via-background to-background">
      <Toaster position="top-center" richColors />
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Emergency Helpline - Always visible */}
          <EmergencyHelpline />
          
          {/* Main Form Section */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                How Can We Help You?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your vehicle and problem, or use voice assistant for quick help
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <BreakdownForm onProblemSelect={handleProblemSelect} />
              <VoiceAssistant onProblemDetected={handleVoiceProblem} />
            </div>
          </section>
          
          {/* Guide Display Section */}
          {selectedProblem && (
            <section id="guide-section" className="scroll-mt-20">
              <GuideDisplay 
                problem={selectedProblem} 
                carDetails={carDetails}
                onClose={() => {
                  setSelectedProblem(null);
                  setCarDetails(null);
                }}
              />
            </section>
          )}
          
          {/* Features Section */}
          {!selectedProblem && <FeaturesSection />}
          
          {/* How It Works Section */}
          {!selectedProblem && <HowItWorks />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}