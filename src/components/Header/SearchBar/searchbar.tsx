import searchbar__style from "./searchbar.module.css";
import Redirect from "react-router-dom";
import React, { KeyboardEvent } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
const SearchBar = () => {
  const router = useRouter();
  const HandleEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      router.push(`/map/${e.currentTarget.value.toLocaleLowerCase()}`);
      //return <Redirect to="/map/" />
    }
  };
  return (
    <input
      type="text"
      className={searchbar__style.searchbar}
      placeholder={"Biology"}
      onKeyDown={HandleEvent}
    />
  );
};
export default SearchBar;
