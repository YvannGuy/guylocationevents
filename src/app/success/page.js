"use client";
import React, { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function sanitizeFilename(filename) {
  return filename
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_\-\.]/g, '');
}

export default function SuccessPage() {
  const [idFile, setIdFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Références pour accéder aux éléments input
  const idFileInputRef = useRef(null);
  const addressFileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!idFile || !addressFile) {
      setMessage('Veuillez sélectionner les deux fichiers.');
      return;
    }
    setUploading(true);
    
    const sanitizedIdName = sanitizeFilename(idFile.name);
    const sanitizedAddressName = sanitizeFilename(addressFile.name);
    
    const idFilePath = `files_form/id_${Date.now()}_${sanitizedIdName}`;
    const addressFilePath = `files_form/address_${Date.now()}_${sanitizedAddressName}`;
    
    const { error: idError } = await supabase.storage.from('documents').upload(idFilePath, idFile);
    if (idError) {
      setMessage("Erreur lors du téléversement de la carte d'identité : " + idError.message);
      setUploading(false);
      return;
    }
    
    const { error: addressError } = await supabase.storage.from('documents').upload(addressFilePath, addressFile);
    if (addressError) {
      setMessage("Erreur lors du téléversement du justificatif de domicile : " + addressError.message);
      setUploading(false);
      return;
    }
    
    setMessage('Documents téléversés avec succès !');
    setIdFile(null);  
    setAddressFile(null);  
    setUploading(false);

    // Réinitialiser les champs de fichiers visuellement
    idFileInputRef.current.value = null;
    addressFileInputRef.current.value = null;

    // Redirection automatique vers la page de signature du contrat après 2 secondes
    setTimeout(() => {
      window.location.href = "https://www.guylocationevents.com/signature-contrat";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        
        {/* En-tête avec titre et barre de progression */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Étape 2 : téléchargement de vos documents
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#E27431] h-2.5 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">Félicitations pour votre paiement !</h1>
            <p className="text-gray-600 text-lg">Vous pouvez désormais téléverser vos pièces justificatives.</p>
            
            <p className="text-gray-600 text-sm font-semibold">Respect du RGPD :</p>
            <p className="text-gray-600 text-sm">
              Nous respectons les exigences légales en matière de protection des données personnelles (RGPD). Vos documents sont sécurisés et ne seront utilisés que dans le cadre de votre réservation.
            </p>
            
            <p className="text-gray-600 text-sm font-semibold">Sécurité de votre réservation :</p>
            <p className="text-gray-600 text-sm">
              Afin de valider votre réservation, nous vous demandons de fournir une copie de votre carte d'identité ainsi qu'un justificatif de domicile. Ces documents nous permettent de vérifier votre identité et de garantir la bonne utilisation de nos équipements.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
              <label className="block text-sm font-medium text-gray-700">Carte d'identité</label>
              <input
                ref={idFileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdFile(e.target.files[0])}
                className="mt-1 block w-full"
              />
            </div>
            <div className="p-4 border rounded-lg shadow-sm bg-gray-100">
              <label className="block text-sm font-medium text-gray-700">Justificatif de domicile</label>
              <input
                ref={addressFileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setAddressFile(e.target.files[0])}
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-[#E27431] hover:bg-opacity-80 text-white py-3 rounded-xl mt-6"
          >
            {uploading ? 'Téléversement en cours...' : 'Téléverser mes documents'}
          </button>
          {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}
