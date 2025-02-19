"use client";
export default function Step2({ formData, onPrev, onNext }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        Étape 2 : Récapitulatif & Paiement 💳
      </h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">
          Récapitulatif des informations
        </h3>
        <div className="space-y-4">
          <p>
            <strong>Nom de l'entreprise :</strong> {formData.companyName}
          </p>
          <p>
            <strong>Adresse :</strong> {formData.address}
          </p>
          <p>
            <strong>Code postal :</strong> {formData.postalCode}
          </p>
          <p>
            <strong>Ville :</strong> {formData.city}
          </p>
          <p>
            <strong>Email :</strong> {formData.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {formData.phone}
          </p>
          <p>
            <strong>Option de retrait :</strong> {formData.optionRetrait}
          </p>
          <p>
            <strong>Date de début :</strong> {formData.startDate}
          </p>
          <p>
            <strong>Date de fin :</strong> {formData.endDate}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-[#e27430] hover:bg-[#e27430] text-white rounded transition"
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
