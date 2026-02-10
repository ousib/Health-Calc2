import BloodPressureCategoryClient from "./BloodPressureCategoryClient";

export const metadata = {
  title: "Blood Pressure Category Calculator",
  description:
    "Classify blood pressure readings into normal, elevated, or hypertension categories.",
};

export default function Page() {
  return <BloodPressureCategoryClient />;
}
