import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "INK3D — Esport Accessories",
  description: "3D Printing The Game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://api.goaffpro.com/loader.js?shop=jczaxqshor" async></script>
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
