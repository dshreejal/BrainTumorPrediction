import { FC } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrainIcon, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Correct import
import { headerNavItems } from "./navItem";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutUser } from "@/hooks/query/useAuthentication";

interface NavbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  console.log(user);
  const location = useLocation();

  const isAuthenticated = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: Logout } = useLogoutUser();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <Link className="flex items-center justify-center" to="/">
        <BrainIcon className="h-6 w-6 text-purple-600" />
        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Tumor Insight
        </span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {headerNavItems.slice(0, 5).map((item) => (
          <Link
            key={item.name}
            // className="text-sm font-medium hover:text-purple-600 transition-colors"
            className={`text-sm font-medium transition-colors ${
              location?.pathname === item.to
                ? "text-purple-600"
                : "text-gray-800 hover:text-purple-600"
            }`}
            to={item.to}
          >
            {item.name}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/predict">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Predict
              </Button>
            </Link>
          </>
        )}
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
            {/* <Button className="bg-purple-600 text-white hover:bg-purple-700 mt-4">
              Predict
            </Button> */}
            <Link to="/predict">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Predict
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
