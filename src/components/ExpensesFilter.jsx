function ExpensesFilter(props) {
  return (
    <>
      <label>Filter by Category:</label>
      <select
        value={props.filter}
        onChange={(event) => {
          props.setFilter(event.target.value);
        }}
      >
        <option value="All">All Categories</option>
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
    </>
  );
}
export default ExpensesFilter;
