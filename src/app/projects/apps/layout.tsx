import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Projects",
  description:
    "Explore mobile apps built by Exoft Technologies — including hospitality workforce management platforms, catering staff apps, and event management solutions for iOS and Android.",
  keywords: [
    "mobile app development",
    "iOS app development",
    "Android app development",
    "hospitality app",
    "workforce management app",
    "Exoft Technologies apps",
  ],
  openGraph: {
    title: "Mobile App Projects | Exoft Technologies",
    description:
      "Explore mobile apps built by Exoft Technologies — hospitality workforce management, catering staff, and event management solutions.",
    url: "https://exofttechnologies.com/projects/apps",
    type: "website",
  },
  alternates: {
    canonical: "https://exofttechnologies.com/projects/apps",
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
