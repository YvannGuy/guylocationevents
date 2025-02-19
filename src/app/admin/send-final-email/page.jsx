"use client";
import React, { useState, useEffect } from "react";

const packs = [
    { id: "pack1", name: "Pack Mariage", price: 50000, icon: "💍" },
    { id: "pack2", name: "Pack Anniversaire", price: 30000, icon: "🎈" },
    { id: "pack3", name: "Pack Conférence", price: 40000, icon: "🎤" },
];

const options = [
    { id: "technician", name: "Technicien", price: 10000, icon: "🔧" },
    { id: "delivery", name: "Livraison", price: 5000, icon: "🚚" },
];

const SendFinalEmailForm = () => {
    // États d'authentification
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    // États du formulaire
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedPacks, setSelectedPacks] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [participants, setParticipants] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Gestion de l'authentification
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setAuthenticated(true);
        } else {
            alert("Mot de passe incorrect !");
        }
    };

    // Calcul du total
    useEffect(() => {
        let total = selectedPacks.reduce((acc, packId) => {
            const pack = packs.find(p => p.id === packId);
            return acc + (pack?.price || 0);
        }, 0);

        total += selectedOptions.reduce((acc, optionId) => {
            const option = options.find(o => o.id === optionId);
            return acc + (option?.price || 0);
        }, 0);

        total += participants * 1000;
        setTotalAmount(total);
    }, [selectedPacks, selectedOptions, participants]);

    // Réinitialisation du formulaire
    const resetForm = () => {
        setFullName("");
        setEmail("");
        setSelectedPacks([]);
        setSelectedOptions([]);
        setParticipants(0);
    };

    // Fonctions utilitaires
    const getDeliveryLabel = () => {
        return selectedOptions.includes("delivery") ? "Livraison" : "Retrait";
    };

    const getSelectedPacksLabel = () => {
        if (selectedPacks.length === 0) return "-";
        return selectedPacks.map(packId => {
            const pack = packs.find(p => p.id === packId);
            return pack?.name || "";
        }).filter(Boolean).join(", ");
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fullName,
            email,
            selectedPacks,
            selectedOptions,
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

            if (response.ok) {
                alert("E-mail envoyé avec succès !");
                resetForm();
            } else {
                throw new Error("Échec de l'envoi");
            }
        } catch (error) {
            alert("Erreur lors de l'envoi : " + error.message);
        }
    };

    if (authenticated) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                    <header className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            <span className="text-[#FF7755]">Event</span>Manager
                        </h1>
                        <p className="text-gray-500 mt-2">Configuration de réservation</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <section className="p-6 bg-gray-50 rounded-2xl">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                    Informations client
                                </h2>
                                <div className="space-y-5">
                                    <AppleInput
                                        label="Nom complet"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    <AppleInput
                                        label="Adresse email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                    />
                                    <AppleInput
                                        label="Nombre de participants"
                                        type="number"
                                        value={participants}
                                        onChange={(e) => setParticipants(Number(e.target.value))}
                                    />
                                </div>
                            </section>

                            <section className="p-6 bg-gray-50 rounded-2xl">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                    Options de service
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        {packs.map((pack) => (
                                            <AppleCard
                                                key={pack.id}
                                                label={pack.name}
                                                price={pack.price}
                                                icon={pack.icon}
                                                selected={selectedPacks.includes(pack.id)}
                                                onToggle={() =>
                                                    setSelectedPacks(prev =>
                                                        prev.includes(pack.id)
                                                            ? prev.filter(id => id !== pack.id)
                                                            : [...prev, pack.id]
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section className="p-6 bg-gray-50 rounded-2xl">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                    Services additionnels
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {options.map((option) => (
                                        <AppleOptionCard
                                            key={option.id}
                                            label={option.name}
                                            price={option.price}
                                            icon={option.icon}
                                            selected={selectedOptions.includes(option.id)}
                                            onToggle={() =>
                                                setSelectedOptions(prev =>
                                                    prev.includes(option.id)
                                                        ? prev.filter(id => id !== option.id)
                                                        : [...prev, option.id]
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                    Récapitulatif
                                </h3>

                                <div className="space-y-4">
                                    <AppleSummaryItem label="Client" value={fullName || "Non renseigné"} />
                                    <AppleSummaryItem label="Email" value={email || "Non renseigné"} />
                                    <AppleSummaryItem
                                        label="Participants"
                                        value={participants > 0 ? participants : "-"}
                                    />
                                    <AppleSummaryItem
                                        label="Packs sélectionnés"
                                        value={getSelectedPacksLabel()}
                                    />
                                    <AppleSummaryItem
                                        label="Technicien"
                                        value={selectedOptions.includes("technician") ? "Inclus" : "Non inclus"}
                                    />
                                    <AppleSummaryItem
                                        label="Livraison"
                                        value={getDeliveryLabel()}
                                    />
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="text-xl font-semibold text-[#FF7755]">
                      € {(totalAmount / 100).toFixed(2)}
                    </span>
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-[#FF7755] hover:bg-[#FF6644] text-white py-3.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                                    >
                                        Confirmer la réservation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-96">
                <div className="text-center mb-8">
                    <div className="mb-4">
                        <span className="text-4xl">🔒</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Accès Administrateur
                    </h1>
                </div>
                <form onSubmit={handleSubmitPassword} className="space-y-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7755] focus:border-transparent outline-none transition-all"
                        placeholder="Mot de passe"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#FF7755] hover:bg-[#FF6644] text-white py-3.5 rounded-xl font-medium transition-colors duration-200"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

// Composants stylisés
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

const AppleCard = ({ label, price, icon, selected, onToggle }) => (
    <div
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selected
                ? "border-[#FF7755] bg-[#FF7755]/10"
                : "border-gray-200 hover:border-gray-300"
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
            selected
                ? "border-[#FF7755] bg-[#FF7755]/10"
                : "border-gray-200 hover:border-gray-300"
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