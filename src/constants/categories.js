const incomeColors = [
  "#123123",
  "#154731",
  "#165f40",
  "#16784f",
  "#14915f",
  "#10ac6e",
  "#0bc77e",
  "#04e38d",
  "#00ff9d",
];
const expenseColors = [
  "#b50d12",
  "#bf2f1f",
  "#c9452c",
  "#d3583a",
  "#dc6a48",
  "#e57c58",
  "#ee8d68",
  "#f79d79",
  "#ffae8a",
  "#cc474b",
  "#f55b5f",
];

const incomeCategories = [
  { category: "Business", amount: 0, color: incomeColors[0] },
  { category: "Investments", amount: 0, color: incomeColors[1] },
  { category: "Extra income", amount: 0, color: incomeColors[2] },
  { category: "Deposits", amount: 0, color: incomeColors[3] },
  { category: "Lottery", amount: 0, color: incomeColors[4] },
  { category: "Gifts", amount: 0, color: incomeColors[5] },
  { category: "Salary", amount: 0, color: incomeColors[6] },
  { category: "Savings", amount: 0, color: incomeColors[7] },
  { category: "Rental income", amount: 0, color: incomeColors[8] },
];

const expenseCategories = [
  { category: "Bills", amount: 0, color: expenseColors[0] },
  { category: "Car", amount: 0, color: expenseColors[1] },
  { category: "Clothes", amount: 0, color: expenseColors[2] },
  { category: "Travel", amount: 0, color: expenseColors[3] },
  { category: "Food", amount: 0, color: expenseColors[4] },
  { category: "Shopping", amount: 0, color: expenseColors[5] },
  { category: "House", amount: 0, color: expenseColors[6] },
  { category: "Entertainment", amount: 0, color: expenseColors[7] },
  { category: "Phone", amount: 0, color: expenseColors[8] },
  { category: "Pets", amount: 0, color: expenseColors[9] },
  { category: "Other", amount: 0, color: expenseColors[10] },
];

const resetCategories = () => {
  incomeCategories.forEach((c) => (c.amount = 0));
  expenseCategories.forEach((c) => (c.amount = 0));
};

export { resetCategories, incomeCategories, expenseCategories };
