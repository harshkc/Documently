import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

import useStyles from "./styles";
import { useTransactionsData } from "../../hooks/transactionsData";

const Details = ({ isExpense = false }) => {
  const { income, expense } = useStyles();
  const { total, chartData } = useTransactionsData(isExpense);

  return (
    <Card className={isExpense ? expense : income}>
      <CardHeader title={isExpense ? "Expense" : "Income"} />
      <CardContent>
        <Typography variant="h5">₹{total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;
