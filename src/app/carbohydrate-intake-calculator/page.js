import CarbohydrateIntakeClient from "./CarbohydrateIntakeClient";

export const metadata = {
  title: "Daily Carbohydrate Intake Calculator",
  description:
    "Calculate recommended daily carbohydrate intake based on activity level and goals.",
};

export default function Page() {
  return <CarbohydrateIntakeClient />;
}
