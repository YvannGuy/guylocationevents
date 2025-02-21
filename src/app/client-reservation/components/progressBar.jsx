"use client";

import { useTranslations } from "next-intl";

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;
  const t = useTranslations();

  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-[#e27430] h-2 rounded transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-2 text-center">
        {t("Étape")} {currentStep} {t("sur")} {totalSteps}
      </p>
    </div>
  );
}
