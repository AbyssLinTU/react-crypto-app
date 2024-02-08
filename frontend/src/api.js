import {cryptoAssets,cryptoData} from './data'
export const fakeGetCryptoAssets=()=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoAssets)
        },200)
    })
}
export const fakeGetСryptoData=()=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoData)
        },2)
    })
} 