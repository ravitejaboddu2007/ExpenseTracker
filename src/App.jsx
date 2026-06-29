import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpensesFilter from "./components/ExpensesFilter.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import "./App.css";

function App() {
  const [expenseList, setExpenseList] = useState(() => {
    const storedExpenses = localStorage.getItem("list");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [filter, setFilter] = useState("All");
  const filteredExpenses =
    filter === "All"
      ? expenseList
      : expenseList.filter((expense) => {
          return expense.category === filter;
        });
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(expenseList));
  }, [expenseList]);
  return (
    <>
      <div className="app">
        <nav id="navBar">
          <h1>Expense Tracker</h1>
        </nav>
        <div id="box">
          <ExpenseForm
            setExpenseList={setExpenseList}
            expenseList={expenseList}
          />
          <ExpensesFilter filter={filter} setFilter={setFilter} />
          <ExpenseList
            expenseList={expenseList}
            filteredExpenses={filteredExpenses}
            setExpenseList={setExpenseList}
          />
        </div>
      </div>
    </>
  );
}
export default App;
