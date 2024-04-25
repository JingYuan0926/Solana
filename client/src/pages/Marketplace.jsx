import React from 'react'
import {Fmarket, Banner, NFT_market, Title } from '../components';

const Marketplace = () => {
    const collectionArray = [
        { name: 'coldplay', image: '../card_image/coldplay.png', title: 'Coldplay Concert', description: '0.5 SOL', owner: 'By: 0x1234567890'},
        { name: 'ariana', image: '../card_image/ari_con.jpg', title: 'Ariana Concert', description: '0.2 SOL' , owner: 'By: 0x1223422322'},
        { name: 'taylor', image: '../card_image/tay_con.jpg', title: 'Taylor Concert', description: '0.6 SOL' , owner: 'By: 0x1345643346'},
        { name: 'twice', image: '../card_image/twice.png', title: 'Twice Concert', description: '0.45 SOL' , owner: 'By: 0x1092949954'},
    ];

    const featuresArray = [
        { name: 'twice1', image: '../card_image/Twice 1.jpg', title: 'NaYeon', description: '0.5 SOL' , owner: 'By: 0x1788948487'},
        { name: 'twice2', image: '../card_image/Twice 2.jpg', title: 'Jeong Yeon', description: '0.2 SOL', owner: 'By: 0x1989690949'},
        { name: 'twice3', image: '../card_image/Twice 3.jpg', title: 'MoMo', description: '0.6 SOL', owner: 'By: 0x1189994933'},
        { name: 'twice4', image: '../card_image/Twice 4.jpg', title: 'JiHyo', description: '0.45 SOL', owner: 'By: 0x1549649944'},
    ];
  return (
    <div className="bg-gray-100">
      <Banner/>
      <Title heading="NFT Marketplace" />
      <Fmarket/>
      <NFT_market NFTData={collectionArray}/>
      <Title heading="Featured NFTs" />
      <NFT_market NFTData={featuresArray}/>
      <Title/>
    </div>
  )
}

export default Marketplace