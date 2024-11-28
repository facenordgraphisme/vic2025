"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GiftCriteria } from "./gift-finder";
import { X } from "lucide-react";

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

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: keyof GiftCriteria | null;
  criteria: GiftCriteria;
  updateCriteria: (key: keyof GiftCriteria, value: any) => void;
}

const sectionTitles: Record<keyof GiftCriteria, string> = {
  gender: "Pour qui cherchez-vous un cadeau ?",
  ageRange: "Quelle est sa tranche d'âge ?",
  interests: "Quels sont ses centres d'intérêt ?",
  budget: "Quel est votre budget ?",
  occasion: "Pour quelle occasion ?",
  relationship: "Quelle est votre relation ?"
};

export function GiftModal({ isOpen, onClose, section, criteria, updateCriteria }: GiftModalProps) {
  if (!section) return null;

  const renderContent = () => {
    switch (section) {
      case "interests":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant={criteria.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-rose-100 hover:text-rose-700 text-sm py-2 px-4"
                  onClick={() => {
                    const newInterests = criteria.interests.includes(interest)
                      ? criteria.interests.filter(i => i !== interest)
                      : [...criteria.interests, interest];
                    updateCriteria("interests", newInterests);
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
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-center text-rose-500">
                {criteria.budget}€
              </div>
              <Slider
                value={[criteria.budget]}
                onValueChange={(value) => updateCriteria("budget", value[0])}
                max={500}
                step={10}
                className="w-full"
              />
            </div>
          </div>
        );

      default:
        if (section in options) {
          const optionsArray = options[section as keyof typeof options];
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {optionsArray.map((option) => (
                  <Button
                    key={option.value}
                    variant={criteria[section] === option.value ? "default" : "outline"}
                    className="w-full justify-start h-12 text-left"
                    onClick={() => updateCriteria(section, option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="text-lg font-semibold mb-4">
          {sectionTitles[section]}
        </DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}