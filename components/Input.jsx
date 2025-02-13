'use client';

import { NFTContext } from "@/context/NFTContext";
import { useContext } from "react";

const Input = ({ inputType, title, placeholder, handleChange, className }) => {
    const { nftCurrency } = useContext(NFTContext);

  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>

      {inputType === "number" ? (
        <div className={`${className} flexBetween flex-row`}>
          <input
            type={inputType}
            placeholder={placeholder}
            onChange={handleChange}
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
          />

          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          type={inputType}
          placeholder={placeholder}
          onChange={handleChange}
          className={className}
          rows={10}
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          onChange={handleChange}
          className={className}
        />
      )}
    </div>
  );
};

export default Input;
