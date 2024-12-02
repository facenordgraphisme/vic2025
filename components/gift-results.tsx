"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ExternalLink } from "lucide-react";
import { fetchProducts } from "../sanity/lib/fetch-products";
import Link from "next/link";
import type { GiftCriteria } from "./gift-finder";

interface GiftResult {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  categories: string[];
  affiliateLink: string;
  slug: { current: string };
}

interface GiftResultsProps {
  criteria: GiftCriteria;
  onReturn: () => void; // Nouvelle prop
}

export function GiftResults({ criteria, onReturn }: GiftResultsProps) {
  const [results, setResults] = useState<GiftResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      setLoading(true);
      try {
        const products = await fetchProducts(criteria);
        setResults(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetProducts();
  }, [criteria]);

  if (loading) {
    return <div>Chargement des résultats...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Suggestions personnalisées
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(criteria).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;

            if (
              key === "priceRange" &&
              typeof value === "object" &&
              value !== null &&
              "min" in value &&
              "max" in value
            ) {
              return (
                <Badge key={key} variant="secondary" className="text-sm">
                  {value.min}€ - {value.max}€
                </Badge>
              );
            }

            return (
              <Badge key={key} variant="secondary" className="text-sm capitalize">
                {Array.isArray(value)
                  ? `${value.length} centres d'intérêt`
                  : typeof value === "string"
                  ? value
                  : ""}
              </Badge>
            );
          })}
          <Button variant="outline" size="sm" onClick={onReturn}>
            Modifier les critères
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((gift, index) => {
  const uniqueKey = gift.id || `fallback-key-${index}`;
  return (
    <Card key={uniqueKey} className="overflow-hidden group">
      <Link href={`/products/${gift.slug.current}`}>
  <div className="aspect-square relative overflow-hidden cursor-pointer">
    <img
      src={gift.imageUrl}
      alt={gift.title}
      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
    />
  </div>
</Link>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{gift.title}</h3>
          <p className="text-sm text-gray-600">{gift.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{gift.price}€</span>
          <a
            href={gift.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2 flex items-center px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
          >
            Voir l'offre
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Card>
          );
        })}
      </div>
    </div>
  );
}
