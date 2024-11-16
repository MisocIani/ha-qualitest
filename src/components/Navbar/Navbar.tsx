import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useAppDispatch } from "../../app/hooks";
import { setQuery, fetchSearchResults } from "../../features/products/searchSlice";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosStarOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";


const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputValue(query);
    dispatch(setQuery(query));
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navLogo}>
        <img src={`${process.env.PUBLIC_URL}/images/navLogo.svg`} alt="logo" />
      </div>

      <div className={styles.inputWrapper}>
        <CiSearch className={styles.searchIcon}/>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search Products..."/>
      </div>
      <div className={styles.buttonsWrapper}>
        <button className={styles.btn}>
          <GiShoppingCart className={styles.icon} />
        </button>
        <button className={styles.btn}>
          <IoIosStarOutline className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
