"use client";

import { useState, useEffect, useRef, useContext } from "react";

import { Banner, CreatorCard, NFTCard, SearchBar } from "@/components";
import images from "@/assets";
import { makeId, shortenAddress } from "@/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "@/context/NFTContext";
import { getCreators } from "@/utils/getTopCreators";
import { sellers } from "@/constants";

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const [nfts, setNfts] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  // const { fetchNFTs } = useContext(NFTContext);

  const { theme } = useTheme();

  useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items);
  //   });
  setNfts(sellers);
  }, []);

  console.log("The Sellers are NFTs ", nfts);
  
  const handleScroll = (direction) => {
    const current = scrollRef.current;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (parent) {
      if (current?.scrollWidth >= parent?.offsetWidth) {
        setHideButtons(false);
      } else {
        setHideButtons(true);
      }
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  }, []);

  const topCreators = getCreators(sellers);
console.log("Top Creators are ", topCreators);
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          bannerText="Discover, collect, and sell extraordinary NFTs"
        />

        <div className="">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Sellers
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {topCreators.map((creator, i) => (
                <CreatorCard
                  key={creator.seller}
                  rank={i + 1}
                  creatorImage={images[`creator${i + 1}`]}
                  creatorName={shortenAddress(creator.seller)}
                  creatorEths={creator.sum}
                />
              ))}

              {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))} */}

              {!hideButtons && (
                <>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0"
                    onClick={() => handleScroll("left")}
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={theme === "light" ? "filter invert" : ""}
                    />
                  </div>

                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0"
                    onClick={() => handleScroll("right")}
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={theme === "light" ? "filter invert" : ""}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Hot Bids
            </h1>

            <SearchBar />
          </div>

          <div className="mt-3 w-full flexStart flex-wrap justify-start md:justify-center">
            {/* {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))} */}
            {nfts.map((nft, i) => (
              <NFTCard
                key={i}
                nft={nft}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
