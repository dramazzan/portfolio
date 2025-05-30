import Link from "next/link";
import ToggleTheme from "@/components/ToggleTheme";

const Navigation = () => {
  return (
      <div className="bg-background-light dark:bg-background-dark z-1000 w-screen sticky top-0 p-2 flex items-center justify-center shadow transition-colors duration-200 ease-in-out">
        <nav className="w-full max-w-[1200px] flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <ul className="flex items-center gap-6 list-none">
            <li>
              <Link
                  href="/"
                  className="transition-colors duration-200 text-black dark:text-white hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                  href="#about"
                  className="transition-colors duration-200 text-black dark:text-white hover:text-blue-400"
              >
                About
              </Link>
            </li>
          </ul>
          <ToggleTheme />
        </nav>
      </div>
  );
};

export default Navigation;
