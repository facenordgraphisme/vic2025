import { defineType } from "sanity";

export const priceRangeType = defineType({
  name: "priceRange",
  title: "Price Range",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: 'Moins de 20€', '20€ - 50€'.",
    },
    {
      name: "minPrice",
      title: "Minimum Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Le prix minimum pour cette plage.",
    },
    {
      name: "maxPrice",
      title: "Maximum Price",
      type: "number",
      validation: (Rule) =>
        Rule.required().custom((maxPrice, context) => {
          const minPrice = context?.document?.minPrice ?? null; // Gestion de `undefined` et `null`
          if (typeof minPrice === "number" && typeof maxPrice === "number") {
            if (maxPrice <= minPrice) {
              return "Le prix maximum doit être supérieur au prix minimum.";
            }
          }
          return true;
        }),
      description: "Le prix maximum pour cette plage.",
    },
  ],
});
