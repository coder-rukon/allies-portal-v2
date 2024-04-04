/** @type {import('next').NextConfig} */
const nextConfig = {
    exportPathMap: async function () {
        // Return an empty object to disable static generation
        return {};
    },
};

export default nextConfig;
