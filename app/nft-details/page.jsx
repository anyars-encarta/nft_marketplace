const page = async ({searchParams}) => {
    const data = await searchParams;
    console.log("Search Params: ", { data });
  return (
    <div>NFT Details for: {data.i}</div>
  )
}

export default page