/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["i.ibb.co", "lh3.googleusercontent.com"],
   },
   webpack(config, options) {
      config.module.rules.push({
         test: /\.mp3$/,
         use: {
            loader: "url-loader",
         },
      });
      return config;
   },
};

export default nextConfig;
