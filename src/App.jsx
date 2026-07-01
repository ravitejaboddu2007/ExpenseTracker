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
      <div className="app">
        <nav id="navBar">
          <Link to="/">
            <h1>Expense Tracker</h1>
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                expenseList={expenseList}
                setExpenseList={setExpenseList}
              />
            }
          ></Route>
          <Route
            path="/analytics"
            element={<AnalyticsPage expenseList={expenseList} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
export default App;
