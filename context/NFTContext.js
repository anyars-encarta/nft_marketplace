"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { multiaddr } from "@multiformats/multiaddr";

import { MarketAddress, MarketAddressABI } from "../constants/constants";

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      alert("No account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file) => {
    const helia = await createHelia({
      addresses: {
        api: multiaddr("/dns4/ipfs.infura.io/tcp/5001/https"),
      },
    });

    const fs = unixfs(helia);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const cid = await fs.addBytes(buffer);

      const url = `https://ipfs.infura.io/ipfs/${cid.toString()}`;

      return url;
    } catch (e) {
      console.error("Error uploading file to IPFS: ", e);
    }
  };

  const createNFT = async (formInput, fileUrl, redirect) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl)
      return alert("Please fill in all fields");

    const helia = await createHelia({
      addresses: {
        api: multiaddr("/dns4/ipfs.infura.io/tcp/5001/https"),
      },
    });

    const data = JSON.stringify({name, description, image: fileUrl});

    try {
      const fs = unixfs(helia);

      const added = await fs.addBytes(new TextEncoder().encode(data));

      const url = `https://ipfs.infura.io/ipfs/${added.toString()}`;

      await createSale(url, price);

      redirect("/");

    } catch (e) {
      console.error("Error creating NFT: ", e);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, { value: listingPrice.toString() });

    await transaction.wait();
  };

  const fetchNFTS = async() => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice}) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description }} = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");
      return {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI
      };
    }));

    return items;
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTS
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
