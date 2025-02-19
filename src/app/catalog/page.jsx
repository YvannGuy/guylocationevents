
import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import CommonHero from "@/_components/home/hero";
import { packages } from "@/_utils/packages";

const slides = [
  {
    backgroundImage: "/images/catalog-bg.png",
    title: "Catalogue",
  },
];

const CatalogPage = async () => {
  return (
    <Fragment>
      <PublicLayout>
        <div className="catalog">
          <CommonHero slides={slides} />
          <CatalogList cards={packages} className={"catalogpage"} />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
