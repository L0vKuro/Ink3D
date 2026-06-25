import "./globals.css";

export const metadata = {
  title: "INK3D — Esport Accesories",
  description: "3D Printing The Game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
