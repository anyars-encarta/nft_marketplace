import React from 'react'

const page = ({ params }) => {
    const { id } = params;

  return (
    <div>NFT Details for: {id}</div>
  )
}

export default page