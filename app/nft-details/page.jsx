const page = async ({searchParams}) => {
    const { nft } = await searchParams;
    console.log("Search Params: ", {nft});
  return (
    <div>NFT Details for: {nft}</div>
  )
}

export default page