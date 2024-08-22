/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/index.html', // Fallback to index.html for all routes
            },
        ];
    },
};

export default nextConfig;
