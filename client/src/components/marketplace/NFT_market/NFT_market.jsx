import React from 'react'

//INTERNAL IMPORT
import Styles from './NFT_market.module.css';

const NFT_market = ({NFTData}) => {

    return (
      <div className ={Styles.NFT_bigbox}>
          {NFTData.map((el, i) => (
              <div className= {Styles.NFT_box} key={i+1}>
                  <div className={Styles.NFT_box_img}>
                      <img 
                          src={el.image}
                          alt='NFT'
                          width={280}
                          height={280}
                          objectFit="cover"
                          className={Styles.NFT_box_img_img}
                      />
              </div>
              <div className={Styles.NFT_box_info}>
                  <div className={Styles.NFT_box_info_left}>
                      <h2>{el.title}</h2>
                      <p>{el.owner}</p>
                  </div>
                  <div className={Styles.NFT_box_info_right}>
                      <p>{el.description}</p>
                  </div>
              </div>
              </div>
          ))}   
      </div>
    )
  }

export default NFT_market