import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "apigateway.psi-crm.com",
      },
    ],
  },
}

export default nextConfig
