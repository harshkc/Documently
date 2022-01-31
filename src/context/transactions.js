import React, {useReducer, createContext, useContext, useCallback} from "react";
import {db} from "../firebase";
import {collection, doc, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import {useEffect} from "react";

const TransactionContext = createContext();
TransactionContext.displayName = "TransactionContext";

const initialTransaction = [];

const transactionsReducer = (transactions, action) => {
  const {type, payload} = action;
  let newTransactions;

  switch (type) {
    case "ADD_TRANSACTION":
      newTransactions = [...transactions, payload];
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    case "DELETE_TRANSACTION":
      newTransactions = transactions?.filter((transaction) => transaction.id !== payload);
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    case "UPDATE_TRANSACTIONS":
      localStorage.setItem("transactions", JSON.stringify(payload));
      return payload;
    default:
      throw new Error("Undefined action passed in transactionsReducer");
  }
};

const TransactionProvider = ({children, user}) => {
  const [transactions, dispatch] = useReducer(transactionsReducer, initialTransaction);

  const getTransactions = async () => {
    try {
      const transactionsSnapshot = await getDocs(collection(db, "users", user.id, "transactions"));
      const transactions = transactionsSnapshot.docs.map((doc) => doc.data());
      dispatch({type: "UPDATE_TRANSACTIONS", payload: transactions});
    } catch (e) {
      console.log(e);
    }
  };

  const addTransactionToDB = async (transaction) => {
    try {
      await setDoc(doc(db, "users", user.id, "transactions", transaction.id), transaction);
      console.log("Transaction added to firestore");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransactionFromDB = async (transactionID) => {
    try {
      const toDeleteRef = doc(db, "users", user.id, "transactions", transactionID);
      await deleteDoc(toDeleteRef);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    await addTransactionToDB(transaction);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const deleteTransaction = async (id) => {
    await deleteTransactionFromDB(id);

    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const balance = transactions.length
    ? transactions?.reduce((acc, currVal) => {
        return currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount;
      }, 0)
    : 0;

  return (
    <TransactionContext.Provider value={{transactions, addTransaction, deleteTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionProvider");
  }
  return context;
};

export {TransactionProvider, useTransactionContext};
