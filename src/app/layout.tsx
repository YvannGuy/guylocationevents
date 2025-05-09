import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/_components/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "@/_styles/global.css";
import "@/_styles/style.scss";
import ClientLayouts from "@/_components/client-layout";

// ✅ SEO Optimisé
export const metadata: Metadata = {
  title: {
    template: "%s | Guy Location Events",
    default: "Guy Location Events - Location Sono, Vidéo & Photobooth",
  },
  description:
      "Guy Location Events propose la location de sonorisation, vidéoprojecteurs, photobooth et matériel audiovisuel en Île-de-France. Profitez de nos équipements professionnels pour vos événements !",
  keywords: [
    "location sono",
    "location vidéo",
    "location photobooth",
    "équipement audiovisuel",
    "matériel événementiel",
    "location sonorisation",
    "location vidéoprojecteur",
    "événement Île-de-France",
    "location mariage",
    "location entreprise",
    "location conférence"
  ],
  openGraph: {
    title: "Guy Location Events - Location Sono, Vidéo & Photobooth",
    url: "https://www.guylocationevents.com",
    description:
        "Guy Location Events met à votre disposition du matériel de sonorisation, vidéoprojecteurs et photobooth pour tous vos événements en Île-de-France.",
    images: [
      {
        url: "/images/preview.jpg",
        secureUrl: "/images/preview.jpg",
        alt: "Guy Location Events - Location Sono, Vidéo & Photobooth",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "fr-FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.guylocationevents.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guy Location Events - Location Sono, Vidéo & Photobooth",
    description:
        "Besoin de matériel audiovisuel pour vos événements ? Guy Location Events propose la location de sonorisation, vidéoprojecteurs et photobooth en Île-de-France.",
    creator: "@GuylocationEvents",
    images: ["/images/preview.jpg"],
  },
};

// ✅ Correction : `RootLayout` est un Server Component (pas de "use client")
export default async function RootLayout({
                                           children,
                                         }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
      <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
      <NextIntlClientProvider messages={messages}>
        <AppRouterCacheProvider>
          <NextTopLoader
              color="#007aff"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #007aff,0 0 5px #007aff"
              template='<div class="bar" role="bar"><div class="peg"></div></div>
    <div class="spinner" role="spinner"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg></div>'
              zIndex={1600}
              showAtBottom={false}
          />
          <ThemeProvider theme={lightTheme}>
            <ClientLayouts>{children}</ClientLayouts>
            <CssBaseline />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
      <Analytics /> {/* Vercel Analytics */}
      </body>
      </html>
  );
}
