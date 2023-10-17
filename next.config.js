/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
  images: {
    loader: "akamai",
    path: "https://qcnotes-6baac.web.app",
    domains: [
      "https://qcnotes-6baac.web.app",
      "https://www.qcnotes-6baac.web.app",
      "http://localhost:3000"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
