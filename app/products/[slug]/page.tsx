import { fetchProductBySlug } from "@/sanity/lib/fetch-products";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

interface ProductProps {
  params: { slug: string }; // Slug est requis
}

export default async function ProductPage({ params }: ProductProps) {
  // Vérification et récupération asynchrone
  const slug = await Promise.resolve(params.slug);

  // Récupérer le produit par le slug
  const product = await fetchProductBySlug(slug);

  // Si aucun produit n'est trouvé, rediriger vers une page 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image principale */}
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

          {/* Lien affilié */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
          >
            Voir l'offre
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
