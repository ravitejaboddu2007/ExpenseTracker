import "./AnalyticsPage.css";
function AnalyticsPage({ expenseList }) {
  let maxAmountPerCategory = 0;
  let maxSpentCategory;
  const categoryTotals = {};
  let maxAmountPerExpense = 0;
  let maxExpense;
  const monthlyTotals = {};
  const total = expenseList.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  expenseList.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
    if (expense.amount > maxAmountPerExpense) {
      maxAmountPerExpense = expense.amount;
      maxExpense = expense;
    }
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (monthlyTotals[monthYear]) {
      monthlyTotals[monthYear] += expense.amount;
    } else {
      monthlyTotals[monthYear] = expense.amount;
    }
  });
  const categoryTotalsArr = Object.entries(categoryTotals);
  categoryTotalsArr.forEach((category) => {
    if (category[1] > maxAmountPerCategory) {
      maxSpentCategory = category[0];
      maxAmountPerCategory = category[1];
    }
  });
  const monthlyTotalsArr = Object.entries(monthlyTotals);
  const date1 = maxExpense
    ? new Date(maxExpense.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  return (
    <>
      <div className="Analytics">
        <div className="Heading">
          <h2>📊 Analytics</h2>
        </div>

        {total > 0 ? (
          <>
            <div className="summary-grid">
              <div className="total">
                <h3>Total Expenses</h3>
                <span>₹{total}</span>
              </div>
              <div className="total">
                <h3>Highest Spending Category</h3>
                <span>{maxSpentCategory}</span>
                <span>₹{maxAmountPerCategory}</span>
              </div>
            </div>
            <div className="summary-grid">
              <div className="highest-expense">
                <h3>Highest Individual Expense </h3>
                <p>{maxExpense.name}</p>
                <span>₹{maxExpense.amount}</span>
                <p>
                  {maxExpense.category}•{date1}
                </p>
              </div>
              <div className="monthly-breakdown">
                <h3>Monthly Breakdown</h3>
                {monthlyTotalsArr.map(([year, total]) => {
                  return (
                    <div className="monthly-row" key={year}>
                      <span className="year">{year}</span>
                      <span>₹{total}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="category-breakdown">
              <h3>Category Breakdown:</h3>
              {categoryTotalsArr.map(([category, categoryTotal]) => {
                return (
                  <div className="category-row" key={category}>
                    <span className="category-name">{category}</span>
                    <span className="category-total">₹{categoryTotal}</span>
                    <span className="category-total">
                      {((categoryTotal * 100) / total).toFixed(2)}%
                    </span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(categoryTotal * 100) / total}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="no-expense">No expenses!</div>
        )}
      </div>
    </>
  );
}
export default AnalyticsPage;
