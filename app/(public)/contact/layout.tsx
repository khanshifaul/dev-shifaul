// PublicLayout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Shifaul Islam - Collaborate & Connect",
  description:
    "Get in touch with Shifaul Islam to discuss innovative projects, collaboration opportunities, or technology trends. Reach out via email, LinkedIn, or GitHub.",
  keywords: [
    "Contact",
    "Shifaul Islam",
    "collaboration",
    "technology",
    "email",
    "LinkedIn",
    "GitHub",
  ],
  openGraph: {
    title: "Contact Shifaul Islam - Collaborate & Connect",
    description:
      "Get in touch with Shifaul Islam to discuss innovative projects, collaboration opportunities, or technology trends.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Shifaul Islam - Collaborate & Connect",
    description:
      "Get in touch with Shifaul Islam for collaboration opportunities and technology discussions.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
