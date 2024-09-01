import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { FC } from "react";

interface ProtectedLayoutProps {
  children: React.JSX.Element;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
