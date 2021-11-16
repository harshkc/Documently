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
  FormHelperText,
} from "@material-ui/core";

import useStyles from "./styles";
import { incomeCategories, expenseCategories } from "../../constants/categories";
import { formatDate } from "../../utils/formatDate";
import { CustomizedSnackbar as Snackbar } from "../../components/Snackbar/Snackbar";
import { useTransactionContext } from "../../context/transactions";
import { v4 as uuid } from "uuid";
import { useSpeechContext } from "@speechly/react-client";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {
  const { button } = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const { addTransaction } = useTransactionContext();
  const { segment } = useSpeechContext();

  const createTransaction = useCallback(() => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-")) return;
    if (formData.amount === "") {
      setAmountError(true);
      return;
    }
    if (formData.category === "") {
      setCategoryError(true);
      return;
    }

    if (incomeCategories.map((iC) => iC.category).includes(formData.category)) {
      setFormData({ ...formData, type: "Income" });
    } else if (expenseCategories.map((iC) => iC.category).includes(formData.category)) {
      setFormData({ ...formData, type: "Expense" });
    }

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: uuid(),
    });
    setOpen(true);

    setFormData(initialState);
  }, [formData, addTransaction]);

  useEffect(() => {
    if (segment) {
      const intent = segment.intent.intent;
      if (intent === "add_income") {
        setFormData({
          ...formData,
          type: "Income",
        });
      } else if (intent === "add_expense") {
        setFormData({
          ...formData,
          type: "Expense",
        });
      } else if (segment.isFinal && intent === "create_transaction") {
        createTransaction();
      } else if (segment.isFinal && intent === "cancel_transaction") {
        setFormData(initialState);
      }

      segment.entities.forEach((entity) => {
        const category = entity.value[0] + entity.value.slice(1).toLowerCase();
        switch (entity.type) {
          case "amount":
            setFormData({ ...formData, amount: entity.value });
            break;
          case "category":
            if (incomeCategories.map((i) => i.category).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (expenseCategories.map((i) => i.category).includes(category)) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: entity.value });
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.date && formData.type) {
        createTransaction();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment ? (
            <div className="segment">{segment.words.map((w) => w.value).join(" ")}</div>
          ) : null}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            color="secondary"
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
            error={categoryError}
            color="secondary"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              setCategoryError(false);
            }}
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.category} value={c.category}>
                {c.category}
              </MenuItem>
            ))}
          </Select>
          {categoryError && <FormHelperText>Category is required!</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          required
          type="number"
          label="Amount"
          color="secondary"
          value={formData.amount}
          error={amountError}
          onChange={(e) => {
            setFormData({ ...formData, amount: e.target.value });
            if (e.target.value !== "") setAmountError(false);
          }}
          fullWidth
        />
        {amountError && <FormHelperText>Amount is required!</FormHelperText>}
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          color="secondary"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
        />
      </Grid>
      <Button
        className={button}
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default NewTransactionForm;
