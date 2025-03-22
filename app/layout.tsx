import HiddenAccess from "@/components/admin/hidden-door";
import CursorWrapper from "@/components/cursor-wrapper";
import { AProviders } from "@/components/providers/apollo-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { AnimatePresence } from "framer-motion";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Shifaul Islam - Aspiring Software Engineer | AI & BCI Enthusiast",
  description:
    "Welcome to the portfolio of Shifaul Islam, an aspiring software engineer passionate about AI and brain-computer interfaces. Explore projects, skills, and insights on technology and innovation.",
  verification: {
    google: "lbyp2dC9_aYxIWYVGEV5cnZ74DaZK40hAyrvvfiZqCQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`w-full max-w-screen h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HiddenAccess />
          <CursorWrapper>
            <main
              className={`bg-linear-to-b from-blue-300  to-orange-100  dark:from-black  dark:to-gray-800 cursor-default`}
            >
              <StoreProvider>
                <AProviders>
                  <AnimatePresence>{children}</AnimatePresence>
                </AProviders>
              </StoreProvider>
            </main>
          </CursorWrapper>
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId="GT-552SZ8X" />
      <GoogleAnalytics gaId="G-EQNCKW71HP" />
    </html>
  );
}
