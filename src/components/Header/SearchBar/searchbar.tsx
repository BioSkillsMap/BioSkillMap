import searchbar__style from "./searchbar.module.css";
import { TextField } from "@mui/material";
const SearchBar = () => {
    return <input type="text" className={searchbar__style.searchbar} placeholder={"Biology"}/>;
};
export default SearchBar;
