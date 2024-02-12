import axios from 'axios'
import {cryptoAssets,cryptoData} from './data'

const instance=axios.create({baseURL:'https://openapiv1.coinstats.app/',
headers:{
    'X-API-KEY': 'Qxa5Tdk56pqEpOHoDWzsW09saUbvRZYebPVCcwCQdVY='
}})

export const fakeGetCryptoAssets=()=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoAssets)
        },1)
    })
}
export const fakeGetСryptoData=()=>{
    return  new Promise(resolve=>{
        setTimeout(()=>{
            resolve(cryptoData)
        },1)
    })
} 

export const GetСryptoData=()=>{
    return instance.get('coins').then(
                response=>{
                    return response.data
                }
            )
}