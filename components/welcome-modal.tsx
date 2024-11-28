"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onStart: () => void;
}

export function WelcomeModal({ isOpen, onStart }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] text-center p-8">
        <DialogTitle className="sr-only">Bienvenue sur le Générateur de Cadeaux</DialogTitle>
        <div className="space-y-6">
          <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
            <Gift className="h-8 w-8 text-rose-500" />
          </div>
          
          <h2 className="text-2xl font-bold">Trouvez le cadeau parfait</h2>
          
          <p className="text-gray-600">
            Notre générateur intelligent vous aide à trouver le cadeau idéal
            en quelques clics. Laissez-vous guider !
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={onStart}
              className="bg-rose-500 hover:bg-rose-600 h-12 text-lg gap-2"
            >
              Démarrer le générateur
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}