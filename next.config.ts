import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'dnibiylynsrvisgmhipn.supabase.co',
      }
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
