import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { FC, useEffect } from "react";

interface PublicLayoutProps {
  children: React.JSX.Element;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Ensure the page starts at the top
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
