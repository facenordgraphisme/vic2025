"use client";

import { Gift } from 'lucide-react';
import { Button } from './ui/button';

export function GiftHero() {
  const scrollToGenerator = () => {
    const generatorElement = document.getElementById('gift-generator');
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-24">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Trouvez le cadeau parfait
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Le Générateur de Cadeaux Intelligent
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez des suggestions personnalisées pour tous vos proches. Notre algorithme vous aide à trouver le cadeau idéal en fonction de vos critères.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              onClick={scrollToGenerator}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
            >
              Démarrer le générateur
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}