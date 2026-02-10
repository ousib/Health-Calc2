import PregnancyWeightGainClient from "./PregnancyWeightGainClient";

export const metadata = {
  title: "Pregnancy Weight Gain Calculator",
  description:
    "Track recommended weight gain during pregnancy based on pre-pregnancy BMI.",
};

export default function Page() {
  return <PregnancyWeightGainClient />;
}
