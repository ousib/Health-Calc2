import PeriodCycleClient from "./PeriodCycleClient";

export const metadata = {
  title: "Menstrual Cycle Calculator",
  description:
    "Track menstrual cycle length and predict next period dates accurately.",
};

export default function Page() {
  return <PeriodCycleClient />;
}
