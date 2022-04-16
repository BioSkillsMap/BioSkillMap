import "../styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}