function ExpenseList(props) {
  function deleteExpense(id) {
    const updatedList = props.expenseList.filter((expense) => {
      return expense.id !== id;
    });

    props.setExpenseList(updatedList);
  }
  const total = props.filteredExpenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <>
      <h3>Expenses</h3>
      {props.filteredExpenses.length === 0 ? (
        <ul className="expense-list">
          <li>
            <span className="expense-name">---</span>
            <span>---</span>
            <span>---</span>
            <span>---</span>
            <span>---</span>
          </li>
        </ul>
      ) : (
        <ol className="expense-list" type="1">
          {props.filteredExpenses.map((expense, index) => (
            <li key={expense.id}>
              <span>{index + 1}.</span>
              <span className="expense-name">{expense.name}</span>
              <span>₹{expense.amount}</span>
              <span>{expense.date.split("-").reverse().join("-")}</span>
              <span>[{expense.category}]</span>
              <button onClick={() => deleteExpense(expense.id)}>
                Remove expense
              </button>
            </li>
          ))}
        </ol>
      )}
      <p>
        <b>No.of Expenses: {props.filteredExpenses.length}</b>
      </p>
      <h3>Total: ₹{total}</h3>
    </>
  );
}
export default ExpenseList;
