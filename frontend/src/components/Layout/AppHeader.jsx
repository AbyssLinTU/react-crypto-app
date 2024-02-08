import { Button, Layout, Modal, Select, Space,Drawer } from 'antd';
import React, { useEffect, useState } from 'react'
import { useCrypto } from '../../App';
import { capitalize } from '../../utils';
import { CoinInfoModal } from '../CoinInfoModal';
import { AddAssetsForm } from '../AddAssetsForm';
const headerStyle = {
    width:'100%',
    textAlign: 'center',
    height: 60,
    padding:"1rem",
    display:'flex',
    justifyContent:"space-between",
    alignItems:"center",
    //background:"white"
    
  };
 
export const AppHeader = () => {
    let [select,setSelect]=useState(false)
    let [drawer,setDrawer]=useState(false)
    let [modal,setModal]=useState()
    let [coin,setCoin]=useState()
    let {crypto}=useCrypto()


    useEffect(()=>{
        const keypress=(event)=>{
            if(event.key == '/'){
                !select?setSelect(true):setSelect(false)
                //setSelect(prev=>!prev)
            }
        }
        document.addEventListener('keypress',keypress)
        return ()=>{
            document.removeEventListener('keypress',keypress)
        } 
    },[select])
    const handleSelect =(value)=>{
        setCoin(crypto.find(c=>c.id===value))
        setModal(true)
    }
  return (
    <Layout.Header style={headerStyle}>
        <Select 
    style={{
      width: 250,
    }}
    open={select}
    onClick={()=>{!select?setSelect(true):setSelect(false)}}
    value={"press / to open"}
    onSelect={handleSelect}
    options={crypto.map(c=>{
        return {label:capitalize(c.name),
            value:c.id,
            icon:c.icon,
        }
    })}
    optionRender={(crypto) => (
      <Space>
        <img src={crypto.data.icon} alt={crypto.data.label} style={{width:20}}/>{crypto.data.label}
      </Space> )}
  />
    <Button type='primary' onClick={()=>setDrawer(true)}>Add asset</Button>
    <Modal open={modal} onCancel={()=>{setModal(false)}} footer={null}>
        <CoinInfoModal coin={coin}/>
      </Modal>
      <Drawer destroyOnClose width={600} title="Add asset" onClose={()=>{setDrawer(false)}} open={drawer}>
       <AddAssetsForm  onClose={()=>{setDrawer(false)}}/>
      </Drawer>
    </Layout.Header>
  )
}
