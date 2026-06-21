import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anvit Divekar | Research Mentorship",
  description:
    "Helping high school students achieve first-author publications in peer-reviewed journals. Research at Harvard, Brown, Emory & Georgia Tech.",
  keywords: ["research mentorship", "high school research", "publications", "neuroscience", "STEM"],
  openGraph: {
    title: "Anvit Divekar | Research Mentorship",
    description: "Helping high school students achieve peer-reviewed publications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#05050f] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
