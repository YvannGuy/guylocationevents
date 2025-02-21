"use client";
import { Button, MenuItem, TextField, Alert, Box, Grid2 } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CallToAction = () => {
  const t = useTranslations();
  // État pour stocker les sélections et l'erreur
  const [formData, setFormData] = useState({
    tailleEvenement: "0",
    natureEvenement: "0",
    solutionTechnique: "0",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(false);
  };

  const handleRedirect = () => {
    if (
      formData.tailleEvenement === "0" ||
      formData.natureEvenement === "0" ||
      formData.solutionTechnique === "0"
    ) {
      setError(true);
      return;
    }

    if (formData.solutionTechnique === "Sono Complete") {
      switch (formData.tailleEvenement) {
        case "20-50":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-standard"
          );
          return;
        case "50-100":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-essentiel"
          );
          return;
        case "100-150":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-confort"
          );
          return;
        case "150-200":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-premium"
          );
          return;
        case "200-250":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-prestige"
          );
          return;
        case "250-300":
          router.push(
            "https://www.guylocationevents.com/single-page/pack-grand-event"
          );
          return;
        default:
          setError(true);
          return;
      }
    }

    if (formData.solutionTechnique === "Système vidéo projection") {
      router.push("/video");
      return;
    }
    if (formData.solutionTechnique === "Photobooth") {
      router.push("/photobooth");
      return;
    }
    setError(true);
  };

  return (
    <div className="call-to-action">
      <div className="container">
        <form className="call-to-wrap">
          <Grid2 container spacing={2}>
            {/* Taille de l'évènement */}
            <Grid2
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Box className="ctainput-style">
                <label>{t("Taille de l’évènement")}</label>
                <TextField
                  name="tailleEvenement"
                  value={formData.tailleEvenement}
                  onChange={handleChange}
                  select
                  size="small"
                  fullWidth
                  placeholder={t("Sélectionnez")}
                  sx={{
                    " .MuiInputBase-root": { borderRadius: "40px" },
                  }}
                >
                  <MenuItem value="0">{t("Sélectionnez")}</MenuItem>
                  <MenuItem value="20-50">20-50 {t("personnes")}</MenuItem>
                  <MenuItem value="50-100">50-100 {t("personnes")}</MenuItem>
                  <MenuItem value="100-150">100-150 {t("personnes")}</MenuItem>
                  <MenuItem value="150-200">150-200 {t("personnes")}</MenuItem>
                  <MenuItem value="200-250">200-250 {t("personnes")}</MenuItem>
                  <MenuItem value="250-300">250-300 {t("personnes")}</MenuItem>
                </TextField>
              </Box>
            </Grid2>
            {/* Nature de l'évènement */}
            <Grid2
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Box className="ctainput-style">
                <label>{t("Nature de l’évènement")}</label>
                <TextField
                  name="natureEvenement"
                  value={formData.natureEvenement}
                  onChange={handleChange}
                  select
                  size="small"
                  fullWidth
                  placeholder={t("Sélectionnez")}
                  sx={{
                    " .MuiInputBase-root": { borderRadius: "40px" },
                  }}
                >
                  <MenuItem value="0">{t("Sélectionnez")}</MenuItem>
                  <MenuItem value="Anniversaire">{t("Anniversaire")}</MenuItem>
                  <MenuItem value="Mariage">{t("Mariage")}</MenuItem>
                  <MenuItem value="concert/show">{t("Concert/Show")}</MenuItem>
                  <MenuItem value="conférence">{t("Conférence")}</MenuItem>
                </TextField>
              </Box>
            </Grid2>
            {/* Solutions techniques */}
            <Grid2
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Box className="ctainput-style">
                <label>{t("Solutions techniques")}</label>
                <TextField
                  name="solutionTechnique"
                  value={formData.solutionTechnique}
                  onChange={handleChange}
                  select
                  size="small"
                  fullWidth
                  placeholder={t("Sélectionnez")}
                  sx={{
                    " .MuiInputBase-root": { borderRadius: "40px" },
                  }}
                >
                  <MenuItem value="0">{t("Sélectionnez")}</MenuItem>
                  <MenuItem value="Sono Complete">
                    {t("Sono Complete")}
                  </MenuItem>
                  <MenuItem value="Système vidéo projection">
                    {t("Système vidéo projection")}
                  </MenuItem>
                  <MenuItem value="Photobooth">{t("Photobooth")}</MenuItem>
                </TextField>
              </Box>
            </Grid2>
            {/* Message d'erreur intégré */}
            {error && (
              <Grid2 size={12}>
                <Alert
                  variant="filled"
                  severity="error"
                  sx={{
                    borderRadius: "20px",
                    textAlign: "center",
                    fontWeight: "500",
                    fontFamily: "Montserrat, serif",
                  }}
                >
                  {t("Veuillez sélectionner toutes les options correctement")}
                </Alert>
              </Grid2>
            )}
            {/* Bouton de redirection */}
            <Grid2 size={12}>
              <Button
                endIcon={<EastIcon />}
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  background: "#e27430",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  minHeight: { md: "50px", xs: "40px" },
                  borderRadius: "20px",
                  fontFamily: "Montserrat, serif",
                }}
                onClick={handleRedirect}
              >
                {t("Voir les offres")}
              </Button>
            </Grid2>
          </Grid2>
        </form>
        <div className="call-to-content">
          <p>
            {t(
              "Guy Location Events met à votre disposition du matériel de sonorisation, vidéo et photobooth pour tous vos événements"
            )}{" "}
            ! 🎉
          </p>
          <p>
            📢{" "}
            {t(
              "Un large choix de matériel de qualité. Nous avons soigneusement développé notre catalogue en fonction des besoins de nos clients afin de vous proposer des équipements performants, fiables et accessibles"
            )}
            .
          </p>
          <ul>
            <li>
              {t(
                "Location de Sono : enceintes, micros, mixeurs… pour une qualité sonore optimale"
              )}
              .
            </li>
            <li>
              {t(
                "Location de Vidéo : vidéoprojecteurs, écrans, supports pour toutes vos présentations et projections."
              )}
            </li>
            <li>
              {t(
                "Photobooth : Immortalisez vos souvenirs avec nos bornes photos interactives"
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
