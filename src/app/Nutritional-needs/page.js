import NutritionalNeedsClient from "./NutritionalNeedsClient";

export const metadata = {
  title: "Daily Nutritional Needs Calculator",
  description:
    "Estimate daily nutritional requirements including calories, protein, and micronutrients.",
};

export default function Page() {
  return <NutritionalNeedsClient />;
}
