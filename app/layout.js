import ThemeProvider from "@/context/Theme";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Navbar, Footer } from '../components';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NFT Marketplace",
  description: "A one stop platform for buying and selling NFTs",
  icons: {
    icon: "/globe.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark:bg-nft-dark bg-white mih-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>

          <Script src="https://kit.fontawesome.com/a6d38f6541.js" crossorigin="anonymous"></Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
