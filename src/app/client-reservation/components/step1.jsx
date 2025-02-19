"use client";
import { useState } from "react";

export default function Step1({ onNext }) {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    siret: "",
    optionRetrait: "retrait",
    packs: [],
    startDate: "",
    endDate: "",
    optionTechnicien: false,
    cgu: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Le nom de l'entreprise est requis.";
    }
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise.";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Le téléphone doit contenir 10 chiffres.";
    }
    if (!formData.siret.trim()) {
      newErrors.siret = "Le numéro SIRET est requis.";
    } else if (!/^\d{14}$/.test(formData.siret)) {
      newErrors.siret = "Le numéro SIRET doit contenir 14 chiffres.";
    }
    if (!formData.startDate) {
      newErrors.startDate = "La date de début est requise.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "La date de fin est requise.";
    } else if (formData.endDate < formData.startDate) {
      newErrors.endDate = "La date de fin doit être après la date de début.";
    }
    if (!formData.cgu) {
      newErrors.cgu = "Vous devez accepter les conditions générales.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData); // Proceed to the next step if validation passes
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        Étape 1 : Formulaire de réservation 📋
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block font-medium">Nom de l'entreprise :</label>
          <input
            type="text"
            name="companyName"
            placeholder="Nom de l'entreprise"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.companyName ? "border-red-500" : ""
            }`}
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Adresse :</label>
          <input
            type="text"
            name="address"
            placeholder="Adresse de l'entreprise"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.address ? "border-red-500" : ""
            }`}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Postal Code and City */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Code postal :</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Code postal"
              className={`w-full border rounded px-3 py-2 mt-1 ${
                errors.postalCode ? "border-red-500" : ""
              }`}
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block font-medium">Ville :</label>
            <input
              type="text"
              name="city"
              placeholder="Ville"
              className={`w-full border rounded px-3 py-2 mt-1 ${
                errors.city ? "border-red-500" : ""
              }`}
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email professionnel :</label>
          <input
            type="email"
            name="email"
            placeholder="Email professionnel"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.email ? "border-red-500" : ""
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Téléphone professionnel :</label>
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone professionnel"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.phone ? "border-red-500" : ""
            }`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* SIRET */}
        <div>
          <label className="block font-medium">Numéro SIRET :</label>
          <input
            type="text"
            name="siret"
            placeholder="Numéro SIRET de l'entreprise"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.siret ? "border-red-500" : ""
            }`}
            value={formData.siret}
            onChange={handleChange}
          />
          {errors.siret && (
            <p className="text-red-500 text-sm mt-1">{errors.siret}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium">Date de début :</label>
          <input
            type="date"
            name="startDate"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.startDate ? "border-red-500" : ""
            }`}
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium">Date de fin :</label>
          <input
            type="date"
            name="endDate"
            className={`w-full border rounded px-3 py-2 mt-1 ${
              errors.endDate ? "border-red-500" : ""
            }`}
            value={formData.endDate}
            onChange={handleChange}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>

        {/* CGU */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="cgu"
              checked={formData.cgu}
              onChange={handleChange}
              className={`mr-2 ${errors.cgu ? "border-red-500" : ""}`}
            />
            J’accepte les{" "}
            <a
              href="#"
              target="_blank"
              className="text-blue-600 underline ml-1"
            >
              conditions générales
            </a>
          </label>
          {errors.cgu && (
            <p className="text-red-500 text-sm mt-1">{errors.cgu}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#e27430] hover:bg-[#e27430] text-white rounded transition"
          >
            Suivant
          </button>
        </div>
      </form>
    </section>
  );
}
