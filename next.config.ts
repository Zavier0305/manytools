import type { NextConfig } from "next";

// When built by the GitHub Pages workflow, the site is served from
// https://<user>.github.io/manytools/ instead of the domain root, so all
// routes and asset URLs need the /manytools prefix. Local dev and other
// hosts (e.g. Vercel) build without GITHUB_PAGES and keep the root path.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/manytools" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
};

export default nextConfig;
