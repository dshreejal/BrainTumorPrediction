import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { FC } from "react";

interface PublicLayoutProps {
  children: React.JSX.Element;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
