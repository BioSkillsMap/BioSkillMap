import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const Tree = dynamic(() => import("../src/components/Tree"), { ssr: false });
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Tree></Tree>
    </div>
  );
};

export default Home;
