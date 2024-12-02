import { createClient } from "next-sanity";
import { GiftCriteria } from "../../components/gift-finder";

const sanityClient = createClient({
  projectId: "y6vq9e5p", // Remplacez par votre ID de projet Sanity
  dataset: "production",
  apiVersion: "2023-11-28",
  useCdn: true,
});

/**
 * Fetch products based on GiftCriteria.
 */
export async function fetchProducts(criteria: GiftCriteria) {
  const { gender, ageRange, interests, relation, occasion, priceRange } = criteria;

  // Concaténation des filtres avec vérification
  const filters = [
    `_type == "product"`,
    gender ? `"${gender}" in genders[]->value` : undefined,
    ageRange ? `"${ageRange}" in ageRanges[]->value` : undefined,
    interests?.length
      ? interests.map((interest) => `"${interest}" in interests[]->value`).join(" || ")
      : undefined,
    relation ? `"${relation}" in relations[]->value` : undefined,
    occasion ? `"${occasion}" in occasions[]->value` : undefined,
    priceRange?.min !== undefined ? `price >= ${priceRange.min}` : undefined,
    priceRange?.max !== undefined ? `price <= ${priceRange.max}` : undefined,
  ].filter(Boolean); // Retire les critères non définis

  const query = `
    *[${filters.join(" && ")}]{
      _id,
      title,
      price,
      description,
      "imageUrl": images[0].asset->url,
      "categories": interests[]->value,
      affiliateLink,
      slug
    }
  `;

  console.log("Sanity Query:", query);

  try {
    const products = await sanityClient.fetch(query);
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug.
 */
export async function fetchProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    description,
    price,
    "imageUrl": images[0].asset->url,
    affiliateLink
  }`;

  try {
    const product = await sanityClient.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}