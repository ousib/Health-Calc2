/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/nutritional-needs",
        destination: "/Nutritional-needs",
        permanent: true,
      },
      {
        source: "/creatinine-clearance",
        destination: "/creatinine-clearance-calculator",
        permanent: true,
      },
      {
        source: "/medication-dosage",
        destination: "/medication-dosage-calculator",
        permanent: true,
      },
      {
        source: "/ideal-weight-calculator",
        destination: "/ibw-calculator",
        permanent: true,
      },
      {
        source: "/waist-to-height-ratio",
        destination: "/waist-hip-ratio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
