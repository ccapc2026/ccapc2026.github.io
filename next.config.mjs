/**
 * Static export so the site can be served from GitHub Pages (or any static host).
 *
 * Deploying to a PROJECT page (https://<user>.github.io/<repo>)?
 *   Set BASE_PATH=/<repo> — the deploy workflow does this automatically.
 * Deploying to a USER page (https://<user>.github.io) or a custom domain?
 *   Leave BASE_PATH unset.
 */
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Production builds write to their own directory so `npm run build` can never
  // clobber the chunks a running `npm run dev` is holding open.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  basePath,
  // Emit /contest/index.html instead of /contest.html so static hosts resolve
  // clean URLs without server rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
