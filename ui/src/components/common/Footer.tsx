/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";
import { footerNavItems } from "./navItem";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-purple-900">
                Tumor Insight
              </h3>
              <p className="text-gray-600 mt-2">
                Revolutionizing brain tumor prediction with AI-driven insights.
              </p>
            </div>
            <nav className="mt-8 md:mt-0">
              <ul className="flex flex-col md:flex-row md:space-x-4">
                {footerNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
