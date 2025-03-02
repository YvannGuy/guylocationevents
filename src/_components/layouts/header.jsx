"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5"; // Icons for hamburger and close menu
import { usePathname } from "next/navigation";
import Language from "../language";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const patname = usePathname();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Grid className="header-area">
      <Grid className="header-top">
        <Grid className="container">
          <Grid className="header-top-wrap">
            <p>
              <Image
                src="/images/watch-icon.png"
                width="30"
                height="30"
                alt="icon"
              />
              {t("open_hours")}
            </p>
            <a className="phone" href="tel:+33 6 51 08 49 94">
              <Image
                src="/images/phone-icon.png"
                width="27"
                height="25"
                alt="icon"
              />
              +33 6 51 08 49 94
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Grid className="main-header">
        <Grid className="container">
          <Grid className="row align-items-center">
            <Grid className="col-lg-3 col-7">
              <Link href="/" className="logo">
                <Image
                  src="/images/logo.png"
                  width="235"
                  height="75"
                  alt="Logo"
                />
              </Link>
            </Grid>

            {/* Desktop Menu */}
            <Grid className="col-lg-6 d-none d-lg-block">
              <ul className="main-menu">
                <li>
                  <Link href="/" className={patname == "/" ? "active" : ""}>
                    {t("Accueil")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sono"
                    className={patname == "/sono" ? "active" : ""}
                  >
                    {t("Sono")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/video"
                    className={patname == "/video" ? "active" : ""}
                  >
                    {t("Vidéo")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/photobooth"
                    className={patname == "/photobooth" ? "active" : ""}
                  >
                    {t("Photobooth")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/urgences"
                    className={patname == "/urgences" ? "active" : ""}
                  >
                    {t("Urgences")}
                  </Link>
                </li>
              </ul>
            </Grid>

            <Grid className="col-lg-3 col-5 d-none d-lg-block">
              <Grid className="header-button">
                <Language />
                <Link href="/reservation" className="button theme">
                  {t("Réservez")}
                </Link>
              </Grid>
            </Grid>

            {/* Mobile Menu Toggle */}
            <Grid className="col-5 d-lg-none text-end">
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? (
                  <IoClose size={30} />
                ) : (
                  <IoMenu size={30} />
                )}
              </button>
            </Grid>
          </Grid>
        </Grid>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li>
                <Link href="/" className={patname == "/" ? "active" : ""}>
                  {t("Accueil")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sono"
                  className={patname == "/sono" ? "active" : ""}
                >
                  {t("Sono")}
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className={patname == "/video" ? "active" : ""}
                >
                  {t("Vidéo")}
                </Link>
              </li>
              <li>
                <Link
                  href="/photobooth"
                  className={patname == "/photobooth" ? "active" : ""}
                >
                  {t("Photobooth")}
                </Link>
              </li>
              <li>
                <Link
                  href="/urgences"
                  className={patname == "/urgences" ? "active" : ""}
                >
                  {t("Urgences")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className={
                    patname == "/reservation" ? "active book-btn" : "book-btn"
                  }
                  onClick={toggleMobileMenu}
                >
                  {t("Réservez")}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
