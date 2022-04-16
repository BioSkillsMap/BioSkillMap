import React from "react";
import { BsPlusLg } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import add_button__styles from "./add-card.module.css";
import { editingEdge$ } from "../Add-Edge/AddEdge";
import { openModal$ } from "../../../../widgets/CustomizeCard";
const Add = () => {
  return (
    <IconButton
      className={add_button__styles.icon}
      size='large'
      onClick={() => {
        openModal$.next(true);
        editingEdge$.next(false);
      }}>
      <BsPlusLg />
    </IconButton>
  );
};

export default Add;
