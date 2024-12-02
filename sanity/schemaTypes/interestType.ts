import { defineType } from 'sanity';

export const interestType = defineType({
  name: 'interest',
  title: 'Interest',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: 'Art', 'Sport', 'Voyage'.",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      description: "Ex: 'art', 'sport', 'voyage'.",
    },
  ],
});