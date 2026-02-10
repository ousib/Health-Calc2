import SafePeriodClient from "./SafePeriodClient";

export const metadata = {
  title: "Safe Period Calculator",
  description:
    "Estimate safe days to avoid pregnancy based on menstrual cycle tracking.",
};

export default function Page() {
  return <SafePeriodClient />;
}
