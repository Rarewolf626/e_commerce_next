import AuthModal from "@/components/Auth/AuthModal";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gadget zone - always online",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
        <AuthModal />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
