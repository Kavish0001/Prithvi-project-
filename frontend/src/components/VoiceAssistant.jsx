import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const problemKeywords = {
  'flat-tire': ['flat tire', 'tire', 'puncture', 'tyre', 'wheel'],
  'battery-dead': ['battery', 'dead battery', 'won\'t start', 'no power', 'jump start'],
  'engine-overheat': ['overheat', 'overheating', 'hot engine', 'smoke', 'temperature'],
  'brake-failure': ['brake', 'brakes', 'stopping', 'brake failure'],
  'no-start': ['won\'t start', 'not starting', 'no start', 'ignition'],
  'fuel-empty': ['fuel', 'gas', 'empty', 'out of fuel', 'petrol'],
};

export const VoiceAssistant = ({ onProblemDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      
      if (event.results[current].isFinal) {
        detectProblem(transcript.toLowerCase());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        toast.error('No speech detected', {
          description: 'Please try again and speak clearly'
        });
      } else if (event.error === 'not-allowed') {
        toast.error('Microphone access denied', {
          description: 'Please allow microphone access in your browser settings'
        });
      } else {
        toast.error('Voice recognition error', {
          description: 'Please try again'
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const detectProblem = (text) => {
    console.log('Detecting problem from:', text);
    
    // Find matching problem
    for (const [problemId, keywords] of Object.entries(problemKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          // Get saved car details or use defaults
          const savedCompany = localStorage.getItem('lastCarCompany') || 'Generic';
          const savedModel = localStorage.getItem('lastCarModel') || 'Vehicle';
          
          toast.success('Problem Detected!', {
            description: `I heard: "${text}". Loading solution...`
          });
          
          onProblemDetected(problemId, {
            company: savedCompany,
            model: savedModel,
            detectedBy: 'voice'
          });
          
          setTranscript('');
          return;
        }
      }
    }
    
    toast.warning('Problem not recognized', {
      description: 'Try saying: "flat tire", "dead battery", or "engine overheating"'
    });
    setTranscript('');
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    
    setTranscript('');
    setIsListening(true);
    
    try {
      recognitionRef.current.start();
      toast.info('Listening...', {
        description: 'Speak now to describe your problem'
      });
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  if (!isSupported) {
    return (
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MicOff className="h-5 w-5 text-muted-foreground" />
            Voice Assistant Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Voice recognition is not supported in your browser. 
            Please use the form instead or try a modern browser like Chrome or Edge.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 hover:border-[hsl(var(--success))] transition-colors duration-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Volume2 className="h-5 w-5 text-[hsl(var(--success))]" />
            Voice Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Click the microphone and describe your problem
            </p>
            
            {/* Microphone Button */}
            <div className="flex justify-center">
              <motion.div
                animate={isListening ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: isListening ? Infinity : 0,
                }}
              >
                <Button
                  size="lg"
                  onClick={isListening ? stopListening : startListening}
                  className={`
                    w-24 h-24 rounded-full
                    ${isListening 
                      ? 'bg-[hsl(var(--emergency))] hover:bg-[hsl(var(--emergency))] shadow-glow' 
                      : 'bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]'
                    }
                    text-primary-foreground shadow-xl transition-all duration-300
                  `}
                >
                  {isListening ? (
                    <MicOff className="h-10 w-10" />
                  ) : (
                    <Mic className="h-10 w-10" />
                  )}
                </Button>
              </motion.div>
            </div>
            
            {/* Status */}
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--emergency))] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(var(--emergency))]"></span>
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      Listening...
                    </p>
                  </div>
                  
                  {transcript && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You said: <span className="font-medium text-foreground">"{transcript}"</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground"
                >
                  Click to activate voice assistant
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          {/* Example phrases */}
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Try saying:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Flat tire', 'Dead battery', 'Engine overheating'].map((phrase) => (
                <span
                  key={phrase}
                  className="px-3 py-1 rounded-full bg-[hsl(var(--success-light))] text-[hsl(var(--success))] text-xs font-medium"
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VoiceAssistant;