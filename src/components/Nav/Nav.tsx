import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex justify-center w-full">
            <div className="ml-10 flex items-baseline space-x-4">
              <a className="text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Function
              </a>
              <a className="text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Collection
              </a>
              <a className="text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Configuration
              </a>
              <a className="text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                About
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-black">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <a className="block text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">
            Function
          </a>
          <a className="block text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">
            Collection
          </a>
          <a className="block text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">
            Configuration
          </a>
          <a className="block text-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">
            About
          </a>
        </div>
      )}
    </nav>
  );
};

export default Nav;
