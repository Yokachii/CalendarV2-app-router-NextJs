/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
    },
}

module.exports = nextConfig
