"use client";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useTranslations } from "next-intl";

const ContactInfo = () => {
  const t = useTranslations();
  return (
    <div className="contact-info-area">
      <div className="container">
        <div className="row">
          {/* Adresse */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="contact-info-wrap">
              <span className="icon">
                <HomeIcon />
              </span>
              <p className="label">{t("78 avenue des Champs Élysées 75008")}</p>
              <p className="info">
                {t(
                  "Pour le retrait les lundi mercredi et vendredi 14h-19h et Urgences : 19h-20h30"
                )}
              </p>
            </div>
          </div>
          {/* Téléphone */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="contact-info-wrap">
              <span className="icon">
                <a href="tel:+33651084994" style={{ color: "inherit" }}>
                  <LocalPhoneIcon />
                </a>
              </span>
              <p className="label">
                {t("Contactez-nous au")}
                <a
                  href="tel:+33651084994"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +33 6 51 08 49 94
                </a>
              </p>
              <p className="info">
                {t("Du lundi au dimanche 9h30 à 19h30 et urgences 19h30 21h00")}
              </p>
            </div>
          </div>
          {/* Livraison */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="contact-info-wrap">
              <span className="icon">
                <LocalShippingIcon />
              </span>
              <p className="label">
                {t("Livraison Île-de-France et paris intra-muros")}
              </p>
              <p className="info">
                {t("Paris Intra-muros TTC la course et Île-de-france")}
              </p>
            </div>
          </div>
          {/* Email */}
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="contact-info-wrap">
              <span className="icon">
                <a
                  href="mailto:devis@guylocationevents.com"
                  style={{ color: "inherit" }}
                >
                  <EmailOutlinedIcon />
                </a>
              </span>
              <p className="label">{t("Demande de devis par courrier")}</p>
              <p className="info">
                {t("Contactez-nous par mail pour un devis")} :{" "}
                <a
                  href="mailto:devis@guylocationevents.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  devis@guylocationevents.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
