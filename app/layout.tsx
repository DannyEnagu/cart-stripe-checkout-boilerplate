import type { Metadata } from "next";
import localFont from 'next/font/local'
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import Providers from "@/provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const RedHatText = localFont({
  src: [
    {
      path: './fonts/RedHatText-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
    {
      path: './fonts/RedHatText-VariableFont_wght.ttf',
      style: 'normal',
    }
    // {
    //   path: '',
    //   style: 'normal',
    //   weight: '600'
    // },
    // {
    //   path: '',
    //   style: 'italic',
    //   weight: '400'
    // }
  ],
})


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Cart + Strip Boilerplate",
  description: "Demonstrate Cart Checkout with Stripe API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${RedHatText.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
