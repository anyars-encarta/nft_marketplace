"use client";

import React, { useState, useEffect, useContext } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "@/assets";
import { MenuItems, ButtonGroup } from ".";
import { NFTContext } from "@/context/NFTContext";

// const checkActive = (active, setActive, path) => {
//   // console.log("redirecting: ", redirect)
//   console.log("Active State: ", active)
//   switch (path) {
//     case "/":
//       if (active !== "Explore NFTs") setActive("Explore NFTs");
//       break;
//     case "/listed-nfts":
//       if (active !== "Listed NFTs") setActive("Listed NFTs");
//       break;
//     case "/create-nft":
//       setActive("");
//       break;

//     default:
//       setActive("");
//   }
// };

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  const initialTheme = localStorage.getItem("theme") || "light";
  const { theme, setTheme } = useTheme(initialTheme);

  const { connectWallet, currentAccount } = useContext(NFTContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
      });
    }
  }, []);

  // useEffect(() => {
  //   checkActive(active, setActive, redirect);
  // }, [redirect]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter cursor-pointer"
            onClick={() => redirect("/")}
          >
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt="logo"
              className="object-contain"
            />

            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1 md:hidden flex">
              KryptoKet
            </p>
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

        <div className="md:hidden flex">
          <MenuItems
            isMobile={isMobile}
            active={active}
            setActive={setActive}
          />

          <div className="ml-4">
            <ButtonGroup
              setActive={setActive}
              redirect={redirect}
              connectWallet={connectWallet}
              currentAccount={currentAccount}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            src={images.cross}
            width={20}
            height={20}
            alt="close"
            className={`${theme === "light" ? "filter invert" : ""} object-contain`}
            onClick={() => {
              setIsMobile(false);
              setIsOpen(false);
            }}
          />
        ) : (
          <Image
            src={images.menu}
            width={25}
            height={25}
            alt="menu"
            className={`${theme === "light" ? "filter invert" : ""} object-contain`}
            onClick={() => {
              setIsMobile(true);
              setIsOpen(true);
            }}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                isMobile={isMobile}
                setIsMobile={setIsMobile}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                active={active}
                setActive={setActive}
              />
            </div>

            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup
                setActive={setActive}
                redirect={redirect}
                setIsMobile={setIsMobile}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                connectWallet={connectWallet}
                currentAccount={currentAccount}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
