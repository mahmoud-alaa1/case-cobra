/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  i18n: {
    locales: ["en", "ar"], // Add your supported locales
    defaultLocale: "en", // Set the default locale
  },
};

export default nextConfig;
