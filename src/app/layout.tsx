import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bao Phat Art",
  description: "Chuyên thiết kế và thi công các công trình kiến trúc – nội thất trọn gói. Chúng tôi mang đến giải pháp sáng tạo, thẩm mỹ và bền vững cho không gian sống và làm việc của bạn.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || 'https://baophatart.com'),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_HOST || 'https://baophatart.com'}/gioi-thieu`,
  },
  openGraph: {
    title: "Bao Phat Art",
    description: "Chuyên thiết kế và thi công các công trình kiến trúc – nội thất trọn gói. Chúng tôi mang đến giải pháp sáng tạo, thẩm mỹ và bền vững cho không gian sống và làm việc của bạn.",
    url: `${process.env.NEXT_PUBLIC_HOST || 'https://baophatart.com'}/gioi-thieu`,
    siteName: "Bao Phat Art",
    images: ["/images/aboutus.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </body>
    </html>
  );
}
