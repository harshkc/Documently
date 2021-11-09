import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "../screens/App";

const light = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
  palette: {
    type: "light",
  },
};

const dark = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: "linear-gradient(to top, #16222a, #3a6073)",
        },
      },
    },
  },
  palette: {
    type: "dark",
  },
};

const AppWithTheme = () => {
  const [theme, setTheme] = React.useState(JSON.parse(localStorage.getItem("theme")) || "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", JSON.stringify(theme === "light" ? "dark" : "light"));
  };

  const appliedTheme = createTheme(theme === "light" ? light : dark);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <App theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export { AppWithTheme };
