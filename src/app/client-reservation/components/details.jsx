"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

const InfoRequestForm = () => {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const schema = yup.object().shape({
    clientType: yup.string().required("Ce champ est requis"),

    fullName: yup
      .string()
      .when(["clientType"], ([clientType], schema) =>
        clientType === "particulier"
          ? schema.required(t("Nom et prénom sont requis"))
          : schema.nullable().optional()
      ),

    companyName: yup
      .string()
      .when(["clientType"], ([clientType], schema) =>
        clientType === "professionnel"
          ? schema.required(t("Nom de l'entreprise est requis"))
          : schema.nullable().optional()
      ),

    siret: yup
      .string()
      .when(["clientType"], ([clientType], schema) =>
        clientType === "professionnel"
          ? schema.required(t("Numéro SIRET est requis"))
          : schema.nullable().optional()
      ),

    companyAddress: yup
      .string()
      .when(["clientType"], ([clientType], schema) =>
        clientType === "professionnel"
          ? schema.required(t("Adresse de l'entreprise est requise"))
          : schema.nullable().optional()
      ),

    email: yup.string().email("Email invalide").required(t("Email est requis")),
    telephone: yup.string().required(t("Téléphone est requis")),
    subject: yup.string().required(t("Objet de la demande est requis")),
    message: yup.string().required(t("Message est requis")),
    eventStartDate: yup.date().nullable().optional(),
    eventEndDate: yup.date().nullable().optional(),
    participants: yup
      .number()
      .positive(t("Doit être un nombre positif"))
      .nullable()
      .optional(),
    eventType: yup.string().nullable().optional(),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientType: "particulier",
    },
  });

  const clientType = watch("clientType");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        console.error("Erreur d'envoi :", result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f1f1f1] pt-20 pb-20">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#e27430]">
          {t("Obtenez votre devis personnalisé")}
        </h2>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <div>
              <p className="font-medium text-green-800">
                {t("Message envoyé avec succès")} !
              </p>
              <p className="text-sm text-green-700">
                {t("Nous traitons votre demande et vous répondrons sous 24h")}.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <FaTimesCircle className="text-red-600 text-xl" />
            <div>
              <p className="font-medium text-red-800">{t("Erreur d'envoi")}</p>
              <p className="text-sm text-red-700">
                {t("Veuillez réessayer ou nous contacter directement")}.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <p className="font-medium mb-2">{t("Je suis")} :</p>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("clientType")}
                  value="particulier"
                  className="mr-2"
                />
                {t("Particulier")}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("clientType")}
                  value="professionnel"
                  className="mr-2"
                />
                {t("Professionnel")}
              </label>
            </div>
          </div>

          {clientType === "particulier" && (
            <div>
              <label className="block font-medium">{t("Nom & Prénom")} :</label>
              <input
                type="text"
                {...register("fullName")}
                placeholder={t("Votre nom et prénom")}
                className="w-full border rounded px-3 py-2 mt-1"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          )}

          {clientType === "professionnel" && (
            <div>
              <label className="block font-medium">
                {t("Nom de l'entreprise")} :
              </label>
              <input
                type="text"
                {...register("companyName")}
                placeholder={t("Nom de l'entreprise")}
                className="w-full border rounded px-3 py-2 mt-1"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block font-medium">{t("Email")} :</label>
            <input
              type="email"
              {...register("email")}
              placeholder={t("Votre email")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 text-white rounded-lg transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#e27430] hover:bg-[#d56523] hover:shadow-md"
              }`}
            >
              {isSubmitting
                ? `${t("Envoi en cours")}...`
                : t("Envoyer ma demande")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoRequestForm;
