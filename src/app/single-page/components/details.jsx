"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import CtaShort from "@/_components/single-page/cta";
import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductDetailsInfo = (props) => {
  const t = useTranslations();
  const packages = [
    {
      image: "/images/products/bigpackstandard.jpg",
      slug: "/pack-standard",
      title: t(
        "Pack Sonorisation Professionnelle Mac Mah AS 108 avec Housses Supports Mixeur Promix 8 et Câbles XLR"
      ),
      tag: t("PACK STANDARD"),
      specifications: [
        { name: t("Enceintes"), value: "Mac Mah AS 108 (x2)" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte active à 2 voies (Système Bass Reflex)",
        },
        {
          name: t("Amplification"),
          value:
            "Bi-amplificateur avec amplification Class D (LF) et Class AB (HF)",
        },
        { name: t("Puissance RMS"), value: "200W LF + 50W HF" },
        { name: t("Puissance crête"), value: "400W LF + 100W HF" },
        {
          name: t("Protection"),
          value: "Protection contre la surchauffe, surcharge, et sous-tension",
        },
        {
          name: t("Haut-parleur"),
          value: '∅8" (203 mm) pour le LF, ∅1" (25 mm) titane pour le tweeter',
        },
        { name: t("Réponse en fréquence"), value: "55 Hz – 20 kHz" },
        { name: t("Dispersion"), value: "H 90° x V 60°" },
        {
          name: t("Connectivité Bluetooth 50"),
          value: "Streaming audio avec appairage possible de 2 enceintes",
        },
        { name: t("Poids de chaque enceinte"), value: "10 kg" },
      ],
      price: "80.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Le pack Mac Mah AS 108 est conçu pour offrir une performance audio optimale pour des événements de petite à moyenne envergure tels que des réunions intimes des séminaires des conférences ou des événements privés Composé de deux enceintes amplifiées ce système garantit un son clair puissant et bien équilibré parfait pour une diffusion sonore de qualité Grâce à son système Bass Reflex il offre également des basses profondes et riches assurant ainsi une couverture sonore complète et dynamique dans des espaces de taille modérée"
      ),
      description2: t(
        "Ce pack est complet et inclut tout le nécessaire pour une utilisation facile et pratique lors de vos événements Il comprend des housses de protection pour sécuriser vos enceintes pendant le transport et des supports robustes pour faciliter linstallation Avec la connectivité Bluetooth 50 vous pouvez également diffuser votre musique sans fil offrant ainsi plus de flexibilité pour lorganisation de vos événements"
      ),
      subtitle: t(
        "Ce pack tout-en-un comprend tout le nécessaire pour offrir un son de qualité supérieure lors de vos événements Que ce soit pour une réunion intime ou un événement plus grand ce pack répondra à vos besoins"
      ),
      informations: [
        t(
          "Pack Complet 2x Mac Mah AS 108 Housses de protection Supports robustes"
        ),
        t("Mixeur Promix 8 avec contrôle de volume précis"),
        t("Connectivité 2x Plugger Câble XLR 6m Easy"),
        t(
          "Utilisation Idéal pour des événements allant de petites réunions à des conférences"
        ),
      ],
    },
    {
      image: "/images/products/bickpessentiel.jpg",
      slug: "/pack-essentiel",
      title: t(
        "Pack Sonorisation Professionnel Mac Mah AS 115 avec Housses Supports Mixeur Promix 8 et Câbles XLR"
      ),
      tag: t("PACK ESSENTIEL"),
      specifications: [
        { name: t("Enceintes"), value: "Mac Mah AS 115 (x2)" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte active à 2 voies (Système Bass Reflex)",
        },
        {
          name: t("Amplification"),
          value:
            "Bi-amplificateur avec amplification Class D (LF) et Class AB (HF)",
        },
        { name: t("Puissance RMS"), value: "400W LF + 100W HF" },
        { name: t("Puissance crête"), value: "800W LF + 200W HF" },
        { name: t("SPL max"), value: "131 dB" },
        {
          name: t("Haut-parleur"),
          value:
            '∅15" (380 mm) pour le LF, ∅1,75" (44 mm) titane pour le tweeter',
        },
        { name: t("Réponse en fréquence"), value: "30 Hz – 20 kHz" },
        {
          name: t("Connectivité Bluetooth 50"),
          value: "Streaming audio avec appairage possible de 2 enceintes",
        },
        { name: t("Poids de chaque enceinte"), value: "21 kg" },
      ],
      price: "105.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Pack audio complet pour des événements de taille moyenne Ce pack comprend deux enceintes amplifiées Mac Mah AS 115 idéales pour des séminaires petits concerts ou fêtes privées Offrant une puissance de 400W RMS pour des basses profondes et des aigus clairs ce système assure une couverture sonore optimale Le mixeur Promix 8 inclus permet un contrôle précis du son tandis que les câbles et les supports garantissent une installation simple et fiable"
      ),
      description2: t(
        "La connectivité Bluetooth 50 permet de diffuser de laudio en streaming avec la possibilité de connecter deux enceintes pour une couverture sonore encore plus étendue Ce pack est livré avec des housses de protection robustes et des pieds réglables pour une installation flexible Parfait pour les événements professionnels ou privés de taille moyenne"
      ),
      subtitle: t(
        "Ce pack tout-en-un comprend tout le nécessaire pour offrir un son puissant et clair lors de vos événements de taille moyenne Idéal pour des séminaires concerts ou fêtes privées ce pack répondra à vos besoins"
      ),
      informations: [
        t(
          "Sonorisation parfaite pour des événements allant de 50 à 100 personnes"
        ),
        t(
          "Puissance et qualité sonore adaptées aux petits concerts et séminaires"
        ),
        t(
          "Installation facile avec housses de protection et supports ajustables"
        ),
        t("Connectivité Bluetooth 50 pour un streaming audio sans fil"),
      ],
    },
    {
      image: "/images/products/bickpconfort.jpg",
      slug: "/pack-confort",
      title: t(
        "Pack Sonorisation Professionnelle FBT X-LITE 115A avec Caisson X-SUB 118SA Housses Supports et Mixeur Promix 8"
      ),
      tag: t("PACK CONFORT"),
      specifications: [
        { name: t("Enceintes"), value: "FBT X-LITE 115A (x2)" },
        { name: t("Caisson de basse"), value: "FBT X-SUB 118SA" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte 2 voies avec amplification numérique Class D",
        },
        { name: t("Puissance RMS LF HF"), value: "1200W / 300W" },
        { name: t("SPL maximum"), value: "130dB" },
        { name: t("Réponse en fréquence"), value: "42Hz – 20kHz" },
        {
          name: t("Haut parleur Enceinte"),
          value: '15" (381mm), bobine de 2.5" (63.5mm)',
        },
        {
          name: t("Tweeter"),
          value: '1" (25.4mm) avec diaphragme de 1.4" (35.6mm)',
        },
        {
          name: t("Connectivité Bluetooth 50"),
          value: "Streaming audio sans fil",
        },
        { name: t("Poids de chaque enceinte"), value: "19.3 kg" },
      ],
      price: "125.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Le pack XLITE 115A de FBT est conçu pour fournir un son clair et puissant idéal pour des événements comme des mariages des soirées privées ou des conférences Ce pack comprend deux enceintes amplifiées qui diffusent le son avec précision un caisson de basse qui ajoute de la profondeur aux basses fréquences et des housses de protection sur mesure pour faciliter le transport et garantir la sécurité de votre équipement Avec une puissance suffisante pour couvrir de grandes salles ce système offre une qualité sonore exceptionnelle pour vos événements"
      ),
      description2: t(
        "Ce pack est équipé de la technologie Bluetooth 50 permettant de diffuser de la musique sans fil depuis votre téléphone ou un autre appareil Il offre également un son bien réparti dans la salle avec un niveau sonore pouvant atteindre 130 dB Le caisson de basse FBT XSUB 118SA renforce les basses et permet dobtenir un son plus profond, parfait pour des événements de grande envergure Chaque composant est protégé par des housses robustes pour assurer leur sécurité pendant le transport"
      ),
      subtitle: t(
        "Ce pack tout-en-un comprend tout le nécessaire pour offrir un son puissant et clair lors de vos événements de taille moyenne Idéal pour des séminaires concerts ou fêtes privées ce pack répondra à vos besoins"
      ),
      informations: [
        t("Idéal pour des événements allant de 100 à 150 personnes"),
        t("Puissance et clarté adaptées pour des conférences et des mariages"),
        t("Installation facile avec housses de protection et supports inclus"),
        t(
          "Connectivité Bluetooth 50 pour un streaming audio sans fil de qualité professionnelle"
        ),
        t(
          "Caisson de basse puissant FBT X-SUB 118SA pour des basses profondes et un SPL de 136 dB"
        ),
      ],
    },
    {
      image: "/images/products/bickpremium.jpg",
      slug: "/pack-premium",
      title: t(
        "Pack Sonorisation Professionnelle FBT XLITE 115A avec Caisson XSUB 118SA Mixeur Promix 16 et Câbles XLR"
      ),
      tag: t("PACK PREMIUM"),
      specifications: [
        { name: t("Enceintes"), value: "FBT X-LITE 115A (x2)" },
        { name: t("Caisson de basse"), value: "FBT X-SUB 118SA" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte 2 voies avec amplification numérique Class D",
        },
        { name: t("Puissance RMS LF HF"), value: "1200W / 300W" },
        { name: t("SPL maximum"), value: "130dB" },
        { name: t("Réponse en fréquence"), value: "42Hz – 20kHz" },
        {
          name: t("Haut parleur Enceinte"),
          value: '15" (381mm), bobine de 2.5" (63.5mm)',
        },
        {
          name: t("Tweeter"),
          value: '1" (25.4mm) avec diaphragme de 1.4" (35.6mm)',
        },
        { name: t("Poids de chaque enceinte"), value: "19.3 kg" },
        { name: t("Poids du caisson de basse"), value: "34 kg" },
      ],
      price: "135.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Le Pack Premium FBT X-LITE 115A est une solution de sonorisation professionnelle idéale pour des événements allant de taille moyenne à grande Ce pack tout-en-un inclut des enceintes amplifiées FBT X-LITE 115A un caisson de basse FBT X-SUB 118SA et un mixeur Promix 16 avec 16 canaux offrant une gestion parfaite du son Il est parfait pour des mariages des soirées privées ou des conférences"
      ),
      description2: t(
        "Avec la connectivité Bluetooth 50, vous pouvez diffuser de laudio sans fil tout en garantissant une couverture sonore exceptionnelle grâce à un SPL max de 130 dB Le pack inclut des câbles XLR 6m ainsi que des housses de protection pour chaque composant, assurant une sécurité pendant le transport Ce pack est conçu pour vous offrir un son de qualité supérieure dans des événements professionnels et privés de taille moyenne à grande"
      ),
      subtitle: t(
        "Un pack flexible et performant pour des événements professionnels de taille moyenne à grande offrant une sonorisation fiable et de haute qualité"
      ),
      informations: [
        t(
          "Pack complet 2x FBT XLITE 115A FBT XSUB 118SA Housses de protection"
        ),
        t("Mixeur HPA Promix 16 avec 16 canaux et contrôle de volume précis"),
        t("Connectivité 8x Plugger Câble XLR 6m Easy"),
        t(
          "Utilisation Idéal pour des événements allant de mariages à des conférences professionnelles"
        ),
        t(
          "SPL maximum 130 dB pour une couverture sonore de qualité professionnelle"
        ),
        t(
          "Caisson de basse FBT X-SUB 118SA pour des basses profondes et un SPL de 136 dB"
        ),
      ],
    },
    {
      image: "/images/products/bickprestige.jpg",
      slug: "/pack-prestige",
      title: t(
        "Pack Sonorisation Haut de Gamme FBT XLITE 115A avec Caisson XSUB 118SA Mixeur Promix 16 et Supports Professionnels"
      ),
      tag: t("PACK PRESTIGE"),
      specifications: [
        { name: t("Enceintes"), value: "FBT X-LITE 115A (x2)" },
        { name: t("Caisson de basse"), value: "FBT X-SUB 118SA" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte 2 voies avec amplification numérique Class D",
        },
        { name: t("Puissance RMS LF HF"), value: "1200W / 300W" },
        { name: t("SPL maximum"), value: "130dB" },
        { name: t("Réponse en fréquence"), value: "42Hz – 20kHz" },
        {
          name: t("Haut parleur Enceinte"),
          value: '15" (381mm), bobine de 2.5" (63.5mm)',
        },
        {
          name: t("Tweeter"),
          value: '1" (25.4mm) avec diaphragme de 1.4" (35.6mm)',
        },
        {
          name: t("Caisson de basse"),
          value: '18" (457mm) avec bobine de 3" (76.2mm)',
        },
        { name: t("Poids de chaque enceinte"), value: "19.3 kg" },
        { name: t("Poids du caisson de basse"), value: "34 kg" },
      ],
      price: "175.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Le Pack Prestige FBT XLITE 115A est conçu pour offrir une performance sonore de qualité professionnelle adaptée aux événements les plus ambitieux Ce pack haut de gamme inclut des enceintes puissantes FBT XLITE 115A un caisson de basse FBT XSUB 118SA pour des basses profondes et un mixeur Promix 16 à 16 canaux pour un contrôle audio complet Idéal pour des concerts des conférences de grande envergure ou des événements où une gestion fine du son est essentielle"
      ),
      description2: t(
        "Ce pack inclut également la connectivité Bluetooth 50 pour une diffusion audio sans fil ainsi que des housses de protection et des supports denceintes BoomTone DJ SV 200 II assurant une installation stable et professionnelle Le caisson de basse renforce la profondeur sonore et le SPL de 130 dB garantit une couverture optimale pour des espaces plus grands"
      ),
      subtitle: t(
        "Le choix ultime pour des événements professionnels Un son puissant et un contrôle total grâce à des équipements de qualité supérieure"
      ),
      informations: [
        t(
          "Pack complet 2 x FBT XLITE 115A FBT XSUB 118SA Housses de protection Supports BoomTone DJ SV 200 II"
        ),
        t(
          "Mixeur HPA Promix 16 avec 16 canaux pour un contrôle complet du son"
        ),
        t("Connectivité 10 x Plugger Câble XLR 6m Easy"),
        t(
          "Utilisation Conçu pour des événements professionnels concerts conférences de grande envergure"
        ),
        t(
          "SPL maximum 130 dB pour une couverture sonore optimale dans des espaces vastes"
        ),
        t(
          "Caisson de basse FBT XSUB 118SA pour des basses profondes et puissantes"
        ),
      ],
    },
    {
      image: "/images/products/bickgrandevent.jpg",
      slug: "/pack-grand-event",
      title: t(
        "Pack Sonorisation Haute Performance FBT XLITE 115A Mac Mah AS 115 avec Caisson X-SUB 118SA Mixeur Promix 16 et Supports Professionnels"
      ),
      tag: t("PACK GRAND ÉVÉNEMENT"),
      specifications: [
        {
          name: t("Enceintes"),
          value: "FBT X-LITE 115A (x2) + Mac Mah AS 115 (x2)",
        },
        { name: t("Caisson de basse"), value: "FBT X-SUB 118SA" },
        {
          name: t("Type d'enceinte"),
          value: "Enceinte 2 voies avec amplification numérique Class D",
        },
        {
          name: t("Puissance RMS LF HF"),
          value: "1200W / 300W (X-LITE) + 400W LF + 100W HF (AS 115)",
        },
        {
          name: t("Réponse en fréquence"),
          value: "42Hz – 20kHz (X-LITE) + 55Hz – 20kHz (AS 115)",
        },
        {
          name: t("Haut parleur X-LITE"),
          value: '15" (381mm), bobine de 2.5" (63.5mm)',
        },
        { name: t("Haut parleur AS 115"), value: '15" (380mm)' },
        {
          name: t("Caisson de basse"),
          value: '18" (457mm) avec bobine de 3" (76.2mm)',
        },
        { name: t("Poids de chaque enceinte X-LITE"), value: "19.3 kg" },
        { name: t("Poids de chaque enceinte AS 115"), value: "21 kg" },
        { name: t("Poids du caisson de basse"), value: "34 kg" },
      ],
      price: "195.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Le Pack Grand Événement est conçu pour offrir un son puissant et clair idéal pour des événements de grande envergure comme des mariages des concerts ou des événements en extérieur Ce pack inclut deux enceintes FBT XLITE 115A et deux Mac Mah AS 115 ainsi quun caisson de basse FBT XSUB 118SA pour des basses profondes et enrichissantes Avec le mixeur HPA Promix 16 vous pourrez contrôler facilement tous les sons et ajuster la musique selon vos besoins"
      ),
      description2: t(
        "Ce pack garantit une couverture sonore parfaite pour les grands espaces Il inclut également des housses de protection pour tous les équipements des supports BoomTone DJ SV 200 II pour assurer une installation stable et sécurisée ainsi que des câbles XLR 6m pour une connexion fiable En plus la connectivité Bluetooth 50 vous permet de diffuser de la musique sans fil ajoutant encore plus de flexibilité à votre événement"
      ),
      subtitle: t(
        "Un pack complet pour offrir un son de qualité professionnelle lors de vos événements de grande taille"
      ),
      informations: [
        t(
          "Pack complet 2 x FBT XLITE 115A  2 x Mac Mah AS 115  FBT XSUB 118SA Housses de protection Supports BoomTone DJ SV 200 II"
        ),
        t("Mixeur HPA Promix 16 avec 16 canaux pour un contrôle précis du son"),
        t("Connectivité 12 x Plugger Câble XLR 6m Easy"),
        t(
          "Utilisation Parfait pour des événements extérieurs mariages de grande ampleur concerts et festivals"
        ),
        t(
          "Caisson de basse FBT X-SUB 118SA pour des basses profondes et un son puissant"
        ),
      ],
    },

    {
      image: "/images/products/bickphotoboothprint.jpg",
      slug: "/photobooth-print",
      title: t(
        "Photobooth Professionnel avec Impression Souvenirs Instantanés et Expérience Unique"
      ),
      tag: t("Photobooth Print"),
      specifications: [
        {
          name: t("Appareil photo"),
          value:
            "Reflex numérique haute définition pour des clichés professionnels",
        },
        {
          name: t("Éclairage"),
          value: "Anneau LED ajustable pour un rendu optimal",
        },
        {
          name: t("Partage numérique"),
          value: "Envoi par e-mail, QR code ou réseaux sociaux",
        },
        {
          name: t("Connectivité"),
          value: "WiFi et USB pour récupération des fichiers",
        },
        {
          name: t("Transport"),
          value: "Housse de protection et installation rapide",
        },
      ],
      price: "195.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Créez des souvenirs inoubliables avec notre Photobooth Professionnel avec Impression Idéal pour les mariages, anniversaires soirées dentreprise événements privés ou professionnels ce photobooth permet à vos invités de capturer des moments fun et de repartir avec leurs photos imprimées en quelques secondes"
      ),
      description2: t(
        "Avec son écran tactile intuitif son appareil photo haute résolution et son imprimante instantanée il garantit une expérience fluide rapide et immersive Son design élégant et compact sadapte à tous les événements et sa personnalisation permet dajouter cadres filtres et logos pour une touche unique"
      ),
      subtitle: t(
        "Un photobooth fun et interactif qui imprime instantanément les souvenirs de vos invités"
      ),
      informations: [
        t(
          "Impression instantanée Vos invités repartent avec un souvenir papier en quelques secondes"
        ),
        t(
          "Écran tactile Interface fluide et intuitive pour une utilisation sans effort"
        ),
        t(
          "Haute qualité photo Appareil photo HD pour des images nettes et lumineuses"
        ),
        t(
          "Éclairage LED professionnel Assure des clichés parfaits dans toutes les conditions"
        ),
        t(
          "Partage numérique Envoi par email QR code ou réseaux sociaux en complément de limpression"
        ),
        t(
          "Personnalisation avancée Ajoutez des cadres filtres et logos pour une expérience unique"
        ),
        t("Installation rapide et facile Transportable et plug play"),
      ],
    },

    {
      image: "/images/products/bickring.jpg",
      slug: "/photobooth-ring",
      title: t(
        "Photobooth Professionnel Animation Interactive pour vos Événements"
      ),
      tag: t("Photobooth Print"),
      specifications: [
        {
          name: t("Appareil photo"),
          value:
            "Haute définition avec capteur optimisé pour faible luminosité",
        },
        {
          name: t("Éclairage"),
          value: "Anneau LED ajustable pour des clichés professionnels",
        },
        {
          name: t("Écran tactile"),
          value: "Interface fluide et intuitive pour une utilisation facile",
        },
        {
          name: t("Partage en ligne"),
          value: "Envoi par e-mail, QR code et réseaux sociaux",
        },
        {
          name: t("Connectivité"),
          value: "WiFi et USB pour récupération des fichiers",
        },
        {
          name: t("Transport"),
          value: "Housse de protection fournie pour faciliter le déplacement",
        },
      ],
      price: "195.00€ TTC",
      unite: t("Par Jour Week-end"),
      description: t(
        "Ajoutez une touche fun et immersive à vos événements avec notre Photobooth Professionnel Idéal pour les mariages, anniversaires soirées dentreprise lancements de produits et autres événements il permet à vos invités de capturer des souvenirs uniques et de les partager instantanément"
      ),
      description2: t(
        "Notre photobooth est équipé dun écran tactile interactif dun appareil photo haute résolution et dun éclairage LED professionnel pour des clichés parfaits dans toutes les conditions Grâce à sa connectivité WiFi vos invités peuvent envoyer leurs photos par email ou les partager directement sur les réseaux sociaux en quelques secondes"
      ),
      subtitle: t(
        "Un photobooth 100 digital et interactif pour des souvenirs inoubliables"
      ),
      informations: [
        t("Photobooth professionnel avec écran tactile 10 interactif"),
        t("Appareil photo HD pour des images nettes et lumineuses"),
        t("Éclairage LED intégré pour un rendu optimal même en basse lumière"),
        t("Partage instantané envoi des photos par e-mail ou QR code"),
        t("Personnalisation Filtres et cadres pour une expérience unique"),
        t("Galerie en ligne accès aux photos après lévénement"),
        t("Installation rapide Plug Play aucun réglage compliqué"),
      ],
    },
  ];

  const packageData =
    props?.slug !== "pack-video"
      ? packages.find((item) => item.slug == `/${props?.slug}`)
      : {
          image: "/images/products/bickpvideo.jpg",
          slug: "/pack-video",
          title: t(
            "Pack Vidéo Complet Epson EB-S27 avec Écran Portatif et Trépied Stable"
          ),
          tag: t("PACK VIDÉO"),
          specifications: [
            { name: t("Vidéoprojecteur"), value: "Epson EB-S27" },
            {
              name: t("Écran de projection"),
              value: "Écran portatif 100 pouces (2,26 m x 1,4 m)",
            },
            { name: t("Trépied"), value: "Trépied stable et réglable" },
            { name: t("Poids du vidéoprojecteur"), value: "2.5 kg" },
            { name: t("Poids de l'écran"), value: "5.5 kg" },
            { name: t("Dimensions de lécran"), value: "2,26 m x 1,4 m" },
          ],
          price: "50.00€ TTC",
          unite: t("Par Jour Week-end"),
          description: t(
            "Le Pack Vidéo est conçu pour offrir une solution complète et pratique pour vos présentations et projections Il comprend un vidéoprojecteur Epson EB-S27 un écran de projection portatif de 100 pouces et un trépied stable et réglable pour installer facilement lécran Ce pack est idéal pour des réunions des conférences ou tout autre événement nécessitant une projection de qualité"
          ),
          description2: t(
            "Avec cet équipement vous obtiendrez des images nettes et claires grâce au vidéoprojecteur Epson tout en bénéficiant dun écran portatif facile à transporter et à installer Le trépied ajustable vous permet de positionner lécran à la hauteur souhaitée pour un meilleur confort de visionnage Ce pack est parfait pour vos événements professionnels ou privés nécessitant une projection simple et efficace"
          ),
          subtitle: t(
            "Une solution simple et pratique pour vos projections et présentations de qualité"
          ),
          informations: [
            t(
              "Pack complet Vidéoprojecteur Epson EB-S27 Écran portatif 100 pouces Trépied réglable"
            ),
            t(
              "Utilisation Idéal pour des présentations réunions conférences ou projections en extérieur"
            ),
            t(
              "Facile à transporter et à installer avec des réglages simples pour un confort optimal"
            ),
            t(
              "Écran de grande taille pour une visibilité maximale lors de vos événements"
            ),
          ],
        };
  return (
    <div className="single-page">
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
            <h1 className="title">{packageData.tag}</h1>
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
      <section className="product-details">
        <Grid className="container">
          <Grid className="row">
            <Grid className="col-lg-8 col-12">
              {/* product image */}
              <Grid className="block-gallery">
                <Image
                  src={packageData.image}
                  className="w-full"
                  width={800}
                  height={475}
                  alt={packageData.title}
                />
              </Grid>
              {/* product image */}
              <Grid className="product-content">
                <h2 className="name">{packageData.title}</h2>
                <Grid className="description-box">
                  <h3 className="common-title">
                    {t("Description")}
                    <span className="border border-short"></span>
                    <span className="border border-long"></span>
                    <span className="border border-middle"></span>
                  </h3>
                  <h4>{packageData.subtitle}</h4>
                  <p>{packageData.description}</p>
                  <p>{packageData.description2}</p>

                  <ul className="product-key-points">
                    {packageData.informations.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Grid>
                <Grid className="specification-box">
                  <h3 className="common-title">
                    {t("Specification")}
                    <span className="border border-short"></span>
                    <span className="border border-long"></span>
                    <span className="border border-middle"></span>
                  </h3>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableBody>
                        {packageData.specifications.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.value}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="col-lg-4 col-12">
              <aside className="details-sidebar-wrap">
                <div className="details-sidebar">
                  <Grid className="price-tag">
                    <h5>
                      <span className="border border-short"></span>
                      <span className="border border-long"></span>
                      {packageData.price}
                      <span className="border border-short-right"></span>
                      <span className="border border-long-right"></span>
                    </h5>
                    <p>{packageData.unite}</p>
                  </Grid>
                  <Grid className="book-btn">
                    <Link href="/reservation" className="view-more-btn">
                      {t("Book Now")}
                      <EastIcon />
                    </Link>
                  </Grid>
                </div>
              </aside>
            </Grid>
          </Grid>
        </Grid>
      </section>
      {/* Product details START END */}
      <CtaShort />
    </div>
  );
};

export default ProductDetailsInfo;
