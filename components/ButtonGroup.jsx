'use client';

import React from "react";
import { Button } from ".";

const ButtonGroup = ({ setActive, redirect, isOpen, setIsOpen }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="nft-gradient text-white mx-2 rounded-xl"
      handleClick={() => {
        isOpen && setIsOpen(false)
        setActive('');
        redirect('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="border border-nft-red-violet text-nft-red-violet mx-2 rounded-xl"
      handleClick={() => {
        isOpen && setIsOpen(false)
      }}
    />
  );
};

export default ButtonGroup;
