import React, {  useRef, useState } from 'react'
import { useCrypto } from '../App'
import {  Select,Space,Divider, Form,Button, InputNumber, DatePicker, Result } from 'antd'
import { capitalize } from '../utils'
import { CoinInfo } from './CoinInfo'

export const AddAssetsForm = ({onClose}) => {
    let {crypto,addAsset}=useCrypto()
    let [coin,setCoin]=useState(null)
    let [form]=Form.useForm()
    let [submitted,setSubmitted]=useState(false)
    const assetRef =useRef()

    function onFinish(values){
        const newAsset={
            id:coin.id,
            amount:values.amount,
            price:values.price,
            date: values.date?values.date.$d: new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }
    function handleAmountChange(value){
        
      const price= form.getFieldValue("price")

        form.setFieldsValue({
            total:+(value*price).toFixed(2)+"$"
        })
    }
    function handlePriceChange(value){ 
      
      const amount= form.getFieldValue("amount")

        form.setFieldsValue({
            total:+(value*amount).toFixed(2)+"$"
        })
    }



    if(submitted){
        return <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={()=>{onClose()}}>
            Close
          </Button>,
         
        ]}
      />
    }
    if(!coin){
        return <Select 
        style={{
          width: "100%",
        }}
        placeholder="Select coin"
        onSelect={(v)=>{
            setCoin(crypto.find((c)=>c.id===v))
            }}
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
    }
    else{
     
      let calculatedFixed=2
      while(coin.price.toFixed(calculatedFixed)<=0){
        calculatedFixed+=1
      }
  return (
    <Form
    form={form}
    validateMessages={{
        require:'${label} is required',
        types:{
            number: '${label} in not valid number',
        },
        number:{
            range:'${label} must be between ${min} and ${max}'
        }
      }}
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      price:+coin.price.toFixed(calculatedFixed),
    }}
    onFinish={onFinish}
  >
        <CoinInfo coin={coin} withSymbol={false}/>
        <Divider/>
        
    <Form.Item
      label="Amount"
      name="amount"
      
      rules={[
        {
          required: true,
          type:'number',
          min:0,
          
        },
      ]}
    >
      <InputNumber onChange={handleAmountChange} placeholder='Enter coin amount' style={{width:"100%"}} />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
    >
      <InputNumber onChange={handlePriceChange} suffix='$' style={{width:"100%"}} />
    </Form.Item>
    <Form.Item
      label="Date & time"
      name="date"
    >
        <DatePicker style={{width:"100%"}}
        showTime onChange={()=>{}} onOk={()=>{}} />
     
    </Form.Item>
    <Form.Item
      label="Total"
      name="total"
    >
      <InputNumber disabled  style={{width:"100%"}} />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Add Asset
      </Button>
    </Form.Item>
  </Form>
   
  )
 }
}
