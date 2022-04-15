import hamburger__style from "./hambuger-menu.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
const Hamburger = () => {
  return (
    <div className={hamburger__style.container}>
      <GiHamburgerMenu className={hamburger__style.menu} />
    </div>
  );
};

export default Hamburger;
