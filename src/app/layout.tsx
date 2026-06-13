import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exofttechnologies | Premium Software Development Company",
  description:
    "Exofttechnologies builds websites, apps, SaaS platforms and custom software for growing businesses.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "SaaS",
    "UI/UX design",
    "custom software",
    "AI automation",
  ],
  openGraph: {
    title: "Exofttechnologies | Premium Software Development Company",
    description:
      "Exofttechnologies builds websites, apps, SaaS platforms and custom software for growing businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300;400;500;600&family=Michroma&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
