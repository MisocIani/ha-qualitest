import React from "react";
import Dashboard from "./views/Dashboard";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product/:productId" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
