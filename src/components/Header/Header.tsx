import header__style from "./header.module.css";
import Hamburger from "./Hamburger/Hamburger";
import SignIn from "./SignIn/SignIn";

const Header = () => {
  return (
    <div className={header__style.container}>
      <div className={header__style.navbar} >
        <Hamburger />
        <SignIn />
      </div>
      <div className={header__style.content}>
        <div className={header__style.header}>
          <h1 className={header__style.h1}> Skillsmap </h1>
          <p className={header__style.p}>
            The most refined learning platform for anything you can think about
          </p>
        </div>

        <div className={header__style.search}>
          <div className={header__style.suggestion}>
            {" "}
            Try learning something new
          </div>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Header;
