import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "victorfern91 - NextJS Tests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
