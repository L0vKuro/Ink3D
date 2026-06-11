import "./globals.css";

export const metadata = {
  title: "INK3D — Bold Tech Accessories",
  description: "Bold tech accessories for those who don't blend in.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
