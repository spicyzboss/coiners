/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/types/*": ["types/*"],
    },
  },
};

module.exports = nextConfig;
