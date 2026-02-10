import HeartRateCalculatorClient from "./HeartRateCalculatorClient";

export const metadata = {
  title: "Target Heart Rate Zones Calculator",
  description:
    "Calculate target heart rate zones for fat burn, cardio, and peak performance based on age and fitness level.",
};

export default function Page() {
  return <HeartRateCalculatorClient />;
}
