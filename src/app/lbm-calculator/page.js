import LBMCalculatorClient from "./LBMCalculatorClient";

export const metadata = {
  title: "Lean Body Mass Calculator",
  description:
    "Estimate your lean body mass using accurate formulas for men and women. Useful for fitness and health tracking.",
};

export default function Page() {
  return <LBMCalculatorClient />;
}
