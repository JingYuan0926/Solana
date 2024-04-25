import React from 'react';
//import Image from 'next/image';


//Internal Imports
import Styles from './Collection.module.css';

const CollectionProfile = () => {
    const cardArray = [
        { title: "Total NFT", description: "4" },
        { title: "Concerts Coming", description: "2" },
        { title: "Total Points", description: "1600" },
        { title: "Total Earning", description: "16 USD"},
        
    ];

    return (
        <div className={Styles.CollectionProfile}>
            <div className={Styles.CollectionProfile_box}>
                <div className={Styles.CollectionProfile_box_left}>
                    <img
                        src="../card_image/Bird.png" 
                        alt='bird'
                        width={350}
                        height={350}
                        className={Styles.CollectionProfile_box_left_img}
                    />
                </div>
                <div className={Styles.CollectionProfile_box_middle}>
                    <h1>Angry Bird </h1>
                    <p></p>
    
                    <div className={Styles.CollectionProfile_box_middle_box}>
                    {cardArray.map((card, index) => (
                            <div className={Styles.CollectionProfile_box_middle_box_card} key={index + 1}>
                                <div className={Styles.CollectionProfile_box_middle_box_card_content}>
                                    <span>{card.title}</span>
                                    <h2>{card.description}</h2>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollectionProfile