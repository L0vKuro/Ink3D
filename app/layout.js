import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import InkTheme from "./components/InkTheme";
import ScrollProgress from "./components/fx/ScrollProgress";
import CursorTrail from "./components/fx/CursorTrail";
import FreeShipMeter from "./components/fx/FreeShipMeter";

export const metadata = {
  metadataBase: new URL("https://ink3dshop.com"),
  title: "INK3D — Esport Accessories",
  description: "3D Printing The Game. Custom esports team accessories, 3D printed in Milford, NH.",
  openGraph: {
    title: "INK3D — Esport Accessories",
    description: "3D Printing The Game. Custom esports team accessories, 3D printed in Milford, NH.",
    url: "https://ink3dshop.com",
    siteName: "INK3D Studio",
    images: [{ url: "/ink3d_v4_transparent_1.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INK3D — Esport Accessories",
    description: "3D Printing The Game.",
    images: ["/ink3d_v4_transparent_1.png"],
  },
};

export const viewport = {
  themeColor: "#050505",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INK3D Studio",
  url: "https://ink3dshop.com",
  logo: "https://ink3dshop.com/ink3d_v4_transparent_1.png",
  sameAs: [
    "https://x.com/ink3dStudio",
    "https://www.tiktok.com/@ink3d.studio",
    "https://discordapp.com/invite/rv99duMaW6",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <FreeShipMeter />
        </CartProvider>
        <InkTheme />
        <ScrollProgress />
        <CursorTrail />
        <Analytics />
      </body>
    </html>
  );
}
