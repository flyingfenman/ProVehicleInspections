/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Links copied from Epping Car Buyer (WhatsApp catalogue, saved bookmarks) used the /vehicle-inspections paths.
      // On this site the inspection page is the home page, so those paths go to the matching page here, query string
      // (package, battery, date, time) included.
      { source: '/vehicle-inspections', destination: '/', permanent: true },
      { source: '/vehicle-inspections/:page(book|booked|sample-report|what-we-inspect)', destination: '/:page', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ]
  },

}

export default nextConfig
