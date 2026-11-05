import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import InkTheme from "./components/InkTheme";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <InkTheme />
        <Analytics />
      </body>
    </html>
  );
}
