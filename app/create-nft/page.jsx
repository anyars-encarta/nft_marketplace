"use client";

import { useState, useMemo, useCallback, useContext } from "react";
import { redirect } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button, Input } from "../../components";
import images from "../../assets";

const page = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const { theme } = useTheme();

  const onDrop = useCallback(() => {
    // upload image to the ipfs blockchain
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const inputClasses = 'dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3';

  const fileStyle = useMemo(() => {
    return `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && "border-file-active"}
    ${isDragAccept && "border-file-accept"}
    ${isDragReject && "border-file-reject"}`;
  }, [isDragActive, isDragAccept, isDragReject]);

  console.log("Form Data: ", formInput);
  
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create new NFT
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload file
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />

              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBP. Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag & Drop File here
                </p>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or Browse Media on you device
                </p>
              </div>
            </div>

            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          className={inputClasses}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          rows={5}
          handleChange={(e) => setFormInput({ ...formInput, description: e.target.value })}
          className={inputClasses}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          rows={5}
          handleChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
          className={inputClasses}
        />

        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName="Create NFT"
            classStyles="nft-gradient text-white rounded-md"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
