"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5"; // Icons for hamburger and close menu
import { usePathname } from "next/navigation";

const Header = () => {
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
              7J/7 de 9h30 à 19h30 et<Link href="/">urgences</Link> de
              19h30 à 21h30
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
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sono"
                    className={patname == "/sono" ? "active" : ""}
                  >
                    Sono
                  </Link>
                </li>
                <li>
                  <Link
                    href="/video"
                    className={patname == "/video" ? "active" : ""}
                  >
                    Vidéo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/photobooth"
                    className={patname == "/photobooth" ? "active" : ""}
                  >
                    Photobooth
                  </Link>
                </li>
                <li>
                  <Link
                    href="/urgences"
                    className={patname == "/urgences" ? "active" : ""}
                  >
                    Urgences
                  </Link>
                </li>
              </ul>
            </Grid>

            <Grid className="col-lg-3 col-5 d-none d-lg-block">
              <Grid className="header-button">
                <Link href="/reservation" className="button theme">
                  Réservez
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
                <Link
                  href="/"
                  className={patname == "/" ? "active" : ""}
                  onClick={toggleMobileMenu}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/sono"
                  className={patname == "/sono" ? "active" : ""}
                  onClick={toggleMobileMenu}
                >
                  Sono
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className={patname == "/video" ? "active" : ""}
                  onClick={toggleMobileMenu}
                >
                  Vidéo
                </Link>
              </li>
              <li>
                <Link
                  href="/photobooth"
                  className={patname == "/photobooth" ? "active" : ""}
                  onClick={toggleMobileMenu}
                >
                  Photobooth
                </Link>
              </li>
              <li>
                <Link
                  href="/urgences"
                  className={patname == "/urgences" ? "active" : ""}
                >
                  Urgences
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className={patname == "/reservation" ? "active" : ""}
                  onClick={toggleMobileMenu}
                >
                  Réservez
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
