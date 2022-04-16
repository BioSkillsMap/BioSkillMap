import header__style from "./header.module.css";
import SignIn from "./SignIn/SignIn";
import Sidebar from './Sidebar/Sidebar';
import { useState } from "react";
import SearchBar from "./SearchBar/searchbar"
import Hamburger from "./Hamburger/Hamburger";
const Header = () => {

  const [open, setOpen] = useState(false);
  return (
    <div className={header__style.container}>
      <Sidebar open={open}/>
      <div className={header__style.navbar} >
        <Hamburger/>
        <SignIn />
      </div>
      <div className={header__style.content}>
        <div className={header__style.header}>

          <img style={{
            position: "absolute",
            width: 100,
            transform: "translate(500px,50px) rotate(124deg) scale(3,3)"
          }} src="/p2.png" alt="broken"></img>
           <img style={{
            position: "absolute",
            width: 100,
            transform: "translate(430px,250px) rotate(-10deg) scale(1.2,1.2)"
          }} src="/p4.png" alt="broken"></img>
          <img style={{
            position: "absolute",
            width: 100,
            transform: "translate(-500px,50px) rotate(124deg) scale(1,1)"
          }} src="/p5.png" alt="broken"></img>
           <img style={{
            position: "absolute",
            width: 100,
            transform: "translate(-430px,250px) rotate(24deg) scale(1.2,1.2)"
          }} src="/p6.png" alt="broken"></img>
          <img style={{
            position: "absolute",
            width: 100,
            transform: "translate(60px,370px) rotate(11deg) scale(1.3,1.3)"
          }} src="/p7.png" alt="broken"></img>
          {/* <img style={{ // de pus undeva
            position: "absolute",
            width: 100,
            transform: "translate(300px,250px) rotate(0deg) scale(1,1)"
          }} src="/p8.png" alt="broken"></img>  */}


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
          <SearchBar></SearchBar>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
