"use client";

import { useTranslations } from "next-intl";

export default function Modal({ reservationRef, onClose }) {
  const t = useTranslations();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">
          {t("Merci pour votre location")}!
        </h3>
        <p className="mb-4">
          {t("Votre contrat a été signé avec succès")}.
          <br />
          {t(
            "Vous recevrez sous peu par email votre contrat signé ainsi que les informations récapitulatives de votre réservation"
          )}
          .
          <br />
          <br />
          <strong>{t("Numéro de référence")} :</strong>{" "}
          <span>{reservationRef}</span>
        </p>
        <button
          onClick={onClose}
          className="w-full text-white py-2 rounded bg-[#e27430] hover:bg-[#e27430] transition"
        >
          {t("Fermer")}
        </button>
      </div>
    </div>
  );
}
