import React from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./styles";
import Form from "../Form/Form";
import List from "../List/List";
import InfoCard from "../InfoCard";
import { useTransactionContext } from "../../context/transactions";

const Main = ({ children }) => {
  const { root, cardContent, divider } = useStyles();
  const { balance } = useTransactionContext();

  return (
    <Card className={root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <CardHeader title="Expensly" />
        </Grid>
        <Grid item xs={2}>
          {children}
        </Grid>
      </Grid>
      <CardContent className={cardContent}>
        <Typography variant="h5">
          Total Balance: <strong>₹{balance}</strong>
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: "1.5em", marginTop: "20px" }}>
          <InfoCard />
        </Typography>
        <Divider className={divider} />
        <Form />
      </CardContent>
      <CardContent className={cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
