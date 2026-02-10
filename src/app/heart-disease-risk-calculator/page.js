import HeartDiseaseRiskClient from "./HeartDiseaseRiskClient";

export const metadata = {
  title: "Heart Disease Risk Calculator",
  description:
    "Assess your risk of heart disease using age, cholesterol, and lifestyle factors.",
};

export default function Page() {
  return <HeartDiseaseRiskClient />;
}
