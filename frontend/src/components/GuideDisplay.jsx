import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, X, FileText, Play, Pause } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

const guideData = {
  'flat-tire': {
    title: 'Flat Tire Repair',
    severity: 'medium',
    estimatedTime: '20-30 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/embed/4X8s2R8iWPE',
    safetyTips: [
      'Park on a flat, stable surface away from traffic',
      'Turn on hazard lights immediately',
      'Apply parking brake before starting',
      'Use wheel wedges to prevent rolling',
      'Never go under a car supported only by a jack'
    ],
    tools: [
      'Spare tire (properly inflated)',
      'Car jack',
      'Lug wrench',
      'Wheel wedges',
      'Flashlight (if at night)',
      'Gloves (optional)'
    ],
    steps: [
      {
        number: 1,
        title: 'Safety First',
        description: 'Pull over to a safe location, turn on hazard lights, and apply parking brake. Place wheel wedges behind the tires.',
        warning: 'Never change a tire on a slope or in active traffic'
      },
      {
        number: 2,
        title: 'Loosen Lug Nuts',
        description: 'Before jacking up the car, use the lug wrench to loosen the lug nuts (turn counter-clockwise). Don\'t remove them completely yet.',
        tip: 'You may need to use your foot for extra leverage'
      },
      {
        number: 3,
        title: 'Position the Jack',
        description: 'Place the jack under the vehicle\'s frame near the tire you\'re changing. Consult your owner\'s manual for the correct jacking point.',
        warning: 'Using the wrong jack point can damage your vehicle'
      },
      {
        number: 4,
        title: 'Raise the Vehicle',
        description: 'Raise the car until the flat tire is about 6 inches off the ground. Ensure the car is stable before proceeding.',
        tip: 'The tire should spin freely without touching the ground'
      },
      {
        number: 5,
        title: 'Remove Flat Tire',
        description: 'Fully unscrew the lug nuts and pull the tire straight toward you to remove it. Place it flat so it doesn\'t roll away.',
        tip: 'Keep the lug nuts in a safe place like a hubcap'
      },
      {
        number: 6,
        title: 'Mount Spare Tire',
        description: 'Align the spare tire with the wheel bolts and push it onto the hub. Hand-tighten the lug nuts.',
        warning: 'Ensure the spare is facing the right direction'
      },
      {
        number: 7,
        title: 'Lower the Vehicle',
        description: 'Lower the car slowly until the tire touches the ground but isn\'t bearing the full weight yet.',
        tip: 'The tire should just make contact with the ground'
      },
      {
        number: 8,
        title: 'Tighten Lug Nuts',
        description: 'Using the lug wrench, tighten the lug nuts in a star pattern. Lower the car completely and give them a final tighten.',
        warning: 'Tighten in a star pattern to ensure even pressure'
      },
      {
        number: 9,
        title: 'Final Check',
        description: 'Check the tire pressure of your spare. Drive carefully and get your flat tire repaired or replaced soon.',
        tip: 'Most spare tires have speed and distance limits'
      }
    ]
  },
  'battery-dead': {
    title: 'Dead Battery Jump Start',
    severity: 'low',
    estimatedTime: '10-15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/embed/iI1o2hNy2hE',
    safetyTips: [
      'Ensure both vehicles are turned off',
      'Check for battery damage or leaks',
      'Remove metal jewelry before starting',
      'Keep jumper cables away from moving parts',
      'Never connect positive to negative terminals'
    ],
    tools: [
      'Jumper cables or portable jump starter',
      'Another vehicle with working battery (for jumper cables)',
      'Safety glasses (recommended)',
      'Gloves (recommended)'
    ],
    steps: [
      {
        number: 1,
        title: 'Position Vehicles',
        description: 'Park the working vehicle close to yours, but ensure they don\'t touch. Both engines should be off.',
        warning: 'Vehicles must NOT touch each other'
      },
      {
        number: 2,
        title: 'Identify Terminals',
        description: 'Locate the positive (+) and negative (-) terminals on both batteries. They\'re usually marked with red for positive and black for negative.',
        tip: 'Clean any corrosion from terminals first'
      },
      {
        number: 3,
        title: 'Connect Red Cable',
        description: 'Attach one red clamp to the positive (+) terminal of the dead battery, then attach the other red clamp to the positive terminal of the working battery.',
        warning: 'Always connect positive first'
      },
      {
        number: 4,
        title: 'Connect Black Cable',
        description: 'Attach one black clamp to the negative (-) terminal of the working battery. Attach the other black clamp to an unpainted metal surface on your car\'s engine block.',
        warning: 'Do NOT connect to the dead battery\'s negative terminal'
      },
      {
        number: 5,
        title: 'Start Working Vehicle',
        description: 'Start the vehicle with the good battery and let it run for 2-3 minutes.',
        tip: 'This allows the dead battery to charge slightly'
      },
      {
        number: 6,
        title: 'Start Your Vehicle',
        description: 'Try starting your car. If it doesn\'t start after a few tries, wait a few more minutes and try again.',
        warning: 'Don\'t crank for more than 10 seconds at a time'
      },
      {
        number: 7,
        title: 'Disconnect Cables',
        description: 'Once started, carefully disconnect in reverse order: black from your car, black from working car, red from working car, red from your car.',
        tip: 'Keep your car running while disconnecting'
      },
      {
        number: 8,
        title: 'Let Engine Run',
        description: 'Let your vehicle run for at least 15-20 minutes to recharge the battery, or better yet, take it for a drive.',
        tip: 'Consider having your battery tested at an auto shop'
      }
    ]
  },
  'engine-overheat': {
    title: 'Engine Overheating',
    severity: 'high',
    estimatedTime: '30-60 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/embed/t_PQ8rQj4J8',
    safetyTips: [
      'Pull over immediately when you notice overheating',
      'Never open the radiator cap when hot',
      'Wait at least 30 minutes for engine to cool',
      'Use a cloth when opening coolant reservoir',
      'Stay clear of steam and hot fluids'
    ],
    tools: [
      'Coolant/water',
      'Towel or rag',
      'Flashlight',
      'Funnel (if available)'
    ],
    steps: [
      {
        number: 1,
        title: 'Stop Safely',
        description: 'Pull over to a safe location immediately. Turn off the AC and turn on the heater to maximum to help cool the engine.',
        warning: 'Continuing to drive can cause severe engine damage'
      },
      {
        number: 2,
        title: 'Turn Off Engine',
        description: 'Once parked safely, turn off the engine. Open the hood to allow heat to escape, but don\'t touch anything yet.',
        warning: 'Wait at least 30 minutes before touching engine components'
      },
      {
        number: 3,
        title: 'Check for Leaks',
        description: 'Once cool, look for visible leaks under the car or around hoses. Check coolant level in the overflow tank.',
        tip: 'Take photos of any leaks to show a mechanic'
      },
      {
        number: 4,
        title: 'Check Coolant Level',
        description: 'If the coolant reservoir is accessible and cool to touch, check the level. It should be between MIN and MAX marks.',
        warning: 'Never open when hot - serious burn risk'
      },
      {
        number: 5,
        title: 'Add Coolant if Needed',
        description: 'If level is low and engine is cool, carefully add coolant or water to the overflow tank only.',
        tip: 'In emergency, water can be used temporarily'
      },
      {
        number: 6,
        title: 'Restart Carefully',
        description: 'If you added coolant and see no leaks, start the car and monitor the temperature gauge closely.',
        warning: 'If temp rises quickly again, do not drive - call for tow'
      },
      {
        number: 7,
        title: 'Drive to Service',
        description: 'If temperature stays normal, drive slowly to nearest service station. Keep eye on temp gauge.',
        tip: 'Avoid heavy acceleration and use lower gears'
      },
      {
        number: 8,
        title: 'Get Professional Help',
        description: 'Have your cooling system inspected by a professional. Overheating can indicate serious issues.',
        warning: 'Repeated overheating can cause permanent engine damage'
      }
    ]
  },
  'brake-failure': {
    title: 'Brake Issues',
    severity: 'critical',
    estimatedTime: 'Immediate',
    difficulty: 'Emergency Response',
    videoUrl: 'https://www.youtube.com/embed/dWSoN9e0H_g',
    safetyTips: [
      'Stay calm and don\'t panic',
      'Don\'t turn off the engine',
      'Warn other drivers with hazard lights',
      'Look for escape routes',
      'This is an EMERGENCY - do not attempt DIY repair'
    ],
    tools: [
      'Emergency brake/parking brake',
      'Your alertness and focus'
    ],
    steps: [
      {
        number: 1,
        title: 'Don\'t Panic',
        description: 'Stay calm and grip the steering wheel firmly with both hands. Keep your eyes on the road.',
        warning: 'Panicking increases accident risk'
      },
      {
        number: 2,
        title: 'Pump the Brakes',
        description: 'Quickly pump the brake pedal multiple times. This can build up brake pressure and may restore some braking power.',
        tip: 'Pump rapidly - don\'t hold down continuously'
      },
      {
        number: 3,
        title: 'Downshift',
        description: 'Shift to a lower gear to use engine braking. This works for both manual and automatic transmissions.',
        warning: 'Shift gradually - don\'t go straight to first gear'
      },
      {
        number: 4,
        title: 'Use Emergency Brake',
        description: 'Gradually apply the emergency/parking brake. Pull slowly and be ready to release if car starts to skid.',
        warning: 'Apply gradually - sudden application can cause spin'
      },
      {
        number: 5,
        title: 'Look for Escape Routes',
        description: 'Scan for safe places to slow down: uphill roads, open fields, or areas with less traffic.',
        tip: 'Avoid steering into traffic or barriers if possible'
      },
      {
        number: 6,
        title: 'Scrub Off Speed',
        description: 'If safe, gently scrape against a guardrail or curb to create friction and slow down. This should be last resort.',
        warning: 'Only use this technique if absolutely necessary'
      },
      {
        number: 7,
        title: 'Warn Others',
        description: 'Turn on hazard lights and honk horn to alert other drivers of your emergency.',
        tip: 'Flash headlights and use hand signals if possible'
      },
      {
        number: 8,
        title: 'Call Emergency Services',
        description: 'Once stopped safely, call 911 and your roadside assistance. DO NOT attempt to drive the vehicle.',
        warning: 'Vehicle must be towed - this is not a DIY repair'
      }
    ]
  },
  'no-start': {
    title: 'Car Won\'t Start',
    severity: 'medium',
    estimatedTime: '15-30 minutes',
    difficulty: 'Beginner to Intermediate',
    videoUrl: 'https://www.youtube.com/embed/RRbWKWM4bPA',
    safetyTips: [
      'Ensure vehicle is in Park or Neutral',
      'Keep clear of moving parts',
      'Don\'t spray starting fluid near hot surfaces',
      'Check for fuel leaks before investigating'
    ],
    tools: [
      'Flashlight',
      'Basic tools (screwdriver, wrench)',
      'Jumper cables or jump starter',
      'Owner\'s manual'
    ],
    steps: [
      {
        number: 1,
        title: 'Check the Basics',
        description: 'Ensure the car is in Park (automatic) or Neutral (manual). Check if the steering wheel is locked - try turning it while turning the key.',
        tip: 'Sometimes the steering lock prevents ignition'
      },
      {
        number: 2,
        title: 'Check Battery',
        description: 'Turn on headlights. If they\'re dim or don\'t turn on, battery is likely dead. Look for clicking sound when turning key.',
        warning: 'Clicking sound usually indicates dead battery'
      },
      {
        number: 3,
        title: 'Try Jump Starting',
        description: 'If battery seems dead, try jump starting (see Dead Battery guide). Let it charge for a few minutes before attempting.',
        tip: 'Refer to the battery jump start guide for detailed steps'
      },
      {
        number: 4,
        title: 'Check Fuel Level',
        description: 'Ensure you have fuel. Fuel gauges can malfunction, so verify you actually have gas in the tank.',
        tip: 'If gauge shows fuel but suspect empty, add 1-2 gallons'
      },
      {
        number: 5,
        title: 'Check Connections',
        description: 'Look for loose battery cables, corroded terminals, or disconnected wires. Tighten any loose connections.',
        warning: 'Disconnect battery before cleaning corrosion'
      },
      {
        number: 6,
        title: 'Listen for Fuel Pump',
        description: 'Turn key to ON position (don\'t start). Listen for a humming sound from rear of car - that\'s the fuel pump priming.',
        tip: 'No sound could mean fuel pump failure'
      },
      {
        number: 7,
        title: 'Check Engine Light',
        description: 'If engine turns over but won\'t catch, note any warning lights. These can indicate specific problems.',
        warning: 'Flashing check engine light is serious - don\'t keep trying'
      },
      {
        number: 8,
        title: 'Call for Help',
        description: 'If none of these work, call a tow service. Modern cars have complex computer systems that require professional diagnosis.',
        tip: 'A mechanic can run diagnostic codes to identify the issue'
      }
    ]
  },
  'fuel-empty': {
    title: 'Out of Fuel',
    severity: 'low',
    estimatedTime: '30-60 minutes',
    difficulty: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/Z06a1DXJyvc',
    safetyTips: [
      'Pull over safely as soon as possible',
      'Turn on hazard lights',
      'Stay with your vehicle if on highway',
      'Use a proper gas container',
      'Never smoke while handling fuel'
    ],
    tools: [
      'Approved fuel container',
      'Money for fuel',
      'Phone for assistance',
      'Reflective vest (if walking on roadside)'
    ],
    steps: [
      {
        number: 1,
        title: 'Pull Over Safely',
        description: 'If you suspect you\'re running out of fuel, pull over to a safe location immediately. Turn on hazard lights.',
        warning: 'Don\'t wait until car stops in dangerous location'
      },
      {
        number: 2,
        title: 'Assess Your Location',
        description: 'Check your location and distance to nearest gas station. Use GPS/maps app to find closest station.',
        tip: 'Search for "gas station near me" in maps app'
      },
      {
        number: 3,
        title: 'Call for Assistance',
        description: 'Call roadside assistance service (if you have one) or AAA. They can bring fuel to you. This is the safest option.',
        tip: 'Many services offer fuel delivery for members'
      },
      {
        number: 4,
        title: 'Walk to Station (If Safe)',
        description: 'If station is nearby and you can walk safely (not on highway), bring an approved fuel container. Never use unapproved containers.',
        warning: 'Walking on highways is dangerous and often illegal'
      },
      {
        number: 5,
        title: 'Purchase Fuel',
        description: 'Buy 1-2 gallons of fuel and an approved container if you don\'t have one. Gas stations sell emergency fuel containers.',
        tip: '1-2 gallons is enough to get you to a station'
      },
      {
        number: 6,
        title: 'Return to Vehicle',
        description: 'Return to your vehicle safely. If you\'re on a highway, consider calling someone to drive you instead of walking back.',
        warning: 'Never walk on the highway at night'
      },
      {
        number: 7,
        title: 'Add Fuel',
        description: 'Carefully pour fuel into your tank. Avoid spilling. Replace gas cap securely.',
        tip: 'Use a funnel if available to avoid spills'
      },
      {
        number: 8,
        title: 'Start Vehicle',
        description: 'Turn the key to ON position for a few seconds (don\'t start) to let fuel pump prime. Then start the engine.',
        tip: 'May take 2-3 attempts after running completely dry'
      },
      {
        number: 9,
        title: 'Get to Station',
        description: 'Drive immediately to nearest gas station and fill up completely. Running out of fuel can damage fuel pump.',
        warning: 'Repeatedly running out of fuel can damage your car'
      }
    ]
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical':
      return 'bg-[hsl(var(--emergency))] text-[hsl(var(--emergency-foreground))]';
    case 'high':
      return 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]';
    case 'medium':
      return 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]';
    case 'low':
      return 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const GuideDisplay = ({ problem, carDetails, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const guide = guideData[problem];

  if (!guide) return null;

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Emergency Car Breakdown Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Car Details
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Vehicle: ${carDetails?.company || 'N/A'} ${carDetails?.model || 'N/A'}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Problem: ${guide.title}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Severity: ${guide.severity.toUpperCase()}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Estimated Time: ${guide.estimatedTime}`, margin, yPosition);
    yPosition += 15;

    // Safety Tips
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Safety Tips:', margin, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    guide.safetyTips.forEach((tip, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${tip}`, pageWidth - 2 * margin);
      lines.forEach(line => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });
    });
    yPosition += 8;

    // Required Tools
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Required Tools:', margin, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    guide.tools.forEach((tool, index) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(`• ${tool}`, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 8;

    // Steps
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Step-by-Step Instructions:', margin, yPosition);
    yPosition += 8;
    
    guide.steps.forEach((step) => {
      if (yPosition > pageHeight - margin - 20) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(`Step ${step.number}: ${step.title}`, margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const descLines = doc.splitTextToSize(step.description, pageWidth - 2 * margin);
      descLines.forEach(line => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      if (step.warning) {
        doc.setFont(undefined, 'bold');
        const warnLines = doc.splitTextToSize(`⚠ WARNING: ${step.warning}`, pageWidth - 2 * margin);
        warnLines.forEach(line => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin, yPosition);
          yPosition += 5;
        });
      }
      
      yPosition += 4;
    });

    // Footer
    yPosition += 10;
    if (yPosition > pageHeight - margin - 20) {
      doc.addPage();
      yPosition = margin;
    }
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    doc.text('For emergencies, call: 1033', margin, yPosition);
    yPosition += 6;
    doc.text('Generated by CarRescue Emergency Breakdown Guide', margin, yPosition);

    // Save
    doc.save(`${guide.title.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
    
    toast.success('PDF Downloaded!', {
      description: 'Emergency report saved successfully'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="border-2 shadow-xl">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-2xl sm:text-3xl">{guide.title}</CardTitle>
                <Badge className={getSeverityColor(guide.severity)}>
                  {guide.severity.toUpperCase()}
                </Badge>
              </div>
              
              {carDetails && (
                <p className="text-sm text-muted-foreground">
                  For: <span className="font-medium text-foreground">
                    {carDetails.company} {carDetails.model}
                  </span>
                  {carDetails.detectedBy === 'voice' && (
                    <Badge variant="outline" className="ml-2">Detected by Voice</Badge>
                  )}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">
                  <strong>Time:</strong> {guide.estimatedTime}
                </span>
                <span className="text-muted-foreground">
                  <strong>Difficulty:</strong> {guide.difficulty}
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent px-6 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="steps"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent px-6 py-3"
              >
                Step-by-Step
              </TabsTrigger>
              <TabsTrigger 
                value="video"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent px-6 py-3"
              >
                Video Guide
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Safety Tips */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-[hsl(var(--emergency))]" />
                    Safety First
                  </h3>
                  <div className="grid gap-2">
                    {guide.safetyTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--emergency-light))] border border-[hsl(var(--emergency))]/20"
                      >
                        <AlertTriangle className="h-4 w-4 text-[hsl(var(--emergency))] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Required Tools */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--success))]" />
                    Required Tools
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {guide.tools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted"
                      >
                        <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
                        <p className="text-sm">{tool}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() => setActiveTab('steps')}
                    className="flex-1 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-primary-foreground"
                  >
                    View Step-by-Step Guide
                  </Button>
                  <Button
                    onClick={generatePDF}
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="steps" className="mt-0 space-y-4">
                {guide.steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-[hsl(var(--primary))] pl-6 pb-6 relative"
                  >
                    <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                      
                      {step.warning && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-[hsl(var(--emergency-light))] border border-[hsl(var(--emergency))]/20 mt-3">
                          <AlertTriangle className="h-4 w-4 text-[hsl(var(--emergency))] flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-[hsl(var(--emergency))]">
                            {step.warning}
                          </p>
                        </div>
                      )}
                      
                      {step.tip && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]/20 mt-3">
                          <CheckCircle className="h-4 w-4 text-[hsl(var(--success))] flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-[hsl(var(--success))]">
                            💡 {step.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={generatePDF}
                    className="flex-1 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-primary-foreground"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="mt-0 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Play className="h-5 w-5 text-[hsl(var(--primary))]" />
                    Watch Tutorial Video
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Follow along with this detailed video guide for {guide.title.toLowerCase()}
                  </p>
                </div>
                
                <div className="aspect-video rounded-lg overflow-hidden border shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={guide.videoUrl}
                    title={guide.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setActiveTab('steps')}
                    variant="outline"
                    className="flex-1"
                  >
                    View Written Steps
                  </Button>
                  <Button
                    onClick={generatePDF}
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GuideDisplay;