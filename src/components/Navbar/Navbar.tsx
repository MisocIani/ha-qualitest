import React from "react";
import styles from "./Navbar.module.css";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosStarOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";


const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLogo}>
        <img src={`${process.env.PUBLIC_URL}/images/navLogo.svg`} alt="logo" />
      </div>

      <div className={styles.inputWrapper}>
        <CiSearch className={styles.searchIcon}/>
        <input placeholder="search a product"/>
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
