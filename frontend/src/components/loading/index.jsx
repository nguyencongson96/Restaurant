import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles.one}`}> Sona</div>
      <div className={`${styles.spinner} ${styles.two}`}>
        <span className={styles.line}>A genuine fine-dining experience awaits.</span>
      </div>
    </div>
  );
};

export default Loading;
