import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "artist-nextjs-test01",
  apiKey: process.env.API_KEY,
});
