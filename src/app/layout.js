import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next BLog Post</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}