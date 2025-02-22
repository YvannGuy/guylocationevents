// components/Footer.tsx
"use client";

import Grid from "@mui/material/Grid2";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import WhatsAppButton from "../whatsapp";
import ChatBox from "@/_components/Chatbox";
import { useTranslations } from "next-intl";
import LanguageFooter from "../language-footer";
const Footer = () => {
  const [visible, setVisible] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-area">
      <Grid className="footer-top">
        <Grid className="container">
          <Grid className="row">
            <Grid className="col-lg-4 col-12">
              <Grid className="left-wrap">
                <Link href="/">
                  <Image
                    src="/images/logo-white.png"
                    width="235"
                    height="75"
                    alt="Logo"
                  />
                </Link>
                <Grid className="social-icons">
                  <a
                    href="https://www.facebook.com/share/18CBxBVT8r/?mibextid=wwXIfr"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a href="/" target="_blank" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="/" target="_blank" aria-label="TikTok">
                    <FaTiktok />
                  </a>
                </Grid>
                <LanguageFooter />
              </Grid>
            </Grid>
            <Grid className="col-lg-5 col-12">
              <ul className="footer-menu">
                <li>
                  <Link href="/faqs">{t("Faq")}</Link>
                </li>
                <li>
                  <Link href="/condition-location">
                    {t("Conditions de location")}
                  </Link>
                </li>
                <li>
                  <Link href="/mentions-legals">{t("Mentions légales")}</Link>
                </li>
              </ul>
            </Grid>
            <Grid className="col-lg-3 col-12">
              <Grid className="widget">
                <span className="title">
                  {t("Vous avez trouvé ce qu’il vous plaît?")}
                </span>
                <Link href="/reservation" className="button">
                  {t("Réservez")}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="footer-bottom">
        <Grid className="container">
          <Grid className="row align-items-center">
            <Grid className="col-12">
              <p className="text-center">
                &copy; {new Date().getFullYear()}{" "}
                {t("GUY LOCATION ÉVÈNEMENTS. Tous droits réservés.")}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WhatsAppButton />
      // <ChatBox /> {/* Ajout du composant ChatBox */}
      {visible && (
        <Button onClick={scrollToTop} className="scroll-topup">
          <ArrowUpwardIcon />
        </Button>
      )}
    </footer>
  );
};

export default Footer;
