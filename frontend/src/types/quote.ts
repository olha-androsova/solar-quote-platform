export type QuoteRequestPayload = {
    name: string;
    email: string;
    phone: string;
    address: string;
    monthly_energy_bill: string;
  };
  
  export type QuoteRequest = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    monthly_energy_bill: string;
    estimated_monthly_savings: string;
    created_at: string;
  };