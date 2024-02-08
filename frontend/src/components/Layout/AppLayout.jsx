import React, { useContext } from 'react'
import CryptoContext from '../../context/crypto_context'
import { Layout,Spin } from 'antd';
import { AppSider } from "./AppSider";
import { AppHeader } from "./AppHeader";
import { AppContent } from "./AppContent";

export const AppLayout = () => {
    const {loading} = useContext(CryptoContext)
    if(loading){
        return <Spin fullscreen />
    }{
  return (
    <Layout>
        <AppHeader/>
        <Layout>
            <AppSider/>
            <AppContent />
        </Layout>
    </Layout>
  )}
}
