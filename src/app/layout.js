import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider , ClerkLoading , ClerkLoaded } from "@clerk/nextjs";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Next auth",
  description: "next auth with clerk",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkLoading>
            <div className={`flex justify-center items-center w-screen h-screen text-4xl font-bold`}>
              Loading...
            </div>
          </ClerkLoading>
          <ClerkLoaded >
            <Header />
            {children}
          </ClerkLoaded>
      </body>
    </html>
    </ClerkProvider>
  );
}
