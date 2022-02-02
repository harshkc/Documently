import * as React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./index.css";

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));

serviceWorkerRegistration.register();
