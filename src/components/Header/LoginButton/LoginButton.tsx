import loginbutton__style from "./loginbutton.module.css";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginButton = () => {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <button
        className={loginbutton__style.login_btn}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
