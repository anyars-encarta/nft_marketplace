"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from '@/assets';

const Navbar = () => {

  const { theme, setTheme } = useTheme();

  return (
    <nav className='flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1'>
      <div className='flex flex-1 flex-row justify-start'>
        <Link href='/'>
          <div 
            className='flexCenter md:hidden cursor-pointer'
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt='logo'
              className='object-contain'
            />

            <p className='dark:text-white text-nft-black-1 font-semibold text-lg ml-1'>KryptoKet</p>
          </div>
        </Link>

        <Link href='/'>
          <div 
            className='hidden md:flex cursor-pointer'
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt='logo'
              className='object-contain'
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
