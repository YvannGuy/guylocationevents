"use client";
import {
  Button,
  MenuItem,
  TextField,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CallToAction = () => {
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
          router.push("http://localhost:3000/single-page/pack-standard");
          return;
        case "50-100":
          router.push("http://localhost:3000/single-page/pack-essentiel");
          return;
        case "100-150":
          router.push("http://localhost:3000/single-page/pack-confort");
          return;
        case "150-200":
          router.push("http://localhost:3000/single-page/pack-premium");
          return;
        case "200-250":
          router.push("http://localhost:3000/single-page/pack-prestige");
          return;
        case "250-300":
          router.push("http://localhost:3000/single-page/pack-grand-event");
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
            <Grid container spacing={2}>
              {/* Taille de l'évènement */}
              <Grid item xs={12} md={4}>
                <Box className="ctainput-style">
                  <label>Taille de l’évènement</label>
                  <TextField
                      name="tailleEvenement"
                      value={formData.tailleEvenement}
                      onChange={handleChange}
                      select
                      size="small"
                      fullWidth
                      placeholder="Sélectionnez"
                      sx={{
                        " .MuiInputBase-root": { borderRadius: "40px" },
                      }}
                  >
                    <MenuItem value="0">Sélectionnez</MenuItem>
                    <MenuItem value="20-50">20-50 personnes</MenuItem>
                    <MenuItem value="50-100">50-100 personnes</MenuItem>
                    <MenuItem value="100-150">100-150 personnes</MenuItem>
                    <MenuItem value="150-200">150-200 personnes</MenuItem>
                    <MenuItem value="200-250">200-250 personnes</MenuItem>
                    <MenuItem value="250-300">250-300 personnes</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              {/* Nature de l'évènement */}
              <Grid item xs={12} md={4}>
                <Box className="ctainput-style">
                  <label>Nature de l’évènement</label>
                  <TextField
                      name="natureEvenement"
                      value={formData.natureEvenement}
                      onChange={handleChange}
                      select
                      size="small"
                      fullWidth
                      placeholder="Sélectionnez"
                      sx={{
                        " .MuiInputBase-root": { borderRadius: "40px" },
                      }}
                  >
                    <MenuItem value="0">Sélectionnez</MenuItem>
                    <MenuItem value="Anniversaire">Anniversaire</MenuItem>
                    <MenuItem value="Mariage">Mariage</MenuItem>
                    <MenuItem value="concert/show">Concert/Show</MenuItem>
                    <MenuItem value="conférence">Conférence</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              {/* Solutions techniques */}
              <Grid item xs={12} md={4}>
                <Box className="ctainput-style">
                  <label>Solutions techniques</label>
                  <TextField
                      name="solutionTechnique"
                      value={formData.solutionTechnique}
                      onChange={handleChange}
                      select
                      size="small"
                      fullWidth
                      placeholder="Sélectionnez"
                      sx={{
                        " .MuiInputBase-root": { borderRadius: "40px" },
                      }}
                  >
                    <MenuItem value="0">Sélectionnez</MenuItem>
                    <MenuItem value="Sono Complete">Sono Complete</MenuItem>
                    <MenuItem value="Système vidéo projection">
                      Système vidéo projection
                    </MenuItem>
                    <MenuItem value="Photobooth">Photobooth</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              {/* Message d'erreur intégré */}
              {error && (
                  <Grid item xs={12}>
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
                      Veuillez sélectionner toutes les options correctement.
                    </Alert>
                  </Grid>
              )}
              {/* Bouton de redirection */}
              <Grid item xs={12}>
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
                  Voir les offres
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="call-to-content">
            <p>
              Guy Location Events met à votre disposition du matériel de sonorisation, vidéo et photobooth pour tous vos événements ! 🎉
            </p>
            <p>
              📢 Un large choix de matériel de qualité. Nous avons soigneusement développé notre catalogue en fonction des besoins de nos clients afin de vous proposer des équipements performants, fiables et accessibles.
            </p>
            <ul>
              <li>
                Location de Sono : enceintes, micros, mixeurs… pour une qualité sonore optimale.
              </li>
              <li>
                Location de Vidéo : vidéoprojecteurs, écrans, supports pour toutes vos présentations et projections.
              </li>
              <li>
                Photobooth : Immortalisez vos souvenirs avec nos bornes photos interactives !
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default CallToAction;
