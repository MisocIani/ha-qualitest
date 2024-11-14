import React from "react";
import Dashboard from "./views/Dashboard";
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Dashboard />
    </div>
  );
}

export default App;
