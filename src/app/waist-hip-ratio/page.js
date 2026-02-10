import WaistHipRatioClient from "./WaistHipRatioClient";

export const metadata = {
  title: "Waist to Hip Ratio Calculator",
  description:
    "Calculate your waist-to-hip ratio and assess health risk levels. Accurate WHR calculator for men and women.",
};

export default function Page() {
  return <WaistHipRatioClient />;
}
