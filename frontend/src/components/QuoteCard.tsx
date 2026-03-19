import type { QuoteRequest } from "../types/quote";

type QuoteCardProps = {
  quote: QuoteRequest;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <article className="quote-card">
      <h3>{quote.name}</h3>
      <p><strong>Email:</strong> {quote.email}</p>
      <p><strong>Phone:</strong> {quote.phone || "No phone provided"}</p>
      <p><strong>Address:</strong> {quote.address}</p>
      <p><strong>Monthly bill:</strong> {quote.monthly_energy_bill} SEK</p>
      <p><strong>Estimated savings:</strong> {quote.estimated_monthly_savings} SEK</p>
      <p><strong>Submitted:</strong> {new Date(quote.created_at).toLocaleString()}</p>
    </article>
  );
}