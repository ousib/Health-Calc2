import BSACalculatorClient from "./BSACalculatorClient";

export const metadata = {
  title: "Body Surface Area (BSA) Calculator",
  description:
    "Calculate body surface area using Mosteller and Du Bois formulas. Commonly used in medical and drug dosing calculations.",
};

export default function Page() {
  return <BSACalculatorClient />;
}
