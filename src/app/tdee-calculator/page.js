import TDEECalculatorClient from "./TDEECalculatorClient";

export const metadata = {
  title: "TDEE Calculator (Total Daily Energy Expenditure)",
  description:
    "Estimate your total daily energy expenditure based on activity level. Accurate TDEE calculator for weight management.",
};

export default function Page() {
  return <TDEECalculatorClient />;
}
