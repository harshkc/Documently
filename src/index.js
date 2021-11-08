import * as React from "react";
import ReactDOM from "react-dom";

import App from "./screens/App";
import { TransactionProvider } from "./context/transactions";
import "./index.css";

ReactDOM.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>,
  document.getElementById("root")
);
