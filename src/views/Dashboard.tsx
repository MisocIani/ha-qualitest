import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.parentContent}>
          <div className={styles.leftPannel}></div>
          <div className={styles.rightPannel}>test</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
