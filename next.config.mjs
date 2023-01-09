// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));


import nextPWA from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withPWA = nextPWA({
	dest: "public",
  disable: process.env.NODE_ENV === "development",
});


/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}

const nextConfig = defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

export default withPWA(withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig));
