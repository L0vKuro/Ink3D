import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
