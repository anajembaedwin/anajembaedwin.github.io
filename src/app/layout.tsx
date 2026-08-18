import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elias | Web Designer & Front-End Developer",
  description:
    "Elias is a web designer and front-end developer crafting responsive websites where technologies meet creativity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${firaCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-white font-mono">
        <Header />
        {children}
      </body>
    </html>
  );
}
