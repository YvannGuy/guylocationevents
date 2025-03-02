"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function UrgenceLocation() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    eventType: "",
    startDateTime: "",
    endDateTime: "",
    equipmentNeeded: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = t("Nom complet est requis");
    if (!formData.phone) newErrors.phone = t("Téléphone est requis");
    if (!formData.address) newErrors.address = t("Adresse est requise");
    if (!formData.eventType)
      newErrors.eventType = t("Type d'événement est requis");
    if (!formData.startDateTime)
      newErrors.startDateTime = t("Date et heure d'aller sont requises");
    if (!formData.endDateTime)
      newErrors.endDateTime = t("Date et heure de retour sont requises");
    if (!formData.equipmentNeeded)
      newErrors.equipmentNeeded = t("Équipement nécessaire est requis");
    if (!formData.acceptTerms)
      newErrors.acceptTerms = t("Vous devez accepter les conditions");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Échec de l'envoi");

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        eventType: "",
        startDateTime: "",
        endDateTime: "",
        equipmentNeeded: "",
        acceptTerms: false,
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Message de statut */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {t("Demande envoyée Un conseiller vous contactera immédiatement")}
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {t("Erreur lors de l'envoi, veuillez réessayer")}
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#e27431] mb-4">
            🚨 {t("Location dUrgence 21h30 00h00")}
          </h1>
          <p className="text-xl text-gray-700">
            {t(
              "Panique technique ? Besoin last minute Nous sommes là pour répondre à vos besoins en location d'équipements sono, vidéo et photobooth pour mariages, concerts, conférences et autres événements"
            )}
          </p>
        </div>

        <div className="bg-[#fcece5] p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-[#e27431] mb-4">
            {t("Conditions de location en urgence")}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-[#e27431] mr-2">⏱</span>
              <p>
                <strong>{t("Intervention rapide")}:</strong>{" "}
                {t("Réponse garantie sous 30 minutes")}
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-[#e27431] mr-2">💶</span>
              <p>
                <strong>{t("Majoration")}:</strong> {t("sur le tarif standard")}
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-[#e27431] mr-2">📞</span>
              <p>
                <strong>{t("Disponibilité")}:</strong>{" "}
                {t("Uniquement par téléphone")}
                {t("au")}{" "}
                <a href="tel:++33651084994" className="font-bold underline">
                  +33 6 51 08 49 94
                </a>
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {t("Nom complet")} *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e27431] focus:border-[#e27431]"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {t("Téléphone")} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e27431] focus:border-[#e27431]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {t("Adresse")} *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e27431] focus:border-[#e27431]"
                placeholder="Votre adresse complète"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {t("Type d'événement")} *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">-- {t("Sélectionnez")} --</option>
                <option>{t("Mariage")}</option>
                <option>{t("Concert")}</option>
                <option>{t("Conférence")}</option>
                <option>{t("Photobooth")}</option>
                <option>{t("Autre")}</option>
              </select>
              {errors.eventType && (
                <p className="text-red-500 text-sm">{errors.eventType}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                {t("Date et heure d'aller")} *
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.startDateTime && (
                <p className="text-red-500 text-sm">{errors.startDateTime}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                {t("Date et heure de retour")} *
              </label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.endDateTime && (
                <p className="text-red-500 text-sm">{errors.endDateTime}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                {t("Équipement nécessaire")} *
              </label>
              <textarea
                name="equipmentNeeded"
                value={formData.equipmentNeeded}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg h-32"
                placeholder="Décrivez précisément votre besoin (sono, vidéo, photobooth, durée, lieu...)"
              />
              {errors.equipmentNeeded && (
                <p className="text-red-500 text-sm">{errors.equipmentNeeded}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="mr-2 rounded text-[#e27431] focus:ring-[#e27431]"
                />
                <span className="text-gray-700">
                  {t(
                    "J'accepte la majoration de 50% et les conditions associées"
                  )}
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-[#e27431] text-white py-3 px-6 rounded-lg hover:bg-[#d06528] transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? `${t("Envoi en cours")}...`
              : t("Envoyer la demande d'urgence")}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          {t(
            "Un conseiller vous rappellera immédiatement après validation du formulaire"
          )}
        </p>
      </div>
    </section>
  );
}
