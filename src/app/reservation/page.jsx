import ReservationStep from "./components/details";
import PublicLayout from "@/_components/layouts";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
export default function Reservation() {
  return (
    <PublicLayout>
      <Grid
        className="breadcumb-area"
        style={{
          backgroundImage: `url(/images/catalog-bg.png)`,
          backgroundRepeate: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Grid
          className="gradient-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000",
            opacity: "0.8",
            zIndex: "-1",
          }}
        />
        <div className="container">
          <div className="hero-content-wrap">
            <h1 className="title">Réservation</h1>
            <div className="title-image">
              <Image
                src="/images/title-border.png"
                width="130"
                height="16"
                alt="border"
              />
            </div>
            <p className="subtitle">
                Réservez facilement votre matériel et services avec Guy Location Events ! Remplissez le formulaire avec les détails de votre événement, choisissez vos options, et recevez un devis personnalisé sous 24h. 🎉
            </p>
          </div>
        </div>
        <Grid className="bottom-shape">
          <Image
            src="/images/hero-bottom-bar.png"
            width="300"
            height="28"
            alt="shape"
          />
        </Grid>
      </Grid>
      <ReservationStep />
    </PublicLayout>
  );
}
