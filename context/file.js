import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// api: multiaddr("/dns4/ipfs.infura.io/tcp/5001/https"),
const uploadToIPFS = async (file) => {
  try {
    const added = await client.add({ content: file });

    const url = `https://ipfs.infura.io/ipfs/${added.path}`;

    return url;
  } catch (e) {
    console.error("Error uploading file to IPFS: ", e);
  }
};

// The code above uses ipfs-http-client which is currently deprecated in favour of helia. Modify the code to suite helia implementation.
