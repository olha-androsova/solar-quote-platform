import type { QuoteRequest, QuoteRequestPayload } from "../types/quote";

const API_BASE_URL = "http://localhost:8000/api";

export async function createQuoteRequest(
  payload: QuoteRequestPayload
): Promise<QuoteRequest> {
  const response = await fetch(`${API_BASE_URL}/quotes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw data ?? { detail: "Failed to create quote request." };
  }

  return data;
}

export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  const response = await fetch(`${API_BASE_URL}/quotes/`);

  if (!response.ok) {
    throw new Error("Failed to fetch quote requests.");
  }

  return response.json();
}