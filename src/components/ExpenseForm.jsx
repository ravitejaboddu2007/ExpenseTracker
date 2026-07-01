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
    } else {
      setNewExpense("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  }, [props.editExpense]);

  function addExpense() {
    const result = validateExpense();

    if (!result) return;
    props.setExpenseList([
      ...props.expenseList,
      {
        id: crypto.randomUUID(),
        name: newExpense,
        amount: result.numericAmount,
        date,
        category,
      },
    ]);

    setNewExpense("");
    setAmount("");
    setDate("");
    setCategory("");
  }

  function updateExpense() {
    const result = validateExpense();

    if (!result) return;
    const updatedList = props.expenseList.map((expense) => {
      if (expense.id === props.editExpense.id) {
        return {
          ...expense,
          name: newExpense,
          amount: result.numericAmount,
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
  }
  function validateExpense() {
    if (newExpense.trim() === "") return false;
    if (category === "") return false;
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return false;
    if (!date) return false;

    const selectedDate = new Date(date);
    if (selectedDate < new Date("2020-01-01")) {
      alert("Please enter a date from 2020 onwards");
      return false;
    }

    if (selectedDate > new Date()) {
      alert("Future dates are not allowed");
      return false;
    }

    return {
      numericAmount,
    };
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
        {props.editExpense ? (
          <>
            <button onClick={updateExpense}>Save Updates</button>
            <button
              onClick={() => {
                props.setEditExpense(null);
                setNewExpense("");
                setAmount("");
                setDate("");
                setCategory("");
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addExpense}>Add An Expense</button>
        )}
        <button
          onClick={() => {
            props.setExpenseList([]);
            setNewExpense("");
            setAmount("");
            setDate("");
            setCategory("");
            props.setEditExpense(null);
          }}
        >
          Clear All
        </button>
      </div>
    </>
  );
}
export default ExpenseForm;
