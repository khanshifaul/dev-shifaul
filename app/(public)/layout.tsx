// PublicLayout.tsx
import DevFooter from "@/components/devFooter";
import FloatingWidget from "@/components/floating-widget";
import NavBar from "@/components/navBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shifaul Islam - Aspiring Software Engineer | AI & BCI Enthusiast",
  description:
    "Welcome to the portfolio of Shifaul Islam, an aspiring software engineer passionate about AI and brain-computer interfaces. Explore projects, skills, and insights on technology and innovation.",
  keywords: [
    "Shifaul Islam",
    "Software Engineer",
    "AI",
    "BCI",
    "portfolio",
    "technology",
    "projects",
    "blog",
  ],
  openGraph: {
    title: "Shifaul Islam - Aspiring Software Engineer | AI & BCI Enthusiast",
    description:
      "Welcome to the portfolio of Shifaul Islam, an aspiring software engineer passionate about AI and brain-computer interfaces. Explore projects, skills, and insights on technology and innovation.",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shifaul Islam - Aspiring Software Engineer | AI & BCI Enthusiast",
    description:
      "Welcome to the portfolio of Shifaul Islam, an aspiring software engineer passionate about AI and brain-computer interfaces. Explore projects, skills, and insights on technology and innovation.",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col w-full h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth scrollbar-none">
      <NavBar className="sticky top-0 z-50 backdrop-blur-md" />
      <main className="flex-1 snap-y snap-mandatory">{children}</main>
      <DevFooter className="sticky bottom-0 z-50 backdrop-blur-md" />
      {/* Floating Widget */}
      <FloatingWidget />
    </div>
  );
}
