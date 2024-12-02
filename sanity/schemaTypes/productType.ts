import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "interests",
      title: "Interests",
      type: "array",
      of: [{ type: "reference", to: [{ type: "interest" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      media: "images.0",
    },
    prepare(selection) {
      const { title, price, media } = selection;
      return {
        title,
        subtitle: `€${price}`,
        media,
      };
    },
  },
});
