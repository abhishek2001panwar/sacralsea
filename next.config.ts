import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   theme: {
    extend: {
      fontFamily: {
        rockwell: ["Rockwell", "serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
   plugins: [],
};

export default nextConfig;
