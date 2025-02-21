import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["resource.hanteochart.io", "s3.ap-northeast-2.amazonaws.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "resource.hanteochart.io",
    //     port: "",
    //     pathname: "/hanteonews/article/thumbnail/**",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
