import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://exofttechnologies.com"),
  title: {
    default: "Exoft Technologies | Premium Software Development Company",
    template: "%s | Exoft Technologies",
  },
  description:
    "Exoft Technologies builds high-quality websites, mobile apps, SaaS platforms, and custom software solutions for growing businesses. Expert UI/UX design, AI automation, and full-stack development services.",
  keywords: [
    "software development company",
    "web development",
    "mobile app development",
    "SaaS development",
    "UI/UX design",
    "custom software solutions",
    "AI automation",
    "full-stack development",
    "React development",
    "Next.js development",
    "Exoft Technologies",
  ],
  authors: [{ name: "Exoft Technologies", url: "https://exofttechnologies.com" }],
  creator: "Exoft Technologies",
  publisher: "Exoft Technologies",
  category: "Technology",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    title: "Exoft Technologies | Premium Software Development Company",
    description:
      "Exoft Technologies builds high-quality websites, mobile apps, SaaS platforms, and custom software solutions for growing businesses.",
    url: "https://exofttechnologies.com",
    siteName: "Exoft Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Exoft Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exoft Technologies | Premium Software Development Company",
    description:
      "Exoft Technologies builds high-quality websites, mobile apps, SaaS platforms, and custom software solutions for growing businesses.",
    images: ["/icons/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://exofttechnologies.com",
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
        {/* Critical CSS — prevents zoom flash on mobile before JS loads */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            -webkit-text-size-adjust: 100% !important;
          }
          #html-preloader {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #000000 !important;
            z-index: 99999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          #html-preloader img {
            width: 100px !important;
            height: auto !important;
            max-width: 100px !important;
            max-height: 100px !important;
            object-fit: contain !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}} />
      </head>
      <body>
        {/* Inline HTML preloader — renders in initial HTML before JS loads */}
        <div id="html-preloader">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/exoft_loading.gif" alt="Loading..." />
        </div>

        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://exofttechnologies.com/#organization",
                  name: "Exoft Technologies",
                  url: "https://exofttechnologies.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://exofttechnologies.com/icons/android-chrome-512x512.png",
                    width: 512,
                    height: 512,
                  },
                  description:
                    "Exoft Technologies builds high-quality websites, mobile apps, SaaS platforms, and custom software solutions for growing businesses.",
                  foundingDate: "2024",
                  sameAs: [],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English"],
                  },
                  knowsAbout: [
                    "Web Development",
                    "Mobile App Development",
                    "SaaS Development",
                    "UI/UX Design",
                    "AI Automation",
                    "Custom Software Development",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://exofttechnologies.com/#website",
                  url: "https://exofttechnologies.com",
                  name: "Exoft Technologies",
                  publisher: {
                    "@id": "https://exofttechnologies.com/#organization",
                  },
                  inLanguage: "en-US",
                },
                {
                  "@type": "WebPage",
                  "@id": "https://exofttechnologies.com/#webpage",
                  url: "https://exofttechnologies.com",
                  name: "Exoft Technologies | Premium Software Development Company",
                  isPartOf: {
                    "@id": "https://exofttechnologies.com/#website",
                  },
                  about: {
                    "@id": "https://exofttechnologies.com/#organization",
                  },
                  description:
                    "Exoft Technologies builds high-quality websites, mobile apps, SaaS platforms, and custom software solutions for growing businesses.",
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
