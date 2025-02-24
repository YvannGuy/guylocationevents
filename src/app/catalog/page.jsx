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
      image: "/images/c-1.png",
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
      image: "/images/c-2.png",
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
      image: "/images/c-3.png",
      slug: "/pack-confort",
      alt: t(
        "80-150 personnes L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne"
      ),
      title: t(
        "80-150 personnes L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne"
      ),
      tag: t("PACK CONFORT"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-premium",
      alt: t(
        "120-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "120-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-prestige",
      alt: t(
        "200-300 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      title: t(
        "200-300 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-grand-event",
      alt: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne"
      ),
      title: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne"
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
