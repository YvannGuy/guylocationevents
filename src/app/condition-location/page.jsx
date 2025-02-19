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
        <div className="condition-the-location">
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
                <h1 className="title">Conditions de location</h1>
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
          {/* CONDITION THE LOCATION START */}
          <section className="condition-location-area">
            <Grid className="container">
              <Grid className="row">
                <Grid className="col-lg-12">
                  <Grid className="text-wrap">
                    <h2 className="title">Conditions de location</h2>
                    <h3>1. DISPONIBILITÉ DES PRODUITS</h3>
                    <p>
                      Le stock présenté sur notre site internet est indicatif et
                      non garanti.
                    </p>
                    <p>
                      Nous nous efforçons de maintenir des informations à jour,
                      mais des erreurs peuvent survenir, notamment en raison de
                      retours de matériel ou de délais de réparation.{" "}
                    </p>
                    <p>
                      Après validation de votre commande, nous vous confirmons
                      sa disponibilité dans les 48 heures. Si un produit est
                      hors stock, nous vous proposerons une alternative ou
                      procéderons à l'annulation, avec votre consentement.
                    </p>

                    <h3>2. CONDITIONS POUR LA LOCATION</h3>
                    <p>
                      Documents requis : Une pièce d’identité valide et un
                      justificatif de domicile de moins de 2 mois sont
                      obligatoires. Sans ces documents, la location sera
                      refusée.
                    </p>
                    <p>
                      Garantie financière : Une caution peut être demandée,
                      réglée par empreinte bancaire par le biais de la
                      plateforme Wikli.
                    </p>
                    <p>
                      Matériel de haute valeur : Pour une valeur supérieure à 2
                      500 €, deux pièces d’identité sont exigées.
                    </p>
                    <p>
                      Retour et restitution : Si le matériel revient en bon
                      état, la caution est restituée immédiatement (95 % des
                      cas). En cas de dommages, une expertise sous 48 heures
                      déterminera les réparations nécessaires.
                    </p>
                    <p>
                      Réparations : Vous pouvez confier les réparations à Guy
                      Location Events ou choisir un ou choisir un prestataire
                      sous 5 jours. Attention, dans le cas d'une attente de 5
                      jours pour les réparations, le matériel vous sera facturé
                      sur 5 jours de location.
                    </p>

                    <h3>3. DURÉE ET RETARD</h3>
                    <p>
                      Les durées de location sont fixées dans le contrat. Tout
                      retard de restitution sera facturé au tarif d'une journée
                      supplémentaire par jour de retard.
                    </p>

                    <h3>4. ÉTAT DES PRODUITS</h3>
                    <p>
                      Nous garantissons le bon fonctionnement des équipements.
                      En cas de besoin, un service après-vente est disponible en
                      Île-de-France dans un délai de 4 heures. Il est conseillé
                      de procéder à l'installation du matériel au moins 4 heures
                      avant son utilisation pour permettre une intervention en
                      cas de défaillance.
                    </p>
                    <p>
                      Si le déplacement était du à une mauvaise installation ou
                      utilisation du matériel, il sera facturé 90,00€ TTC.
                    </p>
                    <p>
                      Guy Location Événements veille à ce que tous les
                      équipements mis à votre disposition soient soigneusement
                      révisés et entretenus conformément aux normes de sécurité
                      en vigueur. En cas de problème avec l'un des appareils
                      pendant la prestation, et si le locataire n'a commis
                      aucune mauvaise manipulation, les frais de location de
                      l'appareil concerné seront intégralement remboursés.
                    </p>
                    <p>
                      Les installations effectuées par le locataire, qui ne sont
                      pas supervisées par des professionnels, doivent être
                      réalisées avec soin et installées loin des zones de
                      passage, Le locataire a la possibilité de vérifier l’état
                      du matériel en sa présence avant sa prise en charge. Si
                      cette vérification n’est pas effectuée, l’acceptation des
                      conditions générales de location par le locataire vaudra
                      reconnaissance des garanties proposées par Guy Location
                      Events. afin de prévenir tout risque de chute des
                      structures ou de dommages.
                    </p>

                    <h3>5. USAGE, CESSION ET SOUS-LOCATION</h3>
                    <p>
                      Le matériel ne peut être sous-loué ou cédé sans notre
                      consentement écrit. Il ne doit pas être utilisé pour des
                      fins illégales ou contraires aux bonnes mœurs, ni à
                      l'extérieur sans autorisation des autorités compétentes.
                    </p>

                    <h3>6. TARIFICATION DE LA LOCATION</h3>
                    <p>
                      La location sera réalisée au tarif indiqué sur le site Guy
                      Location Events au moment de la réservation. Les tarifs
                      peuvent être modifiés sans préavis. Une facture sera émise
                      dès la confirmation de votre réservation. Si les prix sont
                      ajustés après l'émission de la facture, celle-ci ne sera
                      pas modifiée rétroactivement.
                    </p>
                    <p>
                      Toute annulation effectuée plus de 72 heures avant le
                      début de la location entraînera des frais d’annulation
                      équivalents à 40 % du montant total de la location.
                    </p>

                    <h3>7. CAS DE FORCE MAJEURE</h3>
                    <p>
                      Nous ne pouvons être responsables des retards ou
                      annulations dus à des événements imprévus comme une grève
                      ou une catastrophe naturelle. Une solution de
                      remboursement ou de report pourra être envisagée selon
                      l'analyse de la situation.
                    </p>

                    <h3>8. PERTE OU VOL</h3>
                    <p>
                      Le locataire est responsable en cas de perte ou de vol des
                      équipements. Il devra rembourser leur valeur de
                      remplacement, basée sur le prix catalogue actuel.
                    </p>

                    <h3>9. ASSURANCE</h3>
                    <p>
                      Il incombe au locataire de souscrire une assurance pour
                      couvrir les risques de dommage, perte ou vol pendant la
                      période de location. Nous déclinons toute responsabilité
                      en cas de sinistre non couvert par cette assurance.
                    </p>

                    <h3>10. INSPECTION AU RETOUR</h3>
                    <p>
                      Le matériel sera inspecté dès son retour. Toute
                      non-conformité, tels que des dommages ou salissures
                      nécessitant un nettoyage spécifique, sera facturée au
                      locataire. Si un prestataire n'est pas choisi dans un
                      délai de 2 jours ouvrables, l'entreprise effectuera les
                      réparations et facturera les frais.
                    </p>

                    <h3>11. RÉSOLUTION DE LITIGE</h3>
                    <p>
                      En cas de litige, nous nous engageons à rechercher une
                      solution amiable. Si un accord n'est pas trouvé, le
                      différend sera porté devant le tribunal compétent situé à
                      notre siège social.
                    </p>

                    <h3>12. ACCEPTATION DES CONDITIONS</h3>
                    <p>
                      En signant le contrat de location, le locataire reconnaît
                      avoir pris connaissance et accepté les présentes
                      conditions générales de location sans réserve.
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </section>
          {/* CONDITION THE LOCATION END */}
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
