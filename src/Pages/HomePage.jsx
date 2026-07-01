import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpensesFilter from "../components/ExpensesFilter.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
function HomePage(props) {
  const [editExpense, setEditExpense] = useState(null);
  const [filter, setFilter] = useState("All");
  const filteredExpenses =
    filter === "All"
      ? props.expenseList
      : props.expenseList.filter((expense) => {
          return expense.category === filter;
        });

  return (
    <>
      <div id="box">
        <ExpenseForm
          setExpenseList={props.setExpenseList}
          expenseList={props.expenseList}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
          setFilter={setFilter}
        />
        <ExpensesFilter filter={filter} setFilter={setFilter} />
        <ExpenseList
          expenseList={props.expenseList}
          filteredExpenses={filteredExpenses}
          setExpenseList={props.setExpenseList}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      </div>
    </>
  );
}
export default HomePage;
