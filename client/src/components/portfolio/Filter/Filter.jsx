import React,{useState} from 'react'
import {FaFilter, FaAngleDown,FaAngleUp,FaWallet, FaImages, FaUserAlt} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import {MdVerified} from 'react-icons/md';
import{TiTick} from 'react-icons/ti';

//INTERNAL IMPORT
import Styles from './Filter.module.css';

const Filter = () => {
    const [filter, setFilter] = useState(true);
    const [image, setImage] = useState(true);

    //Function Section
    const openFilter = () => {
        if(!filter){
            setFilter(true);
        }else{
            setFilter(false);
        }
    }

    const openImage = () => {
        if(!image){
            setImage(true);
        }else{
            setImage(false);
        }
    }

    return (
        <div className={Styles.filter}>
          <div className={Styles.filter_box}>
            <div className={Styles.filter_box_left}>
              <button onClick={() => {}}>NFTs</button>
              <button onClick={() => {}}>Owned</button>
              <button onClick={() => {}}>Concerts</button>
              <button onClick={() => {}}>Sports</button>
              <button onClick={() => {}}>Photography</button>
            </div>
      
            <div className={Styles.filter_box_right}>
              <div className={Styles.filter_box_right_box} onClick={() => openFilter()}>
                <FaFilter />
                <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
              </div>
            </div>
          </div>
          
            {filter && (
              <div className={Styles.filter_box_items}>
                <div className={Styles.filter_box_items_box}>
                  <div className={Styles.filter_box_items_box_item}>
                    <FaWallet />
                    <span>Price</span>
                    <AiFillCloseCircle />
                  </div>
                </div>
      
                <div className={Styles.filter_box_items_box}>
                  <div className={Styles.filter_box_items_box_item} onClick={() => openImage()}>
                    <FaImages /> <small>Images</small>
                    {image ? <TiTick /> : <AiFillCloseCircle />}
                  </div>
                </div>
      
                <div className={Styles.filter_box_items_box}>
                  <div className={Styles.filter_box_items_box_item}>
                    <FaUserAlt />
                    <span>Owner</span>
                    <MdVerified />
                  </div>
                </div>
              </div>
            )}
          
        </div>
      );
}

export default Filter