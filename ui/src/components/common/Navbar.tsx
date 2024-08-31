import { FC } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrainIcon, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom"; // Correct import
import { headerNavItems } from "./navItem";

interface NavbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <Link className="flex items-center justify-center" to="#">
        <BrainIcon className="h-6 w-6 text-purple-600" />
        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Tumor Insight
        </span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {headerNavItems.slice(0, 5).map((item) => (
          <Link
            key={item.name}
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            to={item.to}
          >
            {item.name}
          </Link>
        ))}
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Login
        </Button>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden ml-auto"
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            {headerNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-lg font-medium hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-purple-600 text-white hover:bg-purple-700 mt-4">
              Login
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
