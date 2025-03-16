'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
// import RegisterCompanyModal from '@/app/components/RegisterCompanyModal';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 헤더 */}
        <header className="bg-black text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/header_logo.png"
                  alt="Poi App Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-[32px] font-bold font-[family-name:var(--font-geist-sans)] px-1">
                  Poi App
                </span>
              </Link>
              {/* <nav className="space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-gray-300 transition-colors font-bold"
                >
                  회사 등록
                </button>
              </nav> */}
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="flex-1">
          {children}
        </div>

        {/* 회사 등록 모달 */}
        {/* <RegisterCompanyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </body>
    </html>
  );
}
