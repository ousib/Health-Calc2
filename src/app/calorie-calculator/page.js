import CalorieCalculatorClient from "./CalorieCalculatorClient";

export const metadata = {
  title: "Calorie Calculator for Weight Loss",
  description:
    "Calculate your daily calorie needs for weight loss or maintenance. Supports pounds, feet, and inches.",
};

export default function CalorieCalculatorPage() {
  return <CalorieCalculatorClient />;
}
