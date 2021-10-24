'use strict'
import axios from 'axios';
import { storageService } from '@/services/storage.service.js'
export const bitcoinService = {
    getBitcoinRate,
    getMarketPrice
}
const BITCOIN_RATE_DB = 'bitcoinRateDB'
const BITCOIN_RATE_URL = `https://blockchain.info/tobtc?currency=USD&value=1`
const MARKET_PRICE_URL = 'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true';
const MARKET_PRICE_DB = 'marketPriceDB'

async function getBitcoinRate() {
    // API Blocking:
    let res = storageService.loadFromStorage(BITCOIN_RATE_DB)
    if (!res?.data) res = await axios.get(BITCOIN_RATE_URL)
    storageService.storeToStorage(BITCOIN_RATE_DB, res)
    return res.data
}

async function getMarketPrice() {
    // return $ to btc rate
    let res = storageService.loadFromStorage(MARKET_PRICE_DB)
    if (!res?.data) res = await axios.get(MARKET_PRICE_URL);
    storageService.storeToStorage(MARKET_PRICE_DB, res)
    return res.data.values
}
