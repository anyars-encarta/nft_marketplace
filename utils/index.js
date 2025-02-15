export const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
};

export const makeId = (length) => {
  let result = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export const shortenAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
}