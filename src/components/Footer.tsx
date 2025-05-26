import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <span className="text-sm">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </span>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a
                        href="/"
                        className="text-sm transition-colors duration-200 hover:text-blue-400"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className="text-sm transition-colors duration-200 hover:text-blue-400"
                    >
                        About
                    </a>
                    <a
                        href="mailto:ramazandautbek04@gmail.com"
                        className="text-sm transition-colors duration-200 hover:text-blue-400"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
