import React from 'react'

const page = async ({params}) => {
    const { id } = await params;
  return (
    <div>NFT Details for: {id}</div>
  )
}

export default page