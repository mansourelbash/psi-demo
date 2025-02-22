import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "apigateway.psi-crm.com",
      },
      {
        hostname: "apigateway.dubai-crm.com",
      },
      {
        hostname: "apigateway.psiassets-crm.com",
      },
      {
        hostname: "web.dev.psi-crm.com",
      },
    ],
  },
  reactStrictMode: false,
  // experimental: {
  //   turbo: {
  //     rules: {
  //       "*.svg": {
  //         loaders: ["@svgr/webpack"],
  //         as: "*.js",
  //         // options: {
  //         //   // svgo: false, // Enable SVGO explicitly
  //         //   svgoConfig: {
  //         //     plugins: [
  //         //       {
  //         //         name: "preset-default",
  //         //         params: {
  //         //           overrides: {
  //         //             // disable a default plugin
  //         //             cleanupIds: false,

  //         //             // customize the params of a default plugin
  //         //             inlineStyles: {
  //         //               onlyMatchedOnce: false,
  //         //             },
  //         //           },
  //         //         },
  //         //       },
  //         //     ],
  //         //   },
  //         // },
  //       },
  //     },
  //   },
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // Enable SVGO explicitly
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                      mergePaths: false,
                      convertStyleToAttrs: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

export default nextConfig
