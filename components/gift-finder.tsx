"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StepContent } from "./step-content";
import { GiftResults } from "./gift-results";

export type GiftCriteria = {
  gender: string;
  ageRange: string;
  interests: string[];
  budget: {
    min: number;
    max: number;
  };
  occasion: string;
  relationship: string;
};

const steps = [
  { key: "gender" as const, title: "Pour qui cherchez-vous un cadeau ?" },
  { key: "ageRange" as const, title: "Quelle est sa tranche d'âge ?" },
  { key: "interests" as const, title: "Quels sont ses centres d'intérêt ?" },
  { key: "occasion" as const, title: "Pour quelle occasion ?" },
  { key: "relationship" as const, title: "Quelle est votre relation ?" },
  { key: "budget" as const, title: "Quel est votre budget ?" },
];

export default function GiftFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [criteria, setCriteria] = useState<GiftCriteria>({
    gender: "",
    ageRange: "",
    interests: [],
    budget: {
      min: 20,
      max: 100
    },
    occasion: "",
    relationship: "",
  });

  const updateCriteria = (key: keyof GiftCriteria, value: any) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    const currentKey = steps[currentStep].key;
    const value = criteria[currentKey];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return true;
    return value !== "";
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setCurrentStep(prev => Math.max(0, prev - 1));
    }
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResults]);

  return (
    <>
      {!showResults && (
        <div className="w-full max-w-2xl px-4">
          <Card className="p-8 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {steps[currentStep].title}
                </h2>
                {currentStep === 0 && (
                  <p className="text-gray-500">
                    Laissez-nous vous aider à trouver le cadeau parfait
                  </p>
                )}
              </div>

              <div className="min-h-[300px] flex items-center justify-center">
                <StepContent
                  step={steps[currentStep].key}
                  value={criteria[steps[currentStep].key]}
                  onChange={(value) => updateCriteria(steps[currentStep].key, value)}
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Retour
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {currentStep + 1} sur {steps.length}
                  </span>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Rechercher
                      <Gift className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showResults && (
        <div ref={resultsRef} className="w-full">
          <GiftResults 
            criteria={criteria} 
            onBack={() => {
              setShowResults(false);
              setCurrentStep(steps.length - 1);
            }} 
          />
        </div>
      )}
    </>
  );
}