import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Rewrite API calls to backend
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
      {
        source: "/api/cto/:path*",
        destination: `${apiUrl}/api/cto/:path*`,
      },
      {
        source: "/cto/:path*",
        destination: `${apiUrl}/cto/:path*`,
      },
      {
        source: "/cto",
        destination: `${apiUrl}/cto`,
      },
      {
        source: "/api/chat/:path*",
        destination: `${apiUrl}/api/chat/:path*`,
      },
    ];
  },
  // CORS headers for API access
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Allow access to remote image placeholder
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
  output: 'standalone',
  // Empty turbopack config to support both webpack and turbopack
  turbopack: {},
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
