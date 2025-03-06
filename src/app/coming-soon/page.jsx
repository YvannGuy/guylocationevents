"use client";
import BackgroundVideo from "next-video/background-video";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const ComingSoon = () => {
  const t = useTranslations();
  return (
    <BackgroundVideo
      src="/videos/hero.mp4?thumbnailTime=0"
      className="coming-soon-area"
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
        }}
      />
      <div className="coming-soon-content-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="coming-soon-wrap">
                <h1>{t("Stay tuned")}</h1>
                <form className="coming-soon-form">
                  <input type="text" placeholder={t("Email")} />
                  <button>{t("Notify me")}</button>
                </form>
                <Grid className="social-icons">
                  <a
                    href="https://www.facebook.com/share/18CBxBVT8r/?mibextid=wwXIfr"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/guy_location_events/"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a href="/" target="_blank" aria-label="TikTok">
                    <FaTiktok />
                  </a>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundVideo>
  );
};
export default ComingSoon;
