import React from "react";
//import Image from 'next/image';

//INTERNAL IMPORT
import Styles from "./NFT.module.css";

const NFT = ({ concerts }) => {
  return (
    <div className={Styles.NFT_bigbox}>
      {concerts.map((el, i) => (
        <div className={Styles.NFT_box} key={i + 1}>
          <div className={Styles.NFT_box_img}>
            <img
              src={el.imageURI}
              alt="NFT"
              width={280}
              height={280}
              style={{ objectFit: "cover" }} // Apply object-fit directly through inline style
              className={Styles.NFT_box_img_img}
            />
          </div>
          <div className={Styles.NFT_box_info}>
            <div className={Styles.NFT_box_info_left}>
              <h2>{el.name} Concert</h2>
              <p>{el.name} NFT</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFT;
