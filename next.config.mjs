/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "club.jactc.xyz",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
