import React from 'react'
import { Flex,Typography,Tag, Divider } from 'antd'
import { CoinInfo } from './CoinInfo'

export const CoinInfoModal = ({coin}) => {
  return (<><CoinInfo coin={coin} withSymbol={true}/>
  <Divider />
  <Typography.Paragraph>

    <CoinInfoModalDateDataSample text={'1 hour'} info={coin.priceChange1h}/>
    <CoinInfoModalDateDataSample text={'1 day'}  info={coin.priceChange1d}/>
    <CoinInfoModalDateDataSample text={'1 week'} info={coin.priceChange1w}/>

  </Typography.Paragraph>

    <CoinInfoModalDataSample text="Price" fixed={2} dimension={"$"} info={coin.price}/>
    <CoinInfoModalDataSample text="Price BTC" fixed={5} dimension={"BTC"} info={coin.priceBtc}/>
    <CoinInfoModalDataSample text="Market Cap" fixed={2} dimension={""} info={coin.marketCap}/>

    {coin.contractAddress&&<Typography.Paragraph>
      <Typography.Text strong style={{marginRight:10}}>Contract Address: </Typography.Text>
      
      <Tag color='gold'>{coin.contractAddress}</Tag>
    </Typography.Paragraph>}
    
  </>
  )
}
const CoinInfoModalDateDataSample=({text,info})=>{
  return(<><Typography.Text strong style={{marginRight:10}}>{text}: 
    </Typography.Text>
    <Tag color={info>0?'green':'red'}>{info}%</Tag>
    </>
    )
}
const CoinInfoModalDataSample=({text,info,dimension,fixed})=>{
  let calculatedFixed = fixed;

  while (info.toFixed(calculatedFixed) <= 0 && calculatedFixed < 12) {
    calculatedFixed += 1;
  }
  return(<><Typography.Paragraph>
    <Typography.Text strong style={{marginRight:10}}>{text}: </Typography.Text>
    {info.toFixed(calculatedFixed)}{dimension}
  </Typography.Paragraph>
    </>
    )
}