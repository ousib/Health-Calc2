import BMICalculatorClient from "./BMICalculatorClient";

export const metadata = {
  title: "BMI Calculator (Feet & Inches)",
  description:
    "Free BMI calculator for men and women. Calculate Body Mass Index using feet, inches, and pounds with accurate BMI categories.",
};

export default function BMICalculatorPage() {
  return <BMICalculatorClient />;
}
