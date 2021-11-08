import React, { useReducer, createContext, useContext } from "react";

const TransactionContext = createContext();

const initialTransaction =
  JSON.parse(localStorage.getItem("transactions")) || getDummyTransactions();

const transactionsReducer = (transactions, action) => {
  const { type, payload } = action;
  let newTransactions;

  switch (type) {
    case "ADD_TRANSACTION":
      newTransactions = [...transactions, payload];
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    case "DELETE_TRANSACTION":
      newTransactions = transactions.filter(
        (transaction) => transaction.id !== payload
      );
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    default:
      throw new Error("Undefined action passed in transactionsReducer");
  }
};

const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    initialTransaction
  );

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, balance }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

function getDummyTransactions() {
  return [
    {
      amount: 500,
      category: "Salary",
      type: "Income",
      date: "2020-11-16",
      id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
    },
    {
      amount: 225,
      category: "Investments",
      type: "Income",
      date: "2020-11-16",
      id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
    },
    {
      amount: 50,
      category: "Salary",
      type: "Income",
      date: "2020-11-13",
      id: "270304a8-b11d-4e16-9341-33df641ede64",
    },
    {
      amount: 123,
      category: "Car",
      type: "Expense",
      date: "2020-11-16",
      id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
    },
    {
      amount: 50,
      category: "Pets",
      type: "Expense",
      date: "2020-11-13",
      id: "c5647dde-d857-463d-8b4e-1c866cc5f83e",
    },
    {
      amount: 500,
      category: "Travel",
      type: "Expense",
      date: "2020-11-13",
      id: "365a4ebd-9892-4471-ad55-36077e4121a9",
    },
    {
      amount: 50,
      category: "Investments",
      type: "Income",
      date: "2020-11-23",
      id: "80cf7e33-fc3e-4f9f-a2aa-ecf140711460",
    },
    {
      amount: 500,
      category: "Savings",
      type: "Income",
      date: "2020-11-23",
      id: "ef090181-21d1-4568-85c4-5646232085b2",
    },
    {
      amount: 5,
      category: "Savings",
      type: "Income",
      date: "2020-11-23",
      id: "037a35a3-40ec-4212-abe0-cc485a98aeee",
    },
  ];
}

export { TransactionProvider, useTransactionContext };
