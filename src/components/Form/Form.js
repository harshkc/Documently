import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import useStyles from "./styles";
import {
  incomeCategories,
  expenseCategories,
} from "../../constants/categories";
import { formatDate } from "../../utils/formatDate";
import { useTransactionContext } from "../../context/transactions";
import { v4 as uuid } from "uuid";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {
  const { button } = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useTransactionContext();

  const createTransaction = useCallback(() => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    if (incomeCategories.map((iC) => iC.category).includes(formData.category)) {
      addTransaction({ ...formData, type: "Income", id: uuid() });
    } else if (
      expenseCategories.map((iC) => iC.category).includes(formData.category)
    ) {
      setFormData();
      addTransaction({ ...formData, type: "Expense", id: uuid() });
    }

    setFormData(initialState);
  }, [formData, addTransaction]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          Transcription will go here
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.category} value={c.category}>
                {c.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        className={button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default NewTransactionForm;
