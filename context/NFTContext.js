"use client";

import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { multiaddr } from "@multiformats/multiaddr";

import { MarketAddress, MarketAddressABI } from "../constants/constants";

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "MATIC";

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

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
