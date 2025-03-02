export const getCreators = (sellers) => {
    const creators = sellers.reduce((creatorObject, nft) => {
        const creator = creatorObject[nft.seller] || [];
        creator.push(nft);
        creatorObject[nft.seller] = creator;
        return creatorObject;
    }, {});

    return Object.entries(creators).map((creator) => {
        const seller = creator[1][0].seller;
        
        const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr)  => prev + curr, 0);

        return ({
            seller,
            sum
        });
    })
};