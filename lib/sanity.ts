import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "5k8pb15e",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});
