// /app/redirection-caution/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();
  // On attend de recevoir les paramètres depuis l'URL :
  // session_id du paiement principal (pour info), customer_id et deposit
  const { session_id, customer_id, deposit } = router.query;

  useEffect(() => {
    if (session_id && customer_id && deposit) {
      // Appel à l'API pour créer la session de caution
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
            // Rediriger automatiquement vers la session de caution
            window.location.href = data.url;
          }
        })
        .catch((err) => console.error("Erreur création session caution:", err));
    }
  }, [session_id, customer_id, deposit]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Paiement principal effectué</h1>
      <p>Nous préparons votre autorisation de caution, veuillez patienter...</p>
    </div>
  );
}
