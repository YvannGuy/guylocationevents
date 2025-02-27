// src/app/cancel/page.js
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center space-y-6">
          {/* Icône d'erreur stylisée */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-[#e27431]/10 rounded-full">
            <svg 
              className="w-8 h-8 text-[#e27431]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Titre et texte */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Paiement annulé
            </h1>
            <p className="text-gray-600 text-lg">
              Aucun montant n'a été débité. Vous pouvez réessayer à tout moment.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="w-full bg-[#e27431] hover:bg-[#d1652a] text-white py-3.5 rounded-xl font-medium 
                         transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Retour à l'accueil</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>

            <a
              href="mailto:hello@guylocationevents.com"
              className="text-[#e27431] hover:text-[#d1652a] font-medium transition-colors duration-200"
            >
              Contacter le support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}