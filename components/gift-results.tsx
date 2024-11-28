"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ExternalLink } from "lucide-react";
import type { GiftCriteria } from "./gift-finder";

interface GiftResult {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  link: string;
}

interface GiftResultsProps {
  criteria: GiftCriteria;
  onBack: () => void;
}

export function GiftResults({ criteria, onBack }: GiftResultsProps) {
  // Simulation de résultats (à remplacer par une vraie API)
  const results: GiftResult[] = [
    {
      id: "1",
      name: "Casque Audio Sans Fil",
      price: 129.99,
      description: "Casque bluetooth avec réduction de bruit active",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Technologie",
      rating: 4.5,
      link: "#"
    },
    {
      id: "2",
      name: "Kit de Jardinage Premium",
      price: 79.99,
      description: "Ensemble d'outils de jardinage professionnels",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      category: "Jardinage",
      rating: 4.8,
      link: "#"
    },
    {
      id: "3",
      name: "Collection de Thés Bio",
      price: 45.99,
      description: "Coffret dégustation de thés du monde",
      imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12",
      category: "Bien-être",
      rating: 4.6,
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Suggestions personnalisées
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(criteria).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            if (key === "budget") {
              return (
                <Badge key={key} variant="secondary" className="text-sm">
                  {value.min}€ - {value.max}€
                </Badge>
              );
            }
            return (
              <Badge key={key} variant="secondary" className="text-sm">
                {Array.isArray(value) 
                  ? `${value.length} centres d'intérêt`
                  : value}
              </Badge>
            );
          })}
          <Button variant="outline" size="sm" onClick={onBack}>
            Modifier les critères
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((gift) => (
          <Card key={gift.id} className="overflow-hidden group">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 space-x-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{gift.name}</h3>
                <p className="text-sm text-gray-600">{gift.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{gift.price}€</span>
                <Button className="gap-2">
                  Voir l'offre
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}