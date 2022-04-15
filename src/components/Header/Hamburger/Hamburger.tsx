import hamburger__style from "./hambuger-menu.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
const Hamburger = () => {
  return (
    <div className={hamburger__style.navbar}>
    <div className={`${hamburger__style.container} ${hamburger__style.nav_container}`}>
      <input className={hamburger__style.checkbox} type="checkbox" name="" id="" />
      <div className={hamburger__style.hamburger_lines}>
        <span className={`${hamburger__style.line} ${hamburger__style.line1}`} />
        <span className={`${hamburger__style.line} ${hamburger__style.line2}`} />
        <span className={`${hamburger__style.line} ${hamburger__style.line3}`} />
      </div>  
      <div className={hamburger__style.logo}>
        <h1>Navbar</h1>
      </div>
      <div className={hamburger__style.menu_items}>
        <li><a href="#">Home</a></li>
        <li><a href="#">about</a></li>
        <li><a href="#">blogs</a></li>
        <li><a href="#">portfolio</a></li>
        <li><a href="#">contact</a></li>
      </div>
    </div>
  </div>
  );
};

export default Hamburger;
