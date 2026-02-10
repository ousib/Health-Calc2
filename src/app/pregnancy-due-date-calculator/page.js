import PregnancyDueDateClient from "./PregnancyDueDateClient";

export const metadata = {
  title: "Pregnancy Due Date Calculator",
  description:
    "Estimate your pregnancy due date based on last menstrual period. Simple and accurate pregnancy calculator.",
};

export default function Page() {
  return <PregnancyDueDateClient />;
}
