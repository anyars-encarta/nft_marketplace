import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../assets";

const NFTCard = ({ nft }) => (
  <Link href={{ pathname: "/nft-details", query: { nft } }}>
    <div className="flex flex-col items-center justify-center gap-8 w-60 h-80 bg-white rounded-3xl shadow-md cursor-pointer">
      {nft.name}
    </div>
  </Link>
);

export default NFTCard;
