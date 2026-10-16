import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import InkTheme from "./components/InkTheme";
export const metadata = {
  title: "INK3D — Esport Accessories",
  description: "3D Printing The Game.",
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
