import { signIn } from "next-auth/react";
import sign_in__style from "./signin.module.css";
const SignIn = () => {
  return (
    <button className={sign_in__style.container} onClick={() => signIn()}>
      Sign In
    </button>
  );
};

export default SignIn;
