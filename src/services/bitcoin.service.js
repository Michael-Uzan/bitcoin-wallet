'use strict'
import axios from 'axios';
import { storageService } from '@/services/storage.service.js'
export const bitcoinService = {
    getBitcoinRate,
    getMarketPrice,
    getTradeVolume
}
const BITCOIN_RATE_DB = 'bitcoinRateDB';
const BITCOIN_RATE_URL = `https://blockchain.info/tobtc?currency=USD&value=1`;
const MARKET_PRICE_DB = 'marketPriceDB';
const MARKET_PRICE_URL = 'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true';
const TRADE_VOLUME_DB = 'tradeVolumeDB';
const TRADE_VOLUME_URL = 'https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true';

async function getBitcoinRate() {
    const res = await _get(BITCOIN_RATE_DB, BITCOIN_RATE_URL)
    return res.data
}

async function getMarketPrice() {
    const res = await _get(MARKET_PRICE_DB, MARKET_PRICE_URL)
    return res.data.values
}

async function getTradeVolume() {
    const res = await _get(TRADE_VOLUME_DB, TRADE_VOLUME_URL)
    return res.data.values
}

async function _get(KEY_DB, API_URL) {
    let res = storageService.loadFromStorage(KEY_DB)
    if (!res?.data) res = await axios.get(API_URL);
    storageService.storeToStorage(KEY_DB, res)
    return res
}