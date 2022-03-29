import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import CustomizeCard from "../src/widgets/CustomizeCard";
import { ReactFlowProvider } from "react-flow-renderer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <Component {...pageProps} />
        <CustomizeCard></CustomizeCard>
      </ReactFlowProvider>
    </Provider>
  );
}

export default MyApp;
