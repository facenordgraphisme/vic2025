import { defineType } from 'sanity';

export const ageRangeType = defineType({
  name: 'ageRange',
  title: 'Age Range',
  type: 'document',
  fields: [
    {
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Ex: '18-25 ans', '26-40 ans'.",
    },
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
      description: "Ex: '18-25', '26-40'.",
    },
  ],
});