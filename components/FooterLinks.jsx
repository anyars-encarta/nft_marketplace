const FooterLinks = ({ heading, items }) => {
  return (
    <div className="flex-1 justify-start items-start">
      <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
        {heading}
      </h3>

      {items.map((item, i) => (
        <p key={i} className='font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-2 hover:text-nft-gray-2 my-3'>{item}</p>
      ))}
    </div>
  );
};

export default FooterLinks;
