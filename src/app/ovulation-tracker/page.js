import OvulationTrackerClient from "./OvulationTrackerClient";

export const metadata = {
  title: "Ovulation Calculator & Fertile Window Tracker",
  description:
    "Track ovulation and fertile days to plan or prevent pregnancy. Accurate ovulation calculator based on cycle length.",
};

export default function Page() {
  return <OvulationTrackerClient />;
}
