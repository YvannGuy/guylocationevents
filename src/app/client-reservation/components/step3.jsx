"use client";
export default function Step3({ onPrev, onNext }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        Étape 3 : Upload des documents 📄
      </h2>
      <p className="mb-4 text-gray-600">
        Veuillez télécharger les documents requis pour la location.
      </p>
      <div className="mb-4">
        <label className="block font-medium">Carte d'identité :</label>
        <input type="file" className="w-full border rounded px-3 py-2 mt-1" />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Justificatif de domicile :</label>
        <input type="file" className="w-full border rounded px-3 py-2 mt-1" />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-[#e27430] hover:bg-[#e27430] text-white rounded  transition"
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
