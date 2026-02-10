import BodyFatCalculatorClient from "./BodyFatCalculatorClient";

export const metadata = {
  title: "Body Fat Percentage Calculator",
  description:
    "Estimate your body fat percentage using proven formulas for men and women.",
};

export default function BodyFatCalculatorPage() {
  return <BodyFatCalculatorClient />;
}
