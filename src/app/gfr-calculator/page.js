import GFRCalculatorClient from "./GFRCalculatorClient";

export const metadata = {
  title: "GFR Calculator (Kidney Function)",
  description:
    "Estimate glomerular filtration rate to assess kidney function. Uses CKD-EPI and MDRD equations.",
};

export default function Page() {
  return <GFRCalculatorClient />;
}
