import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyBloodDonorPH - Find Blood Donors in the Philippines",
  description:
    "Connect with blood donors across the Philippines. Register as a donor or find donors by blood type and location for emergency blood needs.",
  keywords: [
    "blood donor",
    "Philippines",
    "blood donation",
    "emergency blood",
    "blood type",
    "donor registry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
