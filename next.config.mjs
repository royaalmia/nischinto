process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
