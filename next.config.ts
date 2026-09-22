import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/resources', destination: '/dashboard/resources', permanent: false },
      { source: '/requests', destination: '/dashboard/requests', permanent: false },
      { source: '/rides', destination: '/dashboard/rides', permanent: false },
      { source: '/skills', destination: '/dashboard/skills', permanent: false },
      { source: '/profile', destination: '/dashboard/profile', permanent: false },
      { source: '/chat', destination: '/dashboard/chat', permanent: false },
    ];
  },
};

export default nextConfig;
