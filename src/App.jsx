import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import "./App.css";
import AnalyticsPage from "./Pages/AnalyticsPage.jsx";

function App() {
  const [expenseList, setExpenseList] = useState(() => {
    const storedExpenses = localStorage.getItem("list");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(expenseList));
  }, [expenseList]);

  return (
    <>
      <nav id="navBar">
        <Link to="/">
          <h1>Expense Tracker</h1>
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <HomePage
                expenseList={expenseList}
                setExpenseList={setExpenseList}
              />
            </div>
          }
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage expenseList={expenseList} />}
        />
      </Routes>
    </>
  );
}
export default App;
