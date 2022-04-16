import loginbutton__style from "./loginbutton.module.css";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
const LoginButton = () => {
  const [hover, setHover] = useState(false);
  const user = useSession().data?.user;
  console.log(user);
  return !user?.name ? (
    <div>
      <button
        className={loginbutton__style.login_btn}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={
          () => {
            signIn();
          }
        }
      >
        Login
      </button>
    </div>
    
  ) : null;
};

export default LoginButton;
