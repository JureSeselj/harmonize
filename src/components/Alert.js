// https://blog.logrocket.com/create-custom-react-alert-message/
import styles from "../styles/Alert.module.css";
import css from "classnames";
import React from "react";
import { useState } from "react";

export default function Alert({ variant, message }) {
  const [isShown, setIsShown] = useState(true);

  const handleClose = (e) => {
    e.preventDefault();
    setIsShown(false);
  };

  return (
    <div className={css(styles.alert, styles[variant], !isShown && styles.hide)}>
      <span className={styles.closebtn} onClick={handleClose}>
        &times;
      </span>
      {message}
    </div>
  );
}