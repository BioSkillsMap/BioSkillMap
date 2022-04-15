import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {
  session,
  ...pageProps
} }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
      <ReactFlowProvider>
        <Component {...pageProps} />
      </ReactFlowProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
