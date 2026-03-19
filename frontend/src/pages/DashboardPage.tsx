import { useEffect, useState } from "react";
import Header from "../components/Header";
import QuoteCard from "../components/QuoteCard";
import { getQuoteRequests } from "../api/quotes";
import type { QuoteRequest } from "../types/quote";

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadQuotes() {
      try {
        const data = await getQuoteRequests();
        setQuotes(data);
      } catch {
        setErrorMessage("Failed to load quote requests.");
      } finally {
        setIsLoading(false);
      }
    }

    loadQuotes();
  }, []);

  return (
    <>
      <Header />
      <main className="container page-content">
        <section className="hero hero-small">
          <h2>Quote Dashboard</h2>
          <p>Submitted quote requests from potential customers.</p>
        </section>

        {isLoading && <p>Loading quotes...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {!isLoading && !errorMessage && quotes.length === 0 && (
          <p>No quote requests yet.</p>
        )}

        <div className="quote-list">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </main>
    </>
  );
}