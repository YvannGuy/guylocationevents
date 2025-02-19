"use client";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
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

  return (
    <Grid className="form-reservation-area">
      <Grid
        className="left-side-image"
        style={{
          backgroundImage: `url('/images/form-image.png')`,
          backgroundRepeate: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid className="gradient"></Grid>
        <Link href="/" className="logo">
          <Image src="/images/logo.png" width="235" height="75" alt="Logo" />
        </Link>
        {/* <IconButton className="playbtn" LinkComponent="a" href="#">
          <PlayArrowIcon />
        </IconButton> */}
        <h1>
          <span> Tout ce dont vous avez besoin</span> pour vos événements en
          quelques clics!
        </h1>
      </Grid>
      <form className="right-side-form">
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
          <div className="input-style">
            <label htmlFor="first_name" className="label">
              Nom
            </label>
            <div className="input">
              <input type="text" id="first_name" name="first_name" />
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="last_name" className="label">
              Prénom
            </label>
            <div className="input">
              <input type="text" id="last_name" name="last_name" />
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="input">
              <input type="email" id="email" name="email" />
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="email" className="label"></label>
            <div className="input">
              <div className="devaidar"></div>
            </div>
          </div>

          <div className="input-style">
            <label htmlFor="address" className="label">
              Addresse
            </label>
            <div className="input">
              <input type="text" id="address" name="address" />
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Vous êtes
            </label>
            <div className="input">
              <FormControl>
                <RadioGroup row name="vousêtes">
                  <FormControlLabel
                    value="particulier"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Particulier"
                  />
                  <FormControlLabel
                    value="professionnel"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Professionnel"
                    sx={{ marginLeft: "50px" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Votre âge
            </label>
            <div className="input">
              <input type="text" id="address" name="address" />
              {/* <div className="row">
                <div className="col-md-4">
                  <input type="text" id="address" name="address" />
                </div>
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <label htmlFor="address" className="label mr-5">
                      Date <br /> d’évenement
                    </label>
                    <input type="date" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Date <br /> d’évenement
            </label>
            <div className="input-box">
              <DateRangePicker onChange={onChange} value={value} />
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Retrait ou livraison
            </label>
            <div className="input">
              <FormControl>
                <RadioGroup row name="livraison" sx={{ flexWrap: "nowrap" }}>
                  <FormControlLabel
                    value="Retrait"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Retrait"
                  />
                  <FormControlLabel
                    value="professionnel"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label={
                      <span className="label-info">
                        Livraison
                        <span>
                          Pour la livraison, le prix sera calculé en fonction de
                          la dist
                        </span>
                      </span>
                    }
                    sx={{ marginLeft: "50px" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Option Technicien
            </label>
            <div className="input">
              <FormControl>
                <RadioGroup row name="technicien" sx={{ flexWrap: "nowrap" }}>
                  <FormControlLabel
                    value="Oui"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="Non"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label={
                      <span className="label-info">
                        Non
                        <span>90€/Jour</span>
                      </span>
                    }
                    sx={{ marginLeft: "50px" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="input-style">
            <label htmlFor="address" className="label">
              Choix du pack
            </label>
            <div className="input">
              <FormControl>
                <RadioGroup row name="pack">
                  <FormControlLabel
                    value="Standard"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Standard"
                  />
                  <FormControlLabel
                    value="Premium"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Premium"
                  />
                  <FormControlLabel
                    value="Deluxe"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Deluxe"
                  />
                  <FormControlLabel
                    value="sur-mesure"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="sur-mesure"
                  />
                  <FormControlLabel
                    value="vidéo"
                    control={
                      <Radio
                        sx={{
                          color: "#d3dbe3",
                          "&.Mui-checked": { color: "#72bb4c" },
                        }}
                      />
                    }
                    label="Vidéo"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <p>
            En fonction du choix du pack (sauf pour le sur-mesure) et des
            options, vous recevrez un mail contenant un lien pour télecharger
            vos documents, le lien pour la caution, le lien de paiement, ainsi
            que le contrat{" "}
          </p>
        </div>

        <Button className="submit-btn">Réservez</Button>
      </form>
    </Grid>
  );
};

export default ReservationForm;
