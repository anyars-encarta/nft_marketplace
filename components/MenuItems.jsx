import { navItems } from "@/constants";
import { generateLink } from "@/utils";
import Link from "next/link";
import React from "react";

const MenuItems = ({ isMobile, setIsMobile, active, setActive, isOpen, setIsOpen }) => {
  return (
    <ul
      className={`list-none flexCenter flex-row ${isMobile && "flex-col h-full"}`}
    >
      {navItems.map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item)
            isOpen && setIsOpen(false)
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gra-3 text-nft-gray-2"
          }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
