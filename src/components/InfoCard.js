import React from "react";

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div elevation={3} style={{ textAlign: "center", padding: "0 10%" }}>
      Try Saying: <br />
      Add {isIncome ? "Income " : "Expense "}
      for {isIncome ? "₹10000 " : "₹500 "}
      in Category {isIncome ? "Salary " : "Bills "}
      for {isIncome ? "Monday " : "Thursday "}
    </div>
  );
};

export default InfoCard;
