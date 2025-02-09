import Script from "next/script";
import ThemeProvider from "@/context/Theme";

import { Footer, Navbar } from "@/components";
import "./globals.css";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = localFont({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "NFT Marketplace",
  description: "A one stop platform for all your NFT needs",
  icons: {
    icon: "/globe.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          diasbleTransitionOnChange
        >
          <div className="dark:bg-nft-dark bg-white min-h-screen">
            <Navbar />
            <div className='pt-65'>
              {children}
            </div>
            <Footer />
          </div>

          <Script
            src="https://kit.fontawesome.com/a6d38f6541.js"
            crossorigin="anonymous"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
