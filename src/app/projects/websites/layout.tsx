import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Projects",
  description:
    "Explore websites built by Exoft Technologies — including restaurant websites, architecture firm sites, and event management platforms with modern design and performance.",
  keywords: [
    "website development",
    "web design",
    "restaurant website",
    "architecture website",
    "business website development",
    "Exoft Technologies websites",
  ],
  openGraph: {
    title: "Website Projects | Exoft Technologies",
    description:
      "Explore websites built by Exoft Technologies — restaurant, architecture, and event management platforms with modern design.",
    url: "https://exofttechnologies.com/projects/websites",
    type: "website",
  },
  alternates: {
    canonical: "https://exofttechnologies.com/projects/websites",
  },
};

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
