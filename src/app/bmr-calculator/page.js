import BMRCalculatorClient from "./BMRCalculatorClient";

export const metadata = {
  title: "BMR Calculator (Basal Metabolic Rate)",
  description:
    "Calculate your basal metabolic rate to understand daily calorie needs at rest. Uses Mifflin-St Jeor formula.",
};

export default function Page() {
  return <BMRCalculatorClient />;
}
