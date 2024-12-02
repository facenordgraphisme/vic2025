"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { fetchProductById } from "@/sanity/lib/fetch-products";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query; // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return; // Vérifie que `id` est une chaîne

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Chargement du produit...</div>;
  }

  if (!product) {
    return <div>Produit introuvable</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Informations du produit */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-rose-500 mb-4">
            {product.price}€
          </div>

          {/* Bouton d'affiliation */}
          <Button
            as="a"
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
          >
            Voir l'offre
            <ExternalLink className="h-4 w-4" />
          </Button>

          {/* Retour */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mt-4"
          >
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
