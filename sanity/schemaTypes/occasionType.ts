import { defineType } from 'sanity';

export const occasionType = defineType({
  name: 'occasion',
  title: 'Occasion',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: 'Anniversaire', 'Noël', 'Mariage'.",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      description: "Ex: 'anniversaire', 'noel', 'mariage'.",
    },
  ],
});