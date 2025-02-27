// /app/success-payment/page.jsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPaymentPage() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const deposit = searchParams.get("deposit");

  useEffect(() => {
    if (customer_id && deposit) {
      // Appel à l'endpoint pour créer la session de caution
      fetch("/api/create-deposit-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deposit: parseInt(deposit, 10),
          customerId: customer_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            // Redirige vers la session de caution
            window.location.href = data.url;
          } else {
            console.error("Aucune URL reçue pour la session de caution");
          }
        })
        .catch((err) => console.error("Erreur création session caution:", err));
    }
  }, [customer_id, deposit]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Paiement principal effectué</h1>
      <p>Nous préparons l'autorisation de caution, veuillez patienter...</p>
    </div>
  );
}
