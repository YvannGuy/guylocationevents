/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */

import Grid from "@mui/material/Grid2";
import PublicLayout from "@/_components/layouts";
import { Fragment } from "react";
import Image from "next/image";

const CatalogPage = async () => {
  return (
    <Fragment>
      <PublicLayout>
        <div className="mentions-page">
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
                <h1 className="title">Mentions Légales</h1>
                <div className="title-image">
                  <Image
                    src="/images/title-border.png"
                    width="130"
                    height="16"
                    alt="border"
                  />
                </div>
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
          {/* MENTIONS START */}
          <section className="mentions-legals-area">
            <Grid className="container">
              <Grid className="row">
                <Grid className="col-lg-12">
                  <Grid className="text-wrap">
                    <h2 className="title">Mentions Légales</h2>
                    <h3>1. Informations de l’entreprise</h3>
                    <p>
                      Nom de l’entreprise : Guy Location Events <br />
                      Forme juridique : Micro-entreprise <br />
                      Numéro SIRET : 93970529900021
                      <br />
                      Siège social : 78 Avenue des Champs-Élysées, 75008 Paris,
                      France
                    </p>
                    <h3>2. Coordonnées</h3>
                    <p>
                      Adresse e-mail : contact@guylocationevents.com <br />
                      Téléphone : 06 51 08 49 94 <br />
                      Site internet : www.guylocationevents.fr <br />
                    </p>
                    <h3>3. Hébergement du site internet</h3>
                    <p>
                      Hébergeur : Hostinger <br />
                      Adresse de l’hébergeur : [Adresse complète d’Hostinger à
                      ajouter, ex. Hostinger International Ltd, 61 Lordou
                      Vironos Street, Larnaca, 6023, Chypre
                    </p>

                    <h3>4. Directeur de la publication</h3>
                    <p>Nom : Guyonnet Yvann</p>

                    <h3>5. Propriété intellectuelle</h3>
                    <p>
                      Tout le contenu présent sur le site
                      www.guylocationevents.fr, y compris les textes, images,
                      vidéos, logos, etc, est protégé par le droit d’auteur et
                      reste la propriété exclusive de Guy Location Events ou de
                      ses partenaires. Toute reproduction, représentation ou
                      distribution sans autorisation écrite est strictement
                      interdite.
                    </p>
                    <h3>6. Données personnelles</h3>
                    <p>
                      Conformément à la réglementation sur la protection des
                      données personnelles (RGPD), les informations recueillies
                      via le site sont strictement confidentielles. Elles sont
                      destinées uniquement à un usage interne et ne seront pas
                      vendues ou partagées avec des tiers sans le consentement
                      de l’utilisateur.
                      <br />
                      Droits de l’utilisateur : Vous disposez d’un droit
                      d’accès, de rectification et de suppression de vos données
                      personnelles. Pour exercer ces droits, contactez-nous à :
                      contact@guylocationevents.com
                    </p>
                    <h3>7. Responsabilité</h3>
                    <p>
                      Guy Location Events met tout en œuvre pour assurer
                      l’exactitude des informations publiées sur son site.
                      Toutefois, l’entreprise ne saurait être tenue responsable
                      des erreurs ou omissions, ainsi que des éventuels dommages
                      directs ou indirects liés à l’utilisation du site.
                    </p>
                    <h3>8. Loi applicable et juridiction compétente</h3>
                    <p>
                      Les présentes mentions légales sont régies par le droit
                      français. En cas de litige, les tribunaux du ressort du
                      siège social de Guy Location Events seront compétents.
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </section>
          {/* MENTIONS START END */}
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
