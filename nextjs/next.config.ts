import withMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
};

const withNextMDX = withMDX({
  extension: /\.mdx?$/,
});

export default withNextMDX(nextConfig);
