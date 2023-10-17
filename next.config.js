/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
  images: {
    loader: "akamai",
    path: "https://bo-qcnotes.web.app",
    domains: [
      "https://bo-qcnotes.web.app",
      "https://www.bo-qcnotes.web.app",
      "http://localhost:3000"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
