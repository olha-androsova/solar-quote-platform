import { useState } from "react";
import Header from "../components/Header";
import SavingsCalculator from "../components/SavingsCalculator";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function QuotePage() {
  const [monthlyBill, setMonthlyBill] = useState("");

  return (
    <>
      <Header />
      <main className="container page-content">
        <section className="hero">
          <h2>See how much you could save with solar</h2>
          <p>
            Estimate your monthly savings and request a personalized solar quote.
          </p>
        </section>

        <div className="page-grid">
          <SavingsCalculator
            monthlyBill={monthlyBill}
            onMonthlyBillChange={setMonthlyBill}
          />
          <LeadCaptureForm monthlyBill={monthlyBill} />
        </div>
      </main>
    </>
  );
}