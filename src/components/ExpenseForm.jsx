import { useState, useEffect } from "react";

function ExpenseForm(props) {
  const [newExpense, setNewExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (props.editExpense) {
      setNewExpense(props.editExpense.name);
      setAmount(props.editExpense.amount);
      setDate(props.editExpense.date);
      setCategory(props.editExpense.category);
    }
  }, [props.editExpense]);
  function addExpense() {
    const numericAmount = Number(amount);
    if (newExpense.trim() === "") return;
    if (category === "") return;
    if (isNaN(numericAmount) || numericAmount <= 0) return;
    if (props.editExpense) {
      const updatedList = props.expenseList.map((expense) => {
        if (expense.id === props.editExpense.id) {
          return {
            ...expense,
            name: newExpense,
            amount: numericAmount,
            date,
            category,
          };
        }
        return expense;
      });

      props.setExpenseList(updatedList);

      setNewExpense("");
      setAmount("");
      setDate("");
      setCategory("");
      props.setEditExpense(null);
    } else {
      props.setExpenseList([
        ...props.expenseList,
        {
          id: crypto.randomUUID(),
          name: newExpense,
          amount: numericAmount,
          date,
          category,
        },
      ]);

      setNewExpense("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  }
  return (
    <>
      <div>
        <label>Enter an new expense:</label>
        <input
          type="text"
          placeholder="eg.(food)"
          value={newExpense}
          onChange={(event) => {
            setNewExpense(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Enter the expenditure:</label>
        <input
          type="number"
          placeholder="eg.(300)"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Enter the date:</label>
        <input
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Enter the category of the expense:</label>
        <br></br>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="">Select Category</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing / Rent">Housing / Rent</option>
          <option value="Bills & Utilities">Bills & Utilities</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div id="btns">
        <button onClick={addExpense}>
          {props.editExpense ? "Save Updates" : "Add An Expense"}
        </button>
        <button
          onClick={() => {
            props.setExpenseList([]);
            setNewExpense("");
            setAmount("");
            setDate("");
            setCategory("");
          }}
        >
          Clear All
        </button>
      </div>
    </>
  );
}
export default ExpenseForm;
