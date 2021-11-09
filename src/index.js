import * as React from "react";
import ReactDOM from "react-dom";

import { TransactionProvider } from "./context/transactions";
import { SpeechProvider } from "@speechly/react-client";
import { AppWithTheme } from "./context/theme";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_ID} language="en-US">
    <TransactionProvider>
      <AppWithTheme />
    </TransactionProvider>
  </SpeechProvider>,
  document.getElementById("root")
);
