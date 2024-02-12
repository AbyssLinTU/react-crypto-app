import {createContext, useEffect, useState} from 'react'
import { fakeGetCryptoAssets,GetСryptoData ,} from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
    assets:[],
    crypto:[],
    loading: false,
})

export function CryptoContextProvider({children}){
    let [loading,setLoading]=useState(false)
    let [crypto,setCrypto]=useState([])
    let [assets,setAssets]=useState([])
    
    function mapAssets(assets,crypto){
        return assets.map(asset=>{
            const coin = crypto.find(c=>c.id===asset.id) 
                return{
                    name:coin.name,
                    grow: asset.price< coin.price,
                    growPercent: percentDifference(asset.price,coin.price),
                    totalAmount:asset.amount * coin.price,
                    totalProfit:asset.amount * coin.price-asset.amount * asset.price,
                    ...asset,
                }
            })
    }

    useEffect(()=>{
        async function preload(){
            
            setLoading(true);
            const crypto=await GetСryptoData()
            const assets=await fakeGetCryptoAssets()
            setCrypto(crypto.result)
            setAssets(mapAssets(assets,crypto.result))
            setLoading(false);
        }
        preload()
    },[])
    
    const addAsset=(asset)=>{
        setAssets(prev=>mapAssets([...prev,asset],crypto))
    }
    return <CryptoContext.Provider value={{ assets, crypto, loading,addAsset }}>
        {children}
    </CryptoContext.Provider>
}
export default CryptoContext