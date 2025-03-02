"use client";
import React, { useState } from "react";

const SendClientEmailForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contractFile, setContractFile] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);

  // Pour forcer la réinitialisation des champs file, on utilise un key
  const [fileKey, setFileKey] = useState(Date.now());

  const handleFileChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContractFile(null);
    setInvoiceFile(null);
    setFileKey(Date.now());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création d'un FormData pour gérer l'envoi du formulaire et des fichiers
    const formData = new FormData();
    formData.append("fullName", `${firstName} ${lastName}`);
    formData.append("email", email);
    if (contractFile) formData.append("contractFile", contractFile);
    if (invoiceFile) formData.append("invoiceFile", invoiceFile);

    try {
      const res = await fetch("/api/send-client-email", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        alert("E-mail envoyé avec succès !");
        resetForm();
      } else {
        alert("Erreur: " + result.message);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi : " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Envoyer l'E-mail de Confirmation
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppleInput
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
            />
            <AppleInput
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
            />
          </div>
          <AppleInput
            label="Adresse Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppleFileInput
              key={`contract-${fileKey}`}
              label="Contrat signé"
              onChange={(e) => handleFileChange(e, setContractFile)}
            />
            <AppleFileInput
              key={`invoice-${fileKey}`}
              label="Facture"
              onChange={(e) => handleFileChange(e, setInvoiceFile)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF7755] hover:bg-[#FF6644] text-white py-3.5 rounded-xl font-medium transition-all duration-200"
          >
            Envoyer l'E-mail
          </button>
        </form>
      </div>
    </div>
  );
};

const AppleInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7755] focus:border-transparent outline-none transition-all"
      {...props}
    />
  </div>
);

const AppleFileInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input type="file" className="w-full" {...props} />
  </div>
);

export default SendClientEmailForm;
