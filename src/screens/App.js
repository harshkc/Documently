import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";
import Details from "../components/Details/Details";
import Main from "../components/Main/Main";

const App = () => {
  const { grid, main, desktop, mobile, last } = useStyles();
  return (
    <div>
      <Grid
        className={grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4} className={mobile}>
          <Details />
        </Grid>
        <Grid item xs={12} sm={3} className={main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={desktop}>
          <Details />
        </Grid>
        <Grid item xs={12} sm={4} className={last}>
          <Details isExpense={true} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
