import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Health Calculators Online for clinical formula feedback, technical support, tool requests, or privacy inquiries.",
  alternates: {
    canonical: "https://healthcalculatorsonline.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
