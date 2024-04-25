import React from 'react';
import {CollectionProfile, Filter, NFT, Title, Banner } from '../components';

const Portfolio = () => {
  const collectionArray = [
    { name: 'coldplay', image: '../card_image/coldplay.png', title: 'Coldplay Concert', description: 'Coldplay NFT' },
    { name: 'ariana', image: '../card_image/ari_con.jpg', title: 'Ariana Concert', description: 'Ariana NFT' },
    { name: 'taylor', image: '../card_image/tay_con.jpg', title: 'Taylor Concert', description: 'Taylor NFT' },
    { name: 'twice', image: '../card_image/twice.png', title: 'Twice Concert', description: 'Twice NFT' },
  ];

  return (
    <div className="bg-gray-100">
      <Banner />
      <CollectionProfile />
      <Title heading="NFT Collections" />
      <Filter />
      <NFT NFTData={collectionArray} />
      <Title />
    </div>
  );
};

export default Portfolio;
