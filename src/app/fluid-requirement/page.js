import FluidRequirementClient from "./FluidRequirementClient";

export const metadata = {
  title: "Daily Fluid Requirement Calculator",
  description:
    "Calculate daily fluid requirements based on weight, age, and medical guidelines.",
};

export default function Page() {
  return <FluidRequirementClient />;
}
