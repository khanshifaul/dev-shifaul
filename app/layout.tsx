import HiddenAccess from "@/components/admin/hidden-door";
import CursorWrapper from "@/components/cursor-wrapper";
import { AProviders } from "@/components/providers/apollo-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Head from "next/head";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="google-site-verification"
          content="lbyp2dC9_aYxIWYVGEV5cnZ74DaZK40hAyrvvfiZqCQ"
        />
      </Head>
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
                <AProviders>{children}</AProviders>
              </StoreProvider>
            </main>
          </CursorWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
