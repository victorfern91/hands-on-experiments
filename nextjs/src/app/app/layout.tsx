import SideNav from "@/components/ui/side-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full bg-green-100/10">
      <SideNav />
      <section className="w-max bg-white p-4 m-4 rounded-lg shadow-lg flex-1">
        {children}
      </section>
    </div>
  );
}
