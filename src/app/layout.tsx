import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import {Providers} from "./providers"
import {Roboto , Poppins , Nunito_Sans} from "next/font/google"
import Footer from "@/components/Footer";
import {subscribe} from "node:diagnostics_channel";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "This is my portfolio site",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400' ,'700'],
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400' ,'700'],
  display: 'swap'
})

const nunito_sans = Nunito_Sans({
      subsets:["latin"],
      weight: ['400' ,'700'],
      display: 'swap'
}
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" suppressHydrationWarning>
      <body className={nunito_sans.className}>
        <Providers>
        <Navigation/> 
        {children}
          <Footer/>
        </Providers>
        </body>
    </html>
  );
}
