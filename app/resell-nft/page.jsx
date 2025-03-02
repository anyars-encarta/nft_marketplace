"use client";

import { useState, useEffect, useContext } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { NFTContext } from "@/context/NFTContext";
import { Loader, Button, Input } from "@/components";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const { createSale } = useContext(NFTContext);
  const [nft, setNft] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setNft(params);
  }, [searchParams]);

  useEffect(() => {
    if (nft.tokenURI) fetchNFT();
    setIsLoading(false);
  }, [nft.tokenURI]);

  const fetchNFT = async () => {
    const data = await axios.get(nft.tokenURI);

    setPrice(data.price);
    setImage(nft.tokenURI);
  };

  const inputClasses =
    "dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3";

    const resell = async () => {
      await createSale(nft.tokenURI, price, true, nft.tokenId);
      redirect('/');
    };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  };

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-nft-black font-semibold text-2xl'>
          Resell NFT
        </h1>

        <Input 
          inputType='number'
          title='Price'
          placeholder='NFT Price'
          handleChange={(e) => e.target.value}
          className={inputClasses}
        />

        {image && <Image src={image} className='rounded mt-4' width={350} height={400} alt='nft image' />}

        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName='List NFT'
            btnType='primary'
            classStyles='nft-gradient text-white mr-5 sm:mr-0 sm:mb-5 rounded-xl'
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  )
}

export default page