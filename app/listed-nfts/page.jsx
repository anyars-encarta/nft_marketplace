"use client";

import { useState, useEffect, useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
import { NFTCard, Loader } from "@/components";
import { makeId } from "@/utils";

const page = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const { fetchMyNFTsOrListedMFTs } = useContext(NFTContext);

  useEffect(() => {
  //   fetchMyNFTsOrListedMFTs('fetchItemsListed')
  //     .then((items) => {
  //     setNfts(items);
  //     setIsLoading(false);
  //   });
    setNfts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  // if (!isLoading && nfts.length === 0) {
  //   return (
  //     <div className='flexCenter sm:p-4 p-16 min-h-screen'>
  //       <h1 className='font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold'>No NFTs Listed for Sale</h1>
  //     </div>
  //   )
  // };

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-emibold mt-2 ml-4 sm:ml-2">
            NFTS Listed for Sale
          </h2>

          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {/* {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))} */}
            {nfts.map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: "Cool NFT on Sale",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
