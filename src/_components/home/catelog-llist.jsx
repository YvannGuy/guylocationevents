import Grid from "@mui/material/Grid2";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/_utils/commonFunction";

const CatalogList = ({ cards, className }) => {
  return (
    <section className={`catalog-list-area ${className}`}>
      <Grid className="container">
        <Grid className="row">
          <Grid className="col-lg-12">
            <Grid className="section-title">
              <h2>NOS MEILLEURS PRODUITS EN LOCATION DE SONORISATION</h2>
              <Image
                src="/images/title-border.png"
                width="130"
                height="16"
                alt="border"
              />
            </Grid>
          </Grid>

          {cards.map((card, index) => (
            <Grid className="col-lg-4" key={index}>
              <Grid className="single-card">
                <Grid className="content">
                  <Link
                    href={`single-page/${slugify(card.tag)}`}
                    className="image"
                  >
                    <Image
                      src={card.image}
                      width="375"
                      height="475"
                      alt={card.alt}
                    />
                    <span className="icon-box">
                      <Image
                        src="/images/plus-icon.png"
                        width="65"
                        height="65"
                        alt="icon"
                      />
                    </span>
                  </Link>
                  <Link
                    className="title"
                    href={`single-page/${slugify(card.tag)}`}
                  >
                    {card.title}
                  </Link>
                </Grid>
                <p className="tag">{card.tag}</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </section>
  );
};

export default CatalogList;
