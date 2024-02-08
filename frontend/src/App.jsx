
import CryptoContext, { CryptoContextProvider } from "./context/crypto_context";
import { AppLayout } from "./components/Layout/AppLayout";
import { useContext } from "react";



export default function App() {
  
  return  <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
   

}
export const useCrypto=()=>{
  return useContext(CryptoContext)
}