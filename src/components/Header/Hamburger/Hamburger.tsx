import hamburger__style from "./hamburger.module.css";
import { useAppDispatch } from "redux-hooks";
import { FC } from "react";
import { openSidebar } from "../Sidebar/searchbar-slice";

const Hamburger = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={hamburger__style.container}
      onClick={() => {
        dispatch(openSidebar());
      }}
    >
      <div className={hamburger__style.line}></div>
      <div className={hamburger__style.line}></div>
      <div className={hamburger__style.line}></div>
    </div>
  );
};

export default Hamburger;
