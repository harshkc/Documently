import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

import useStyles from "./styles";

const Details = ({ isExpense = false }) => {
  const { income, expense } = useStyles();

  return (
    <div>
      <Card className={isExpense ? expense : income}>
        <CardHeader title={isExpense ? "Expense" : "Income"} />
        <CardContent>
          <Typography variant="h5">$1000</Typography>
          {/* <Doughnut data={data} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
