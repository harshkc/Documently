import * as React from "react";
import ReactDOM from "react-dom";

import App from "./screens/App";
import { TransactionProvider } from "./context/transactions";
import { SpeechProvider } from "@speechly/react-client";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_ID} language="en-US">
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </SpeechProvider>,
  document.getElementById("root")
);
