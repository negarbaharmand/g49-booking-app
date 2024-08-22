import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const links = [{ text: "🛑 Cancel Booking", href: "/cancelation-form" }];

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <a className="text-2xl font-bold text-gray-800 no-underline" href="/">
          BookingApp
        </a>
        {/* Menu items are always visible */}
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-800 hover:text-blue-500 no-underline transition-colors"
                  to={link.href}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
