import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { footerNavItems } from "./navItem";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const location = useLocation();

  return (
    <footer className=" bg-white">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex flex-col items-center justify-between pt-0 mt-0 md:flex-row">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">Tumor Insight</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Revolutionizing brain tumor prediction with AI-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <nav className="flex gap-16 w-full justify-center items-center">
              {footerNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm transition-colors ${
                    location?.pathname === item.to
                      ? "text-purple-600 font-medium"
                      : "text-muted-foreground hover:text-purple-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-6 mt-6 border-t md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tumor Insight. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0 items-center justify-center">
            <Link
              to="https://facebook.com"
              className="text-[#0866FF] hover:cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={16} />
            </Link>

            <Link
              to="https://x.com"
              className="hover:cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={16} />
            </Link>

            <Link
              to="https://linkedin.com"
              className="text-[#096ACA] hover:cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
