import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const Tree = dynamic(() => import("../src/components/Tree/Tree"), {
  ssr: false,
});
import { useReactFlow } from "react-flow-renderer";
import Toolbar from "../src/components/Toolbar/Toolbar";

const Home: NextPage = () => {
  const reactFlowInstance = useReactFlow();
  return (
    <div className={styles.container}>
      <Toolbar></Toolbar>
      <div className={styles.roadmap__container}>
        <Tree></Tree>
      </div>
    </div>
  );
};

export default Home;
