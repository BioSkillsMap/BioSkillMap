import React from "react";
import { BsPlusLg } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import add_button__styles from "./add-card.module.css";
import { Subject } from "rxjs";
import { insertEdges$ } from "../Add-Edge/AddEdge";

export const trigger$ = new Subject<boolean>();
const Add = () => {
  return (
    <IconButton
      className={add_button__styles.icon}
      size='large'
      onClick={() => {
        insertEdges$.next(false);
        trigger$.next(true);
      }}>
      <BsPlusLg />
    </IconButton>
  );
};

export default Add;
