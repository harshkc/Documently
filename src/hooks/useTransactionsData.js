import { useTransactionContext } from "../context/transactions";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "../constants/categories";

const useTransactionsData = (isExpense) => {
  resetCategories();
  const { transactions } = useTransactionContext();
  const matchedTransactions = transactions.filter(
    (transaction) => transaction.type === (isExpense ? "Expense" : "Income")
  );
  const total = matchedTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const categories = isExpense ? expenseCategories : incomeCategories;

  matchedTransactions.forEach((transaction) => {
    const category = categories.find(
      (item) => item.category === transaction.category
    );
    if (category) {
      category.amount += transaction.amount;
    }
  });

  const filteredCategories = categories.filter(
    (category) => category.amount > 0
  );

  const chartData = {
    labels: filteredCategories.map((category) => category.category),
    datasets: [
      {
        data: filteredCategories.map((category) => category.amount),
        backgroundColor: filteredCategories.map((category) => category.color),
      },
    ],
  };
  return { chartData, total, filteredCategories };
};

export { useTransactionsData };
