import { client } from "./client";

export async function fetchSanityData(schemaType: string) {
  const data = await client.fetch(`*[_type == $schemaType]{ title, value }`, {
    schemaType,
  });
  return data;
}