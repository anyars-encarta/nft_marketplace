"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { NFTContext } from "@/context/NFTContext";
import { NFTCard, Loader, Button, Modal, PaymentBodyCmp } from "@/components";
import { shortenAddress } from "@/utils";
import images from "@/assets";

const page = () => {
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setNft(params);
    setIsLoading(false);
  }, [searchParams]);

  const checkout = async () => {
    await buyNFT(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-right md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src={images[`nft${nft.id}`]}
            objectFit="cover"
            alt="nft"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>

          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator}
                objectFit="cover"
                alt="creator"
                className="rounded-full"
              />
            </div>

            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
              Details
            </p>
          </div>

          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal">
              {nft.description}
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal border border-gray p-2">
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="List on marketPlace"
              classStyles="nft-gradient text-white mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() =>
                redirect(
                  `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                )
              }
            />
          ) : (
            <>
              <Button
                handleClick={() => setPaymentModal(true)}
                btnName={`Buy for ${nft.price} ${nftCurrency}`}
                classStyles="nft-gradient text-white mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              />

              <Button
                btnName="List on MarketPlace"
                classStyles="nft-gradient text-white mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() =>
                  redirect(
                    // `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                    `/resell-nft?tokenId=bafkreia6drne2cni3lamb3zlk3a3nrvrryopmqg2fd5lixkt2e5uul5piu&tokenURI=https://ipfs.io/ipfs/bafkreia6drne2cni3lamb3zlk3a3nrvrryopmqg2fd5lixkt2e5uul5piu`
                  )
                }
              />
            </>
          )}
        </div>
      </div>

      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName="Checkout"
                classStyles="nft-gradient text-white mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />

              <Button
                btnName="Cancel"
                classStyles="border border-nft-red-violet text-nft-red-violet mx-2 rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Successful"
          body={
            <div
              classname="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={nft.image}
                  objectFit="cover"
                  layout="fill"
                  alt="tick"
                  className="object-contain"
                />
                <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">
                  You successfully purchased{" "}
                  <span className="font-semibold">{nft.name}</span>
                  from
                  <span className="font-semibold">
                    {shortenAddress(nft.seller)}
                  </span>
                  for
                  <span className="font-semibold">
                    {nft.price} {nftCurrency}
                  </span>
                </p>
              </div>
              body
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                classStyles="nft-gradient text-white sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => redirect("/my-nfts")}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default page;
