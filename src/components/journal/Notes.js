import React from "react";
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core";
import useStyles from "./styles";

const Notes = ({children}) => {
  const {root, cardContent, divider} = useStyles();

  return (
    <Card className={root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title={<strong>Xpensly</strong>} style={{color: "#E77C97"}} />
        </Grid>
        <Grid item xs={2}>
          {children}
        </Grid>
      </Grid>
      <CardContent className={cardContent}>
        <Typography variant='h6'>
          Total Balance:
          <span style={{color: "green"}}>
            <strong> ₹balance</strong>
          </span>
        </Typography>
        <Typography variant='subtitle2' style={{lineHeight: "1.5em", marginTop: "20px"}}>
          Hello
        </Typography>
        <Divider className={divider} />
      </CardContent>
      <CardContent className={cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              <strong>Notes</strong>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Notes;
