import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactFlowProvider } from "react-flow-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <Component {...pageProps} />
      </ReactFlowProvider>
    </Provider>
  );
}

export default MyApp;
