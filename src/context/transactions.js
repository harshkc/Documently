import React, {
  useReducer,
  createContext,
  useContext,
  useCallback,
} from "react";

const TransactionContext = createContext();

const initialTransaction =
  JSON.parse(localStorage.getItem("transactions")) || getDummyTransactions();

const transactionsReducer = (transactions, action) => {
  const { type, payload } = action;
  let newTransactions;

  switch (type) {
    case "ADD_TRANSACTION":
      newTransactions = [payload, ...transactions];
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

  const addTransaction = useCallback(
    (transaction) => {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: transaction,
      });
    },
    [dispatch]
  );

  const deleteTransaction = useCallback(
    (id) => {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    },
    [dispatch]
  );

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
      id: "33b295b8-a8cb-49f0-8f0d-bb260686de1a",
    },
    {
      amount: 123,
      category: "Car",
      type: "Expense",
      date: "2020-11-16",
      id: "0f72e66e-e144-4a72-bbc1-c3c90018635e",
    },
    {
      amount: 50,
      category: "Pets",
      type: "Expense",
      date: "2020-11-13",
      id: "c5647dde-d857-463d-8b4e-1c966cc5f83e",
    },
    {
      amount: 500,
      category: "Travel",
      type: "Expense",
      date: "2020-11-13",
      id: "365a4ebd-9892-4471-ad55-36077e0121a9",
    },
  ];
}

export { TransactionProvider, useTransactionContext };
