import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const carCompanies = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
  'Audi', 'Volkswagen', 'Nissan', 'Hyundai', 'Kia', 'Mazda',
  'Subaru', 'Tesla', 'Volvo', 'Jeep', 'Ram', 'GMC'
];

const carModels = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge'],
  'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'],
  'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata'],
  'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y'],
  'Volvo': ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
  'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Gladiator'],
  'Ram': ['1500', '2500', '3500', 'ProMaster'],
  'GMC': ['Sierra', 'Terrain', 'Acadia', 'Canyon', 'Yukon']
};

const problems = [
  { id: 'flat-tire', label: 'Flat Tire', icon: '🚗' },
  { id: 'battery-dead', label: 'Dead Battery', icon: '🔋' },
  { id: 'engine-overheat', label: 'Engine Overheating', icon: '🌡️' },
  { id: 'brake-failure', label: 'Brake Issues', icon: '🛑' },
  { id: 'no-start', label: "Won't Start", icon: '🔑' },
  { id: 'fuel-empty', label: 'Out of Fuel', icon: '⛽' },
];

export const BreakdownForm = ({ onProblemSelect }) => {
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    if (company) {
      setAvailableModels(carModels[company] || []);
      setModel('');
      
      // Save to localStorage
      localStorage.setItem('lastCarCompany', company);
    }
  }, [company]);

  useEffect(() => {
    if (model) {
      localStorage.setItem('lastCarModel', model);
    }
  }, [model]);

  useEffect(() => {
    // Load saved preferences
    const savedCompany = localStorage.getItem('lastCarCompany');
    const savedModel = localStorage.getItem('lastCarModel');
    
    if (savedCompany) {
      setCompany(savedCompany);
      if (savedModel) {
        setModel(savedModel);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!company || !model || !problem) {
      toast.error('Please fill all fields', {
        description: 'Select your car company, model, and the problem you\'re facing'
      });
      return;
    }

    const problemData = problems.find(p => p.id === problem);
    
    toast.success('Guide Loading!', {
      description: `Preparing ${problemData.label} solution for your ${company} ${model}`
    });

    onProblemSelect(problem, { company, model });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 hover:border-[hsl(var(--primary))] transition-colors duration-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="h-5 w-5 text-[hsl(var(--primary))]" />
            Select Your Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Car Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Car Company
            </Label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger id="company" className="h-11">
                <SelectValue placeholder="Select your car brand" />
              </SelectTrigger>
              <SelectContent>
                {carCompanies.map((comp) => (
                  <SelectItem key={comp} value={comp}>
                    {comp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Car Model */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium">
              Car Model
            </Label>
            <Select 
              value={model} 
              onValueChange={setModel}
              disabled={!company}
            >
              <SelectTrigger id="model" className="h-11">
                <SelectValue placeholder={company ? "Select your model" : "Select company first"} />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((mod) => (
                  <SelectItem key={mod} value={mod}>
                    {mod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Problem Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">What's the Problem?</Label>
            <div className="grid grid-cols-2 gap-3">
              {problems.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => setProblem(prob.id)}
                  className={`
                    relative p-4 rounded-lg border-2 text-left transition-all duration-300
                    hover:border-[hsl(var(--primary))] hover:shadow-md
                    ${
                      problem === prob.id
                        ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary-light))] shadow-md'
                        : 'border-border bg-card'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{prob.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {prob.label}
                      </p>
                    </div>
                    {problem === prob.id && (
                      <CheckCircle className="h-5 w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Solution Guide
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BreakdownForm;