import { defineType } from 'sanity';

export const genderType = defineType({
  name: 'gender',
  title: 'Gender',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: 'Homme', 'Femme', 'Non précisé'.",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      description: "Ex: 'homme', 'femme', 'neutre'.",
    },
  ],
});