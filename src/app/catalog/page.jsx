import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import CommonHero from "@/_components/home/hero";
import { getTranslations } from "next-intl/server";

const CatalogPage = async () => {
  const t = await getTranslations();

  const slides = [
    {
      backgroundImage: "/images/catalog-bg.png",
      title: t("Catalogue"),
    },
  ];
  const packages = [
    {
      image: "/images/packstandard1.jpg",
      slug: "/pack-standard",
      alt: t(
        "20-50 Personnes, Idéal pour les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "20-50 Personnes, Idéal pour les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK STANDARD"),
    },
    {
      image: "/images/packessentiel.jpg",
      slug: "/pack-essentiel",
      alt: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK ESSENTIEL"),
    },
    {
      image: "/images/packconfort.jpg",
      slug: "/pack-confort",
      alt: t(
        "100-150 personnes L’équilibre parfait entre puissance et qualité pour des événements de taille moyenne"
      ),
      title: t(
        "100-150 personnes L’équilibre parfait entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK CONFORT"),
    },
    {
      image: "/images/packpremium.jpg",
      slug: "/pack-premium",
      alt: t(
        "150-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "150-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
    },
    {
      image: "/images/packprestige.jpg",
      slug: "/pack-prestige",
      alt: t(
        "200-250 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      title: t(
        "200-250 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
    },
    {
      image: "/images/packgrandevent.jpg",
      slug: "/pack-grand-event",
      alt: t(
        "250-250 personnes L’équilibre parfait  entre puissance et qualité pour des événements de taille moyenne"
      ),
      title: t(
        "250-250 personnes L’équilibre parfait  entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK GRAND EVENT"),
    },
  ];
  return (
    <Fragment>
      <PublicLayout>
        <div className="catalog">
          <CommonHero slides={slides} />
          <CatalogList cards={packages} className="catalogpage" />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
