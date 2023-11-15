/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          const mod = resource.request.replace(/^node:/, "");
      
          switch (mod) {
            case "path":
              resource.request = "path-browserify";
              break;
            default:
              throw new Error(`Not found ${mod}`);
            }
        }),
      ]
}

module.exports = nextConfig
