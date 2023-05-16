export interface TokenData {
    name: string;
    symbol: string;
    price: number;
    priceChange: number;
    volume: number;
    marketCap: number;
    logo: string;
}

const useAllTokenData = () => {
    return [
        { name: 'Ether', symbol: 'ETH', price: 18206.6346124, priceChange: 0.015782, volume: 6403622794.8743219, marketCap: 224601068220, logo: 'https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png' },
        { name: 'USD Coin', symbol: 'USDC', price: 1.00, priceChange: 0, volume: 1578008726.682341, marketCap: 29987187537, logo: 'https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png' },
        { name: 'Wrapped BTC', symbol: 'BTC', price: 26345.23532, priceChange: 0.016923, volume: 7613176583.43219, marketCap: 527221932731, logo: 'https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png' },
        { name: 'Pepe', symbol: 'PEPE', price: 0.0000017286501, priceChange: -0.02513, volume: 356267324.6124908431, marketCap: 727583996, logo: 'https://assets.coingecko.com/coins/images/29850/thumb/pepe-token.jpeg?1682922725' },
        { name: 'Ripple', symbol: 'XRP', price: 0.429470, priceChange: -0.252434, volume: 496976652.93811, marketCap: 22247980130, logo: 'https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731' },
        { name: 'Chainlink', symbol: 'LINK', price: 6.645143, priceChange: 1.5892, volume: 104786456.213, marketCap: 3428149847, logo: 'https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png' },
    ] as TokenData[];
};

export default useAllTokenData;
