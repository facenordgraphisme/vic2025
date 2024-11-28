"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

const interests = [
  "Sport", "Technologie", "Lecture", "Cuisine", "Jardinage",
  "Art", "Musique", "Voyage", "Mode", "Jeux vidéo",
  "Bien-être", "Bricolage", "Cinéma", "Photographie", "Nature"
];

const options = {
  gender: [
    { value: "homme", label: "Homme" },
    { value: "femme", label: "Femme" },
    { value: "neutre", label: "Non précisé" }
  ],
  ageRange: [
    { value: "0-12", label: "0-12 ans" },
    { value: "13-17", label: "13-17 ans" },
    { value: "18-25", label: "18-25 ans" },
    { value: "26-40", label: "26-40 ans" },
    { value: "41-60", label: "41-60 ans" },
    { value: "60+", label: "60+ ans" }
  ],
  occasion: [
    { value: "anniversaire", label: "Anniversaire" },
    { value: "noel", label: "Noël" },
    { value: "mariage", label: "Mariage" },
    { value: "naissance", label: "Naissance" },
    { value: "autre", label: "Autre" }
  ],
  relationship: [
    { value: "famille", label: "Famille" },
    { value: "ami", label: "Ami(e)" },
    { value: "collegue", label: "Collègue" },
    { value: "partenaire", label: "Partenaire" },
    { value: "autre", label: "Autre" }
  ]
};

interface StepContentProps {
  step: string;
  value: any;
  onChange: (value: any) => void;
}

const priceRanges = [
  { min: 0, max: 20, label: "Moins de 20€" },
  { min: 20, max: 50, label: "20€ - 50€" },
  { min: 50, max: 100, label: "50€ - 100€" },
  { min: 100, max: 200, label: "100€ - 200€" },
  { min: 200, max: 500, label: "200€ - 500€" },
  { min: 500, max: 99999, label: "Plus de 500€" }
];

export function StepContent({ step, value, onChange }: StepContentProps) {
  const renderContent = () => {
    switch (step) {
      case "interests":
        return (
          <div className="w-full max-w-md">
            <div className="flex flex-wrap gap-2 justify-center">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant={value.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-rose-100 hover:text-rose-700 text-sm py-2 px-4"
                  onClick={() => {
                    const newInterests = value.includes(interest)
                      ? value.filter((i: string) => i !== interest)
                      : [...value, interest];
                    onChange(newInterests);
                  }}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        );

      case "budget":
        return (
          <div className="w-full max-w-md space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {priceRanges.map((range) => (
                <Button
                  key={`${range.min}-${range.max}`}
                  variant={value.min === range.min && value.max === range.max ? "default" : "outline"}
                  className="w-full justify-center h-12 text-lg"
                  onClick={() => onChange(range)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        if (step in options) {
          const optionsArray = options[step as keyof typeof options];
          return (
            <div className="w-full max-w-md grid gap-2">
              {optionsArray.map((option) => (
                <Button
                  key={option.value}
                  variant={value === option.value ? "default" : "outline"}
                  className="w-full justify-center h-12 text-lg"
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          );
        }
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}