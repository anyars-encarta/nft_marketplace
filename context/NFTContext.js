'use client';

import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import {MarketAddress, MarketAddressABI} from '../constants/constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
    const nftContext = 'ETH';

    return (
        <NFTContext.Provider value={{ nftContext }}>
            {children}
        </NFTContext.Provider>
    )
}