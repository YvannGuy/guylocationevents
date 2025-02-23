"use client";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function Step5({ onPrev, onFinish }) {
  const canvasRef = useRef(null);
  const t = useTranslations();
  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        {t("Étape 5 Signature du Contrat")} 📝
      </h2>
      <canvas
        ref={canvasRef}
        className="w-full h-48 border border-gray-300"
        style={{ touchAction: "none" }}
      ></canvas>
      <button
        onClick={handleClearSignature}
        className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
      >
        {t("Effacer la signature")}
      </button>
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          {t("Retour")}
        </button>
        <button
          onClick={onFinish}
          className="px-4 py-2 bg-[#e27430] hover:bg-[#e27430] text-white rounded transition"
        >
          {t("Terminer et recevoir le contrat signé")}
        </button>
      </div>
    </section>
  );
}
