"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const SendFinalEmailForm = () => {
  const [password, setPassword] = useState("");
  const t = useTranslations();
  const [authenticated, setAuthenticated] = useState(false);

  // Données existantes
  const packs = [
    { id: "pack1", name: t("Pack Standard"), price: 8000, icon: "📋", stripePriceId: "price_1QwVRfGKCVzDExz8KO4ujxPa" },
    { id: "pack2", name: t("Pack Essentiel"), price: 10500, icon: "✅", stripePriceId: "price_1QwVT4GKCVzDExz87s7E1Mei" },
    { id: "pack3", name: t("Pack Confort"), price: 12500, icon: "🛋️", stripePriceId: "price_1QwVU1GKCVzDExz8tfhjhIeX" },
    { id: "pack4", name: t("Pack Premium"), price: 13500, icon: "💎", stripePriceId: "price_1QwVUxGKCVzDExz8WsQ3j9wu" },
    { id: "pack5", name: t("Pack Prestige"), price: 17500, icon: "👑", stripePriceId: "price_1QwVWOGKCVzDExz8I4Gd3P5F" },
    { id: "pack6", name: t("Pack Grand Événement"), price: 19500, icon: "🎉", stripePriceId: "price_1QwVXKGKCVzDExz8SNRzMiE9" },
    { id: "pack7", name: t("Pack Vidéo"), price: 5000, icon: "🎥", stripePriceId: "price_1QwVYCGKCVzDExz8wlZ4GIlE" },
    { id: "pack8", name: t("Photobooth ring"), price: 31000, icon: "📸", stripePriceId: "price_1R2JPHGKCVzDExz8MJV7kSq9" },
    { id: "pack9", name: t("Photobooth print"), price: 62000, icon: "📸", stripePriceId: "price_1R2JOdGKCVzDExz8q3BvFaNb" },
    { id: "pack10", name: t("Pack Sono + Dj booth"), price: 15500, icon: "📋", stripePriceId: "price_1RvzH0GKCVzDExz8rTZDC6wd" },
    { id: "pack11", name: t("Pack Premium Basic"), price: 11800, icon: "💎", stripePriceId: "price_1S2dBjGKCVzDExz8LLDIJ6EN" },
    { id: "pack12", name: t("Remise - 30 euros"), price: 5000, icon: "💰", stripePriceId: "price_1S2pGLGKCVzDExz8wBl6XpRw" },
  ];

  const options = [
    { id: "technician-installation", name: t("Technicien installation"), price: 8000, icon: "🔧", stripePriceId: "price_1QwVatGKCVzDExz8XH5xNbvL" },
    { id: "technician-management", name: t("Technicien gestion"), price: 5000, icon: "🛠️", hourly: true, stripePriceId: "price_1QwVcVGKCVzDExz8VxxLgCt8" },
    { id: "delivery-paris", name: t("Livraison Paris intra-muros"), price: 4000, icon: "🚚", stripePriceId: "price_1QwVdCGKCVzDExz8Va97K0IV" },
    { id: "delivery-idf", name: t("Livraison Île-de-France"), price: 8000, icon: "🚚", stripePriceId: "price_1QwVdeGKCVzDExz85oQIiWSw" },
    { id: "micro-wired", name: t("Micro filaire"), price: 1000, icon: "🎤", quantity: true, stripePriceId: "price_1QwVe2GKCVzDExz876SePe0h" },
    { id: "micro-wireless", name: t("Micro sans fil"), price: 2000, icon: "🎙️", quantity: true, stripePriceId: "price_1QwVeHGKCVzDExz8GN7Hwn9s" },
    { id: "insurance", name: t("assurance dégradation"), price: 4500, icon: "🎙️", quantity: true, stripePriceId: "price_1R2JTcGKCVzDExz8ypv6QhsC" },
    { id: "delivery", name: t("Livraison installation et reprise"), price: 18000, icon: "🎙️", quantity: true, stripePriceId: "price_1R2JUiGKCVzDExz8MHwVjX1Q" },
    { id: "delivery-premium", name: t("Livraison premium"), price: 25000, icon: "🎙️", quantity: true, stripePriceId: "price_1R2JVcGKCVzDExz87KpLBl1L" },
    { id: "graphic-design", name: t("Graphiste dedié"), price: 4500, icon: "🎙️", quantity: true, stripePriceId: "price_1R2JWtGKCVzDExz8g5kQZdap" },
  ];

  // États du formulaire
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedPacks, setSelectedPacks] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [packQuantities, setPackQuantities] = useState({});
  const [optionQuantities, setOptionQuantities] = useState({});
  const [technicianHours, setTechnicianHours] = useState(1);
  const [participants, setParticipants] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deposit, setDeposit] = useState(50000); // caution

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert(t("Mot de passe incorrect !"));
    }
  };

  /**
   * Génère un numéro de facture incrémental stocké dans localStorage.
   * Si aucun numéro n'est enregistré, on démarre à "000",
   * puis la prochaine facture sera "001", "002", etc.
   */
  const generateInvoiceNumber = () => {
    const lastInvoice = localStorage.getItem("lastInvoiceNumber");
    if (lastInvoice === null) {
      localStorage.setItem("lastInvoiceNumber", "000");
      return "000";
    } else {
      const newInvoice = (parseInt(lastInvoice, 10) + 1).toString().padStart(3, "0");
      localStorage.setItem("lastInvoiceNumber", newInvoice);
      return newInvoice;
    }
  };

  // Calcule la liste d'articles (packs + options) pour afficher dans le tableau
  const getAllItemsForInvoice = () => {
    const items = [];

    // Packs
    selectedPacks.forEach((packId) => {
      const pack = packs.find((p) => p.id === packId);
      if (pack) {
        const quantity = packQuantities[packId] || 1;
        const linePrice = pack.price * quantity;
        items.push({
          description: pack.name,
          price: pack.price,
          quantity,
          total: linePrice,
        });
      }
    });

    // Options
    selectedOptions.forEach((optionId) => {
      const option = options.find((o) => o.id === optionId);
      if (option) {
        let quantity = 1;
        let linePrice = option.price;
        if (option.hourly) {
          quantity = technicianHours;
          linePrice = option.price * technicianHours;
        } else if (option.quantity) {
          quantity = optionQuantities[optionId] || 1;
          linePrice = option.price * quantity;
        }
        items.push({
          description: option.name,
          price: option.price,
          quantity,
          total: linePrice,
        });
      }
    });

    return items;
  };

  /**
   * Génère et télécharge la facture PDF avec les modifications suivantes :
   * - Remplacement du titre "FACTURE" par le logo en haut à gauche.
   * - Suppression de l'affichage du logo en haut à droite.
   * - Colonnes client / entreprise, date & heure de l'événement, TVA non applicable,
   *   caution affichée sans être incluse dans le total et numérotation progressive.
   */
  const generateInvoicePDF = async () => {
    const invoiceNumber = generateInvoiceNumber();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();

    // Chargement des polices
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Couleurs / marges
    const black = rgb(0, 0, 0);
    const gray = rgb(0.3, 0.3, 0.3);
    const lineGray = rgb(0.8, 0.8, 0.8);
    const leftMargin = 50;
    
    // Chargement du logo
    const logoUrl = "https://www.guylocationevents.com/images/logo.png";
    const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDims = logoImage.scale(0.25);
    
    // Remplacement du titre "FACTURE" par le logo en haut à gauche
    let currentY = height - logoDims.height - 20;
    page.drawImage(logoImage, {
      x: leftMargin,
      y: currentY,
      width: logoDims.width,
      height: logoDims.height,
    });
    
    // Facture n° + date (affichées en haut à droite)
    const invoiceInfoX = width - 200;
    page.drawText(`Facture n°${invoiceNumber}`, {
      x: invoiceInfoX,
      y: currentY,
      size: 12,
      font: fontRegular,
      color: gray,
    });
    currentY -= 20;
    const dateStr = new Date().toLocaleDateString("fr-FR");
    page.drawText(dateStr, {
      x: invoiceInfoX,
      y: currentY,
      size: 12,
      font: fontRegular,
      color: gray,
    });
    currentY -= 40;

    // Affichage en deux colonnes (client à gauche, entreprise à droite)
    let clientY = currentY;
    let enterpriseY = currentY;

    // Colonne client
    page.drawText(fullName, {
      x: leftMargin,
      y: clientY,
      size: 12,
      font: fontBold,
      color: black,
    });
    clientY -= 15;
    page.drawText(eventAddress || "Non renseignée", {
      x: leftMargin,
      y: clientY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    clientY -= 15;
    page.drawText(email || "Non renseignée", {
      x: leftMargin,
      y: clientY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    clientY -= 25;

    // Colonne entreprise (affichée en haut à droite)
    const enterpriseX = width - 250;
    page.drawText("GUY LOCATION EVENTS", {
      x: enterpriseX,
      y: enterpriseY,
      size: 12,
      font: fontBold,
      color: black,
    });
    enterpriseY -= 15;
    page.drawText("78 avenue des Champs Elysées, 75008 Paris", {
      x: enterpriseX,
      y: enterpriseY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    enterpriseY -= 15;
    page.drawText("SIRET : 79959617600021", {
      x: enterpriseX,
      y: enterpriseY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    enterpriseY -= 15;
    page.drawText("Téléphone : 06 51 08 49 94", {
      x: enterpriseX,
      y: enterpriseY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    enterpriseY -= 25;

    // Repositionnement pour la suite (on prend le point le plus bas des deux colonnes)
    currentY = Math.min(clientY, enterpriseY) - 20;

    // Ajout de la ligne "Date & Heure de l'événement"
    const eventPeriod =
      startDate && startTime && endDate && endTime
        ? `Du ${new Date(startDate).toLocaleDateString("fr-FR")} ${startTime} au ${new Date(endDate).toLocaleDateString("fr-FR")} ${endTime}`
        : "Non renseigné";
    page.drawText(`Date & Heure de l'événement: ${eventPeriod}`, {
      x: leftMargin,
      y: currentY,
      size: 11,
      font: fontRegular,
      color: gray,
    });
    currentY -= 20;

    // Ligne horizontale de séparation
    page.drawLine({
      start: { x: leftMargin, y: currentY },
      end: { x: width - leftMargin, y: currentY },
      thickness: 1,
      color: lineGray,
    });
    currentY -= 25;

    // Tableau : DESCRIPTION | PRIX | QUANTITÉ | TOTAL
    page.drawText("DESCRIPTION", { x: leftMargin, y: currentY, size: 11, font: fontBold });
    page.drawText("PRIX", { x: leftMargin + 250, y: currentY, size: 11, font: fontBold });
    page.drawText("QUANTITÉ", { x: leftMargin + 340, y: currentY, size: 11, font: fontBold });
    page.drawText("TOTAL", { x: leftMargin + 440, y: currentY, size: 11, font: fontBold });
    currentY -= 20;

    const items = getAllItemsForInvoice();
    let subTotal = 0;
    items.forEach((item) => {
      const lineTotal = item.total;
      subTotal += lineTotal;
      // DESCRIPTION
      page.drawText(item.description, {
        x: leftMargin,
        y: currentY,
        size: 10,
        font: fontRegular,
      });
      // PRIX
      page.drawText(`${(item.price / 100).toFixed(2)} €`, {
        x: leftMargin + 250,
        y: currentY,
        size: 10,
        font: fontRegular,
      });
      // QUANTITÉ
      page.drawText(`${item.quantity}`, {
        x: leftMargin + 350,
        y: currentY,
        size: 10,
        font: fontRegular,
      });
      // TOTAL
      page.drawText(`${(lineTotal / 100).toFixed(2)} €`, {
        x: leftMargin + 450,
        y: currentY,
        size: 10,
        font: fontRegular,
      });
      currentY -= 15;
    });

    // Sous total
    currentY -= 10;
    page.drawLine({
      start: { x: leftMargin, y: currentY },
      end: { x: width - leftMargin, y: currentY },
      thickness: 1,
      color: lineGray,
    });
    currentY -= 20;
    page.drawText("Sous total :", { x: leftMargin + 340, y: currentY, size: 10, font: fontRegular });
    page.drawText(`${(subTotal / 100).toFixed(2)} €`, {
      x: leftMargin + 450,
      y: currentY,
      size: 10,
      font: fontRegular,
    });
    currentY -= 15;

    // Mention TVA
    page.drawText("TVA : Non applicable (art. 293B CGI)", {
      x: leftMargin + 340,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: gray,
    });
    currentY -= 15;

    // Total final
    page.drawText("Total :", { x: leftMargin + 340, y: currentY, size: 10, font: fontBold });
    page.drawText(`${(subTotal / 100).toFixed(2)} €`, {
      x: leftMargin + 450,
      y: currentY,
      size: 10,
      font: fontBold,
    });
    currentY -= 30;

    // Affichage de la caution (affichée sans être incluse dans le total)
    page.drawText(
      `Caution : ${(deposit / 100).toFixed(2)} € - non prélevée, hors montant payé`,
      {
        x: leftMargin,
        y: currentY,
        size: 10,
        font: fontRegular,
        color: gray,
      }
    );
    currentY -= 15;

    // Phrase de remerciement
    page.drawText("MERCI DE VOTRE CONFIANCE", {
      x: leftMargin,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: black,
    });

    // Génération et téléchargement du PDF
    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `facture_${invoiceNumber}.pdf`);
  };

  // Recalcule le total dès qu'un paramètre change
  useEffect(() => {
    let total = selectedPacks.reduce((acc, packId) => {
      const pack = packs.find((p) => p.id === packId);
      const quantity = packQuantities[packId] || 1;
      return acc + (pack?.price || 0) * quantity;
    }, 0);

    total += selectedOptions.reduce((acc, optionId) => {
      const option = options.find((o) => o.id === optionId);
      let optionTotal = 0;
      if (optionId === "technician-management") {
        optionTotal = (option?.price || 0) * technicianHours;
      } else if (option?.quantity) {
        const qty = optionQuantities[optionId] || 1;
        optionTotal = (option?.price || 0) * qty;
      } else {
        optionTotal = option?.price || 0;
      }
      return acc + optionTotal;
    }, 0);

    setTotalAmount(total);
  }, [selectedPacks, selectedOptions, packQuantities, technicianHours, optionQuantities]);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setEventAddress("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setSelectedPacks([]);
    setSelectedOptions([]);
    setPackQuantities({});
    setOptionQuantities({});
    setTechnicianHours(1);
    setParticipants(0);
    setDeposit(50000);
  };

  const getDeliveryLabel = () => {
    if (selectedOptions.includes("delivery-paris")) {
      return t("Livraison Paris intra-muros");
    }
    if (selectedOptions.includes("delivery-idf")) {
      return t("Livraison Île-de-France");
    }
    return t("Retrait");
  };

  const getSelectedPacksLabel = () => {
    if (selectedPacks.length === 0) return "-";
    return selectedPacks
      .map((packId) => {
        const pack = packs.find((p) => p.id === packId);
        const quantity = packQuantities[packId] || 1;
        return `${pack?.name || ""} (x${quantity})`;
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      deposit,
      fullName,
      email,
      eventAddress,
      startDate,
      startTime,
      endDate,
      endTime,
      selectedPacks,
      selectedOptions,
      packQuantities,
      optionQuantities,
      technicianHours,
      participants,
    };

    try {
      const response = await fetch("/api/send-final-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(t("Réservation confirmée ! Un e-mail a été envoyé avec le lien de paiement."));
        resetForm();
        // Génère et télécharge la facture PDF
        generateInvoicePDF();
      } else {
        throw new Error(result.message || t("Erreur lors de l'envoi de la réservation"));
      }
    } catch (error) {
      alert(t("Erreur lors de l'envoi : ") + error.message);
    }
  };

  if (authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              <span className="text-[#FF7755]">{t("Event")}</span>
              {t("Manager")}
            </h1>
            <p className="text-gray-500 mt-2">{t("Configuration de réservation")}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de gauche */}
            <div className="lg:col-span-2 space-y-6">
              <section className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {t("Informations client")}
                </h2>
                <div className="space-y-5">
                  <AppleInput
                    label={t("Nom complet")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                  <AppleInput
                    label={t("Adresse email")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                  <AppleInput
                    label={t("Adresse de l'événement")}
                    value={eventAddress}
                    onChange={(e) => setEventAddress(e.target.value)}
                    placeholder="123 Rue de l'Exemple, 75000 Paris"
                  />
                  <AppleInput
                    label={t("Caution remboursable")}
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    placeholder="50000 (500,00 €)"
                    min="0"
                    step="100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AppleInput
                      label={t("Date de début")}
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <AppleInput
                      label={t("Heure de début")}
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AppleInput
                      label={t("Date de fin")}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <AppleInput
                      label={t("Heure de fin")}
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                  <AppleInput
                    label={t("Nombre de participants")}
                    type="number"
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                  />
                </div>
              </section>

              <section className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {t("Options de service")}
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {packs.map((pack) => (
                      <div key={pack.id} className="flex items-center gap-4">
                        <AppleCard
                          label={pack.name}
                          price={pack.price}
                          icon={pack.icon}
                          selected={selectedPacks.includes(pack.id)}
                          onToggle={() =>
                            setSelectedPacks((prev) =>
                              prev.includes(pack.id)
                                ? prev.filter((id) => id !== pack.id)
                                : [...prev, pack.id]
                            )
                          }
                        />
                        {selectedPacks.includes(pack.id) && (
                          <select
                            value={packQuantities[pack.id] || 1}
                            onChange={(e) =>
                              setPackQuantities((prev) => ({
                                ...prev,
                                [pack.id]: Number(e.target.value),
                              }))
                            }
                            className="w-20 px-3 py-2 border border-gray-200 rounded-xl"
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {t("Services additionnels")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((option) => (
                    <div key={option.id} className="flex flex-col gap-2">
                      <AppleOptionCard
                        label={option.name}
                        price={option.price}
                        icon={option.icon}
                        selected={selectedOptions.includes(option.id)}
                        onToggle={() =>
                          setSelectedOptions((prev) =>
                            prev.includes(option.id)
                              ? prev.filter((id) => id !== option.id)
                              : [...prev, option.id]
                          )
                        }
                      />
                      {option.hourly && selectedOptions.includes(option.id) && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{t("Heures")} :</span>
                          <select
                            value={technicianHours}
                            onChange={(e) => setTechnicianHours(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-200 rounded-xl"
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {option.quantity && selectedOptions.includes(option.id) && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{t("Quantité")} :</span>
                          <select
                            value={optionQuantities[option.id] || 1}
                            onChange={(e) =>
                              setOptionQuantities((prev) => ({
                                ...prev,
                                [option.id]: Number(e.target.value),
                              }))
                            }
                            className="w-20 px-2 py-1 border border-gray-200 rounded-xl"
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Récapitulatif à droite */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {t("Récapitulatif")}
                </h3>

                <div className="space-y-4">
                  <AppleSummaryItem
                    label={t("Client")}
                    value={fullName || t("Non renseigné")}
                  />
                  <AppleSummaryItem
                    label={t("Email")}
                    value={email || t("Non renseigné")}
                  />
                  <AppleSummaryItem
                    label={t("Adresse de l'événement")}
                    value={eventAddress || t("Non renseigné")}
                  />
                  <AppleSummaryItem
                    label={t("Caution")}
                    value={`${(deposit / 100).toFixed(2)} € (${t("préautorisation")})`}
                  />
                  <AppleSummaryItem
                    label={t("Début")}
                    value={
                      startDate && startTime
                        ? `${new Date(startDate).toLocaleDateString("fr-FR")} ${t("à")} ${startTime}`
                        : "-"
                    }
                  />
                  <AppleSummaryItem
                    label={t("Fin")}
                    value={
                      endDate && endTime
                        ? `${new Date(endDate).toLocaleDateString("fr-FR")} ${t("à")} ${endTime}`
                        : "-"
                    }
                  />
                  <AppleSummaryItem
                    label={t("Participants")}
                    value={participants > 0 ? participants : "-"}
                  />
                  <AppleSummaryItem
                    label={t("Packs sélectionnés")}
                    value={getSelectedPacksLabel()}
                  />
                  <AppleSummaryItem
                    label={t("Technicien installation")}
                    value={
                      selectedOptions.includes("technician-installation")
                        ? t("Inclus")
                        : t("Non inclus")
                    }
                  />
                  <AppleSummaryItem
                    label={t("Technicien gestion")}
                    value={
                      selectedOptions.includes("technician-management")
                        ? `${technicianHours} ${t("heures")}`
                        : t("Non inclus")
                    }
                  />
                  <AppleSummaryItem
                    label={t("Livraison")}
                    value={getDeliveryLabel()}
                  />
                  <AppleSummaryItem
                    label={t("Micro filaire")}
                    value={
                      selectedOptions.includes("micro-wired")
                        ? `${optionQuantities["micro-wired"] || 1}x`
                        : t("Non inclus")
                    }
                  />
                  <AppleSummaryItem
                    label={t("Micro sans fil")}
                    value={
                      selectedOptions.includes("micro-wireless")
                        ? `${optionQuantities["micro-wireless"] || 1}x`
                        : t("Non inclus")
                    }
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900">
                      {t("Total")}
                    </span>
                    <span className="text-xl font-semibold text-[#FF7755]">
                      € {(totalAmount / 100).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#FF7755] hover:bg-[#FF6644] text-white py-3.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                  >
                    {t("Confirmer la réservation")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page de connexion (mot de passe)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-96">
        <div className="text-center mb-8">
          <img
            src="https://guylocationevents.com/images/logo.png"
            alt="Logo"
            className="mx-auto h-12 w-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {t("Accès Administrateur")}
          </h1>
        </div>
        <form onSubmit={handleSubmitPassword} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7755] focus:border-transparent outline-none transition-all"
            placeholder={t("Mot de passe")}
          />
          <button
            type="submit"
            className="w-full bg-[#FF7755] hover:bg-[#FF6644] text-white py-3.5 rounded-xl font-medium transition-colors duration-200"
          >
            {t("Se connecter")}
          </button>
        </form>
      </div>
    </div>
  );
};

/** Composants utilitaires pour les inputs, cartes, etc. */
const AppleInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7755] focus:border-transparent outline-none transition-all"
      {...props}
    />
  </div>
);

const AppleCard = ({ label, price, icon, selected, onToggle }) => (
  <div
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      selected ? "border-[#FF7755] bg-[#FF7755]/10" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onToggle}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <div className="text-gray-600">€ {(price / 100).toFixed(2)}</div>
    </div>
  </div>
);

const AppleOptionCard = ({ label, price, icon, selected, onToggle }) => (
  <div
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      selected ? "border-[#FF7755] bg-[#FF7755]/10" : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onToggle}
  >
    <div className="flex items-center space-x-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">€ {(price / 100).toFixed(2)}</div>
      </div>
    </div>
  </div>
);

const AppleSummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value}</span>
  </div>
);

export default SendFinalEmailForm;
