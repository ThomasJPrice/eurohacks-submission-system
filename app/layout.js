import { Toaster } from "react-hot-toast";
import "./globals.css";

import localFont from 'next/font/local'

export const metadata = {
  title: "Eurohacks - Project Submission",
};

const franklinGothic = localFont({
  src: '../public/fonts/Franklin-Gothic.woff2',
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${franklinGothic.className}`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
