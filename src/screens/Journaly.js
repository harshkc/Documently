import React from "react";
import Notes from "../components/journal/Notes";
import useStyles from "./journalStyles";
import {Grid} from "@material-ui/core";

const Journal = ({user}) => {
  const {grid} = useStyles();
  return (
    <Grid
      className={grid}
      container
      spacing={0}
      alignItems='center'
      justifyContent='center'
      style={{height: "100vh"}}
    >
      <Grid item xs={12} sm={9} md={8} lg={8}>
        <Notes user={user} />
      </Grid>
    </Grid>
  );
};

export default Journal;
