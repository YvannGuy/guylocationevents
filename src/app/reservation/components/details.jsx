"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

const InfoRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const t = useTranslations();

  const schema = yup.object().shape({
    fullName: yup.string().required(t("Nom et prénom sont requis")),
    email: yup
      .string()
      .email(t("Email invalide"))
      .required(t("Email est requis")),
    telephone: yup
      .string()
      .matches(
        /^[0-9]+$/,
        t("Le téléphone doit contenir uniquement des chiffres")
      )
      .required(t("Téléphone est requis")),
    subject: yup.string().required(t("Objet de la demande est requis")),
    message: yup.string().required(t("Message est requis")),
    eventStartDate: yup.date().nullable().optional(),
    eventEndDate: yup.date().nullable().optional(),
    eventStartTime: yup.string().required(t("Veuillez sélectionner une heure")),
    eventEndTime: yup.string().required(t("Veuillez sélectionner une heure")),
    participants: yup
      .number()
      .typeError(t("Le nombre de participants doit être un chiffre"))
      .positive(t("Le nombre doit être positif"))
      .integer(t("Le nombre doit être entier"))
      .required(t("Nombre de participants requis")),
    eventType: yup
      .string()
      .required(t("Veuillez sélectionner un type d'événement")),
    technician: yup.string().required(t("Veuillez sélectionner une option")),
    deliveryOption: yup
      .string()
      .required(t("Veuillez sélectionner une option")),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const today = new Date().toISOString().split("T")[0];

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
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f1f1f1] pt-20 pb-20 flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#e27430] text-center">
          {t("Book your event in a few clicks")} !
        </h2>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <p className="text-green-800 font-medium">
              {t(
                "Votre demande a été envoyée avec succès, vous recevrez une réponse sous 24h maximun"
              )}{" "}
              !
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <FaTimesCircle className="text-red-600 text-xl" />
            <p className="text-red-800 font-medium">
              {t("Une erreur est survenue veuillez réessayer")}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            {...register("fullName")}
            placeholder={t("Nom & Prénom")}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="email"
            {...register("email")}
            placeholder={t("Email")}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="tel"
            {...register("telephone")}
            placeholder={t("Téléphone")}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            {...register("subject")}
            placeholder={t("Objet de la demande")}
            className="border p-3 rounded-lg w-full"
          />
          <select
            {...register("eventType")}
            className="border p-3 rounded-lg w-full"
          >
            <option value="">{t("Type dévénement")}</option>
            <option value="mariage">{t("Mariage")}</option>
            <option value="anniversaire">{t("Anniversaire")}</option>
            <option value="conférence">{t("Conférence")}</option>
            <option value="autre">{t("Autre")}</option>
          </select>
          <input
            type="number"
            {...register("participants")}
            placeholder={t("Nombre de participants")}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="date"
            {...register("eventStartDate")}
            min={today}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="time"
            {...register("eventStartTime")}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="date"
            {...register("eventEndDate")}
            min={today}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="time"
            {...register("eventEndTime")}
            className="border p-3 rounded-lg w-full"
          />
          <select
            {...register("technician")}
            className="border p-3 rounded-lg w-full"
          >
            <option value="">{t("Besoin dun technicien")}</option>
            <option value="oui">{t("Oui")}</option>
            <option value="non">{t("Non")}</option>
          </select>
          <select
            {...register("deliveryOption")}
            className="border p-3 rounded-lg w-full"
          >
            <option value="">{t("Mode de récupération")}</option>
            <option value="livraison">{t("Livraison")}</option>
            <option value="retrait">{t("Retrait")}</option>
          </select>
          <textarea
            {...register("message")}
            placeholder={t("Message")}
            rows="4"
            className="border p-3 rounded-lg w-full col-span-2"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="col-span-2 bg-[#e27430] hover:bg-[#d56523] text-white py-3 rounded-lg"
          >
            {isSubmitting
              ? `${t("Envoi en cours")}...`
              : t("Envoyer ma demande")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoRequestForm;
