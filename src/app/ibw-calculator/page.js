import IBWCalculatorClient from "./IBWCalculatorClient";

export const metadata = {
  title: "Ideal Body Weight Calculator",
  description:
    "Calculate your ideal body weight using proven formulas for men and women. Supports feet, inches, and pounds.",
};

export default function Page() {
  return <IBWCalculatorClient />;
}
