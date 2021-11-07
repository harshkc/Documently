import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import useStyles from "./styles";

const Main = () => {
  const { root, cardContent, divider } = useStyles();

  return (
    <Card className={root}>
      <CardHeader title="Expensly" />
      <CardContent className={cardContent}>
        <Typography align="center" variant="h5">
          Total Balance: $0.00
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          Try saying add $10 as income on Monday...
        </Typography>
        <Divider className={divider} />
      </CardContent>
      <CardContent className={cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
