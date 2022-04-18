import React from "react";
import styles from "./Button.module.css";

const Button = ({ caption, redBtn, onClick = () => {} }) => {
  return (
    <button
      className={`${styles.button} ${redBtn ? styles["red-button"] : ""}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};

export default Button;
