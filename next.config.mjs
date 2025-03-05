/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.infura.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
