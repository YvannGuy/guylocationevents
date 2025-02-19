import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ContactInfo = () => {
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
                <p className="label">78 avenue des Champs-Élysées 75008</p>
                <p className="info">
                  Paris – Pour le retrait : chaque lundi, mercredi et vendredi (14h-00h)
                </p>
              </div>
            </div>
            {/* Téléphone */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="contact-info-wrap">
              <span className="icon">
                <a href="tel:+33651084994" style={{ color: 'inherit' }}>
                  <LocalPhoneIcon />
                </a>
              </span>
                <p className="label">
                  Contactez-nous au{" "}
                  <a
                      href="tel:+33651084994"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    +33 6 51 08 49 94
                  </a>
                </p>
                <p className="info">
                  Du lundi au dimanche de 0h30 à 21h30 et urgences de 21h30 à minuit
                </p>
              </div>
            </div>
            {/* Livraison */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="contact-info-wrap">
              <span className="icon">
                <LocalShippingIcon />
              </span>
                <p className="label">Livraison en Île-de-France par coursier</p>
                <p className="info">
                  Nous livrons en Île-de-France, 80€ TTC la course et en dehors, tarif sur devis
                </p>
              </div>
            </div>
            {/* Email */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="contact-info-wrap">
              <span className="icon">
                <a href="mailto:devis@guylocationevents.com" style={{ color: 'inherit' }}>
                  <EmailOutlinedIcon />
                </a>
              </span>
                <p className="label">Demande de devis par courrier</p>
                <p className="info">
                  Contactez-nous par mail pour un devis :{" "}
                  <a
                      href="mailto:devis@guylocationevents.com"
                      style={{ color: 'inherit', textDecoration: 'none' }}
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
