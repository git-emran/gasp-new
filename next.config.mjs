/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
};

export default nextConfig;
