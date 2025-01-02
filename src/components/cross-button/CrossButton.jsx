import React from "react";
import "./CrossButton.css";
import { RxCross1 } from "react-icons/rx";
const CrossButton = ({closeModal}) => {
  return <RxCross1 id="cross-btn" title="close" onClick={closeModal} />;
};

export default CrossButton;
