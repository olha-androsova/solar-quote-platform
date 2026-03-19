type SavingsCalculatorProps = {
    monthlyBill: string;
    onMonthlyBillChange: (value: string) => void;
  };
  
  const SAVINGS_RATE = 0.3;
  
  export default function SavingsCalculator({
    monthlyBill,
    onMonthlyBillChange,
  }: SavingsCalculatorProps) {
    const numericBill = Number(monthlyBill) || 0;
    const estimatedSavings = numericBill * SAVINGS_RATE;
  
    return (
      <section className="card">
        <h2>Estimate your savings</h2>
        <p>See how much you could save with solar energy each month.</p>
  
        <label htmlFor="monthlyBill">Average monthly energy bill (SEK)</label>
        <input
          id="monthlyBill"
          type="number"
          min="0"
          step="0.01"
          value={monthlyBill}
          onChange={(event) => onMonthlyBillChange(event.target.value)}
          placeholder="3000"
        />
        <div className="savings-box">
          <span>Estimated monthly savings</span>
          <strong>{estimatedSavings.toFixed(2)} SEK / month</strong>
          <p>Based on your current monthly energy bill.</p>
        </div>
      </section>
    );
  }