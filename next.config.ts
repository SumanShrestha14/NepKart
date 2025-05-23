import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// …rest of your next.config.ts…
const nextConfig: NextConfig = {
  /* config options here */
};

export default withPayload(nextConfig);
