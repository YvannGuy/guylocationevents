"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";
import SignatureCanvas from "react-signature-canvas";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction utilitaire pour convertir une DataURL en Uint8Array
const dataURLtoUint8Array = (dataURL) => {
  const base64 = dataURL.split(",")[1];
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const ContractPage = () => {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const sigCanvas = useRef(null);
  const contractPdfRef = useRef(null);

  // Générer le PDF en y intégrant la signature, le nom et le champ "Fait à :"
  const generateSignedContract = async (signatureDataUrl, clientName, location) => {
    const pdfUrl = "/pdf/Assurance_shurgard.pdf";
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    const signatureBytes = dataURLtoUint8Array(signatureDataUrl);
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    
    const pages = pdfDoc.getPages();
    const signatureWidth = 150;
    const signatureHeight = 50;
    const signatureX = 50;
    const signatureY = 50;
    const textX = 50;
    const nameTextY = signatureY + signatureHeight + 10;
    const locationTextY = nameTextY + 20;

    pages.forEach((page) => {
      page.drawImage(signatureImage, {
        x: signatureX,
        y: signatureY,
        width: signatureWidth,
        height: signatureHeight,
      });
      
      page.drawText(clientName, {
        x: textX,
        y: nameTextY,
        size: 12,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Fait à : ${location}`, {
        x: textX,
        y: locationTextY,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
  };

  // Upload vers Supabase Storage
  const uploadContractToSupabase = async (contractBlob) => {
    const fileName = `contract_${Date.now()}.pdf`;
    const { error } = await supabase.storage
      .from("contracts")
      .upload(fileName, contractBlob, { contentType: "application/pdf" });

    if (error) {
      throw new Error("Erreur d'upload : " + error.message);
    }
    return fileName;
  };

  // Gestion de la signature et redirection
  const handleSignature = async () => {
    if (clientName.trim() === "" || location.trim() === "") {
      setMessage("Veuillez saisir votre nom/prénom et le lieu (Fait à :).");
      return;
    }

    if (!sigCanvas.current.isEmpty()) {
      try {
        setUploading(true);
        setMessage("");

        const signatureDataUrl = sigCanvas.current.toDataURL("image/png");
        const signedPdfBlob = await generateSignedContract(signatureDataUrl, clientName, location);
        await uploadContractToSupabase(signedPdfBlob);
        
        setShowModal(true);
        
        setTimeout(() => {
          window.location.href = "https://www.guylocationevents.com";
        }, 3000);
      } catch (error) {
        setMessage("Erreur : " + error.message);
      } finally {
        setUploading(false);
      }
    } else {
      setMessage("Veuillez ajouter votre signature.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-4xl border border-gray-100">
        {/* En-tête avec titre et barre de progression */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Étape finale : signature de votre contrat
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#E27431] h-2.5 rounded-full"
              style={{ width: "95%" }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-center text-gray-900">Contrat à signer</h1>
        <div className="my-6">
          <iframe
            src="/pdf/Assurance_shurgard.pdf"
            width="100%"
            height="600px"
            ref={contractPdfRef}
            title="Contrat"
          />
        </div>

        <div className="space-y-4 mt-6">
          <div className="signature-section">
            <p className="text-sm text-gray-600 mb-2">Entrez votre nom et prénom :</p>
            <input
              type="text"
              placeholder="Votre nom et prénom"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="signature-section">
            <p className="text-sm text-gray-600 mb-2">Entrez le lieu (Fait à :) :</p>
            <input
              type="text"
              placeholder="Fait à :"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="signature-section">
            <p className="text-sm text-gray-600 mb-2">Signez dans la zone ci-dessous :</p>
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                width: 500,
                height: 200,
                className: "signature-canvas border rounded-lg bg-white",
              }}
            />
            <button
              onClick={() => sigCanvas.current.clear()}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Effacer la signature
            </button>
          </div>
          <button
            onClick={handleSignature}
            disabled={uploading}
            className="w-full bg-[#E27431] hover:bg-opacity-80 text-white py-3 rounded-xl mt-6 disabled:opacity-50"
          >
            {uploading ? "Envoi en cours..." : "Confirmer la signature"}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Modal de confirmation style Apple */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E27431] text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-[#E27431] mb-4">Contrat signé avec succès !</h2>
            <p className="text-gray-700">
              Vous recevrez un mail récapitulatif avec la facture et le contrat signé.
            </p>
            <p className="mt-4 text-gray-700">Vous allez être redirigé vers l'accueil...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractPage;
