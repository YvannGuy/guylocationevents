"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const schema = yup.object().shape({
  fullName: yup.string().required("Nom et prénom sont requis"),
  email: yup.string().email("Email invalide").required("Email est requis"),
  telephone: yup
      .string()
      .matches(/^[0-9]+$/, "Le téléphone doit contenir uniquement des chiffres")
      .required("Téléphone est requis"),
  subject: yup.string().required("Objet de la demande est requis"),
  message: yup.string().required("Message est requis"),
  eventStartDate: yup.date().nullable().optional(),
  eventEndDate: yup.date().nullable().optional(),
  eventStartTime: yup.string().required("Veuillez sélectionner une heure"),
  eventEndTime: yup.string().required("Veuillez sélectionner une heure"),
  participants: yup
      .number()
      .typeError("Le nombre de participants doit être un chiffre")
      .positive("Le nombre doit être positif")
      .integer("Le nombre doit être entier")
      .required("Nombre de participants requis"),
  eventType: yup.string().required("Veuillez sélectionner un type d'événement"),
  technician: yup.string().required("Veuillez sélectionner une option"),
  deliveryOption: yup.string().required("Veuillez sélectionner une option"),
});

const InfoRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
            Réservez votre événement en quelques clics !
          </h2>

          {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-xl" />
                <p className="text-green-800 font-medium">Votre demande a été envoyée avec succès, vous recevrez une réponse sous 24h maximun !</p>
              </div>
          )}

          {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <FaTimesCircle className="text-red-600 text-xl" />
                <p className="text-red-800 font-medium">Une erreur est survenue, veuillez réessayer.</p>
              </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" {...register("fullName")} placeholder="Nom & Prénom" className="border p-3 rounded-lg w-full" />
            <input type="email" {...register("email")} placeholder="Email" className="border p-3 rounded-lg w-full" />
            <input type="tel" {...register("telephone")} placeholder="Téléphone" className="border p-3 rounded-lg w-full" />
            <input type="text" {...register("subject")} placeholder="Objet de la demande" className="border p-3 rounded-lg w-full" />
            <select {...register("eventType")} className="border p-3 rounded-lg w-full">
              <option value="">Type d'événement</option>
              <option value="mariage">Mariage</option>
              <option value="anniversaire">Anniversaire</option>
              <option value="conférence">Conférence</option>
              <option value="autre">Autre</option>
            </select>
            <input type="number" {...register("participants")} placeholder="Nombre de participants" className="border p-3 rounded-lg w-full" />
            <input type="date" {...register("eventStartDate")} min={today} className="border p-3 rounded-lg w-full" />
            <input type="time" {...register("eventStartTime")} className="border p-3 rounded-lg w-full" />
            <input type="date" {...register("eventEndDate")} min={today} className="border p-3 rounded-lg w-full" />
            <input type="time" {...register("eventEndTime")} className="border p-3 rounded-lg w-full" />
            <select {...register("technician")} className="border p-3 rounded-lg w-full">
              <option value="">Besoin d'un technicien ?</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
            <select {...register("deliveryOption")} className="border p-3 rounded-lg w-full">
              <option value="">Mode de récupération</option>
              <option value="livraison">Livraison</option>
              <option value="retrait">Retrait</option>
            </select>
            <textarea {...register("message")} placeholder="Message" rows="4" className="border p-3 rounded-lg w-full col-span-2"></textarea>
            <button type="submit" disabled={isSubmitting} className="col-span-2 bg-[#e27430] hover:bg-[#d56523] text-white py-3 rounded-lg">
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default InfoRequestForm;
