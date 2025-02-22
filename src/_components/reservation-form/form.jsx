"use client";
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Link from "next/link";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useState } from "react";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

const ReservationForm = () => {
    const [value, onChange] = useState([]);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dataToSend = {
                ...formData,
                event_dates: value, // Plage de dates
            };

            const response = await fetch("/api/send-reservation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (result.success) {
                setSubmitStatus("success");
                setFormData({});
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire :", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Grid className="form-reservation-area">
            <Grid
                className="left-side-image"
                style={{
                    backgroundImage: `url('/images/form-image.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Grid className="gradient"></Grid>
                <Link href="/" className="logo">
                    <Image src="/images/logo.png" width="235" height="75" alt="Logo" />
                </Link>
                <h1>
                    <span>Tout ce dont vous avez besoin</span> pour vos événements en quelques clics!
                </h1>
            </Grid>

            <form className="right-side-form" onSubmit={handleSubmit}>
                <div className="book-form">
                    <h2 className="title">
                        <Image
                            src="/images/form.png"
                            alt="Informations de réservation"
                            width={30}
                            height={30}
                        />{" "}
                        Informations de réservation
                    </h2>

                    {/* Prénom */}
                    <div className="input-style">
                        <label htmlFor="first_name" className="label">Nom</label>
                        <div className="input">
                            <input type="text" id="first_name" name="first_name" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Nom */}
                    <div className="input-style">
                        <label htmlFor="last_name" className="label">Prénom</label>
                        <div className="input">
                            <input type="text" id="last_name" name="last_name" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="input-style">
                        <label htmlFor="email" className="label">Email</label>
                        <div className="input">
                            <input type="email" id="email" name="email" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Adresse */}
                    <div className="input-style">
                        <label htmlFor="address" className="label">Adresse</label>
                        <div className="input">
                            <input type="text" id="address" name="address" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Vous êtes */}
                    <div className="input-style">
                        <label className="label">Vous êtes</label>
                        <div className="input">
                            <FormControl>
                                <RadioGroup row name="vousetes" onChange={handleChange}>
                                    <FormControlLabel value="particulier" control={<Radio />} label="Particulier" />
                                    <FormControlLabel value="professionnel" control={<Radio />} label="Professionnel" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    {/* Âge */}
                    <div className="input-style">
                        <label htmlFor="age" className="label">Votre âge</label>
                        <div className="input">
                            <input type="text" id="age" name="age" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Date de l'événement */}
                    <div className="input-style">
                        <label className="label">Date d’événement</label>
                        <div className="input-box">
                            <DateRangePicker onChange={onChange} value={value} />
                        </div>
                    </div>

                    {/* Livraison ou Retrait */}
                    <div className="input-style">
                        <label className="label">Retrait ou livraison</label>
                        <div className="input">
                            <FormControl>
                                <RadioGroup row name="livraison" onChange={handleChange}>
                                    <FormControlLabel value="Retrait" control={<Radio />} label="Retrait" />
                                    <FormControlLabel value="Livraison" control={<Radio />} label="Livraison" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    {/* Option Technicien */}
                    <div className="input-style">
                        <label className="label">Option Technicien</label>
                        <div className="input">
                            <FormControl>
                                <RadioGroup row name="technicien" onChange={handleChange}>
                                    <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                    <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    {/* Choix du pack */}
                    <div className="input-style">
                        <label className="label">Choix du pack</label>
                        <div className="input">
                            <FormControl>
                                <RadioGroup row name="pack" onChange={handleChange}>
                                    <FormControlLabel value="Standard" control={<Radio />} label="Standard" />
                                    <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                                    <FormControlLabel value="Deluxe" control={<Radio />} label="Deluxe" />
                                    <FormControlLabel value="sur-mesure" control={<Radio />} label="Sur-mesure" />
                                    <FormControlLabel value="Vidéo" control={<Radio />} label="Vidéo" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <p>Vous recevrez un email contenant un lien pour télécharger vos documents.</p>
                </div>

                {/* Bouton de soumission */}
                <Button className="submit-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Réservez"}
                </Button>

                {/* Message de succès ou d'erreur */}
                {submitStatus === "success" && <p className="success-message">Réservation enregistrée avec succès !</p>}
                {submitStatus === "error" && <p className="error-message">Erreur lors de la réservation. Veuillez réessayer.</p>}
            </form>
        </Grid>
    );
};

export default ReservationForm;
