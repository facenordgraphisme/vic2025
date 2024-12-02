import { defineType } from 'sanity';

export const relationType = defineType({
  name: 'relation',
  title: 'Relation',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: 'Famille', 'Ami(e)'.",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      description: "Ex: 'famille', 'ami'. Utilisé pour les identifiants uniques.",
    },
  ],
});