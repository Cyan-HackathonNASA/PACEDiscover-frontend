"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CloseIcon } from "./icons/CloseIcon";
import { MenuIcon } from "./icons/MenuIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set to true only when the component is mounted on the client side
    setIsClient(true);
  }, []);

  const listLinks = [
    { label: 'Home', url: '/' },
    { label: 'Explore', url: '/explorer-ocean' },
    { label: 'Learn about PACE', url: '/see-onboarding' },
    { label: 'Quiz PACE', url: '/quiz-pace' },
    { label: 'About the project', url: '/#about' },
    { label: 'Team Contacts', url: '/#team-contacts' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (url: string) => {
    if (!isClient) return; // Only run on the client side
  
    if (url.includes('#')) {
      const [path, hash] = url.split('#');
  
      if (pathname === path || path === "") {
        // If already on the target page, scroll to the hash
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to a different page, then scroll
        router.push(path);
        const checkElement = () => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        };
        // Delay the scroll check slightly to ensure page has loaded
        setTimeout(checkElement, 300); 
      }
    } else {
      // If no hash, just navigate to the page
      router.push(url);
    }
  
    setMenuOpen(false); // Close the menu after navigating
  };

  return (
    <header className="shadow-lg flex flex-1 w-full justify-between p-6 bg-gray/30 backdrop-blur-md z-[2000] relative">
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M14 23.2v-2q2.925 0 4.963-2.037T21 14.2h2q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T14 23.2m0-4v-2q1.25 0 2.125-.875T17 14.2h2q0 2.075-1.463 3.538T14 19.2m-8.45 3.375q-.375 0-.75-.15T4.125 22l-3.55-3.55q-.275-.3-.425-.675t-.15-.75q0-.4.15-.763t.425-.637L3.75 12.45q.575-.575 1.425-.587t1.425.562l1.25 1.25l.7-.7l-1.25-1.25q-.575-.575-.575-1.4t.575-1.4L8.725 7.5q.575-.575 1.413-.575t1.412.575l1.25 1.25l.7-.7l-1.25-1.25q-.575-.575-.575-1.412t.575-1.413L15.425.8q.3-.3.675-.45t.75-.15t.738.15t.662.45l3.55 3.55q.3.275.438.638t.137.762q0 .375-.137.75t-.438.675l-3.175 3.175q-.575.575-1.412.575T15.8 10.35L14.55 9.1l-.7.7l1.25 1.25q.575.575.563 1.413t-.588 1.412l-1.4 1.4q-.575.575-1.412.575t-1.413-.575l-1.25-1.25l-.7.7l1.25 1.25q.575.575.563 1.425t-.588 1.425L6.95 22q-.275.275-.638.425t-.762.15m0-1.975l1.05-1.05L3.05 16L2 17.05zm2.125-2.125l1.05-1.05l-3.55-3.55l-1.05 1.05zm9.55-9.55l1.05-1.05l-3.55-3.55l-1.05 1.05zM19.35 6.8l1.05-1.05l-3.55-3.55l-1.05 1.05z"
          />
        </svg>
      </a>

      <nav>
        <ul className="gap-10 hidden lg:flex">
          {listLinks.map((link) => (
            <li key={link.label}>
              <a
                onClick={() => handleNavigation(link.url)}
                className={`text-lg font-light text-white hover:text-cyan-500 transition-all ease-in-out duration-300 hover:underline ${
                  pathname === link.url ? "underline text-cyan-500" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-white bg-cyan-500 hover:bg-sky-600 rounded-lg p-2"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul
          className={`${
            menuOpen ? "mt-4 flex" : "hidden"
          } flex-col gap-4 p-4 bg-gray-800 rounded-md fixed top-16 right-6 lg:hidden z-[3000]`}
        >
          {listLinks.map((link) => (
            <li key={link.label}>
              <a
                onClick={() => handleNavigation(link.url)}
                className={`text-lg font-light text-white hover:text-cyan-500 ${
                  pathname === link.url ? "underline text-cyan-500" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="lg:invisible hidden"></div>
      </nav>
    </header>
  );
};

export default Header;
