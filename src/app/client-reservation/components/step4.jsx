"use client";
import { useTranslations } from "next-intl";

export default function Step4({ onPrev, onNext }) {
  const t = useTranslations();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        {t("Étape 4 : Empreinte Bancaire via Swikly")}
      </h2>
      <p className="mb-4 text-gray-600">
        {t("Veuillez sélectionner un montant pour l'empreinte bancaire")}.
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          200 €
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          500 €
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          1000 €
        </button>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          {t("Retour")}
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-[#e27430] hover:bg-[#e27430] text-white rounded transition"
        >
          {t("Suivant")}
        </button>
      </div>
    </section>
  );
}
