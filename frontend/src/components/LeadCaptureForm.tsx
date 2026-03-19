import { useState } from "react";
import { createQuoteRequest } from "../api/quotes";

type LeadCaptureFormProps = {
  monthlyBill: string;
};

export default function LeadCaptureForm({
  monthlyBill,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
  
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  
    setFieldErrors((current) => {
      const updated = { ...current };
      delete updated[name];
      return updated;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      await createQuoteRequest({
        ...formData,
        monthly_energy_bill: monthlyBill,
      });

      setSuccessMessage("Your quote request has been submitted.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      if (error && typeof error === "object") {
        setFieldErrors(error as Record<string, string[]>);
      } else {
        setErrorMessage("Something went wrong while submitting your request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card">
      <h2>Get a personalized quote</h2>
      <p>Leave your details and we’ll get back to you with a custom offer.</p>

      <form onSubmit={handleSubmit} className="quote-form">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {fieldErrors.name && <p className="field-error">{fieldErrors.name[0]}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {fieldErrors.email && <p className="field-error">{fieldErrors.email[0]}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {fieldErrors.phone && (
          <p className="field-error">{fieldErrors.phone[0]}</p>
        )}

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {fieldErrors.address && (
          <p className="field-error">{fieldErrors.address[0]}</p>
        )}

        <button type="submit" disabled={isSubmitting || !monthlyBill}>
          {isSubmitting ? "Submitting..." : "Submit request"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}