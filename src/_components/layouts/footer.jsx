// components/Footer.tsx
'use client';

import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WhatsAppButton from '../whatsapp';
import ChatBox from "@/_components/Chatbox";
// import ChatBox from '../Chatbox'; // Importation du composant ChatBox

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <footer className="footer-area">
        <Grid className="footer-top">
          <Grid className="container">
            <Grid className="row">
              <Grid className="col-lg-4">
                <Grid className="left-wrap">
                  <Link href="#">
                    <Image
                        src="/images/logofooter.png"
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
                </Grid>
              </Grid>
              <Grid className="col-lg-5">
                <ul className="footer-menu">
                  <li>
                    <Link href="/faqs">Faq</Link>
                  </li>
                  <li>
                    <Link href="/condition-location">Conditions de location</Link>
                  </li>
                  <li>
                    <Link href="/mentions-legals">Mentions légales</Link>
                  </li>
                </ul>
              </Grid>
              <Grid className="col-lg-3">
                <Grid className="widget">
                <span className="title">
                  Vous avez trouvé ce qu’il vous plaît?
                </span>
                  <Link href="/reservation" className="button">
                    Réservez
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
                  &copy; {new Date().getFullYear()} GUY LOCATION ÉVÈNEMENTS. Tous
                  droits réservés.
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
