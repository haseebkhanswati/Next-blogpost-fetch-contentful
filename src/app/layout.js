import "./globals.css";

export const metadata = {
  title: "My Blog",
  description: "A blog powered by Contentful",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}