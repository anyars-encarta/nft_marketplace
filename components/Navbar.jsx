"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "@/assets";
import { MenuItems } from ".";

const Navbar = () => {
  const initialTheme = localStorage.getItem("theme") || "light";
  const { theme, setTheme } = useTheme(initialTheme);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState("Explore NFTs");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt="logo"
              className="object-contain"
            />

            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              KryptoKet
            </p>
          </div>
        </Link>

        <Link href="/">
          <div className="hidden md:flex cursor-pointer" onClick={() => {}}>
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt="logo"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => toggleTheme()}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
      </div>

      <div className="md:hidden flex">
        <ul className="list-none flexCenter flex-row">
          <MenuItems
            isMobile={isMobile}
            active={active}
            setActive={setActive}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
