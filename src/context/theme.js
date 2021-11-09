import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "../screens/App";
import { light, dark } from "../theme/theme";

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
