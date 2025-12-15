/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Allow embedding preview in the builder iframe
         // { key: 'X-Frame-Options', value: 'ALLOWALL' },
         // { key: 'Content-Security-Policy', value: "frame-ancestors *;" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
            // Or if you want specific domains:
            // value: "frame-ancestors https://your-domain.com https://silver-cove-3s6o.episcloud.com;"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
