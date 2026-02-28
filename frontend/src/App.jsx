import React, { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import DateFilter from './components/DateFilter';
import apiService from './services/apiService';
import './styles/index.css';


function App() {
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState(null);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDateRange, setCurrentDateRange] = useState(null);

  // Load initial data
  useEffect(() => {
    loadExpenses();
    loadTotals();
    loadSummary();
  }, []);

  const loadExpenses = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getExpenses(startDate, endDate);
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTotals = async () => {
    try {
      const data = await apiService.getTotals();
      setTotals(data);
    } catch (err) {
      console.error('Failed to load totals:', err);
    }
  };

  const loadSummary = async (startDate, endDate) => {
    try {
      const start = startDate || getFirstDayOfMonth();
      const end = endDate || new Date().toISOString().split('T')[0];
      const data = await apiService.getSummaryByCategory(start, end);
      setSummary(data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  };

  function getFirstDayOfMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  }

  const handleAddExpense = async (expense) => {
    try {
      setLoading(true);
      await apiService.createExpense(expense.amount, expense.category, expense.description, expense.expenseDate);

      // Reload data
      if (currentDateRange) {
        loadExpenses(currentDateRange.start, currentDateRange.end);
      } else {
        loadExpenses();
      }
      loadTotals();
      loadSummary(currentDateRange?.start, currentDateRange?.end);

      setError(null);
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      setLoading(true);
      await apiService.deleteExpense(id);

      // Reload data
      if (currentDateRange) {
        loadExpenses(currentDateRange.start, currentDateRange.end);
      } else {
        loadExpenses();
      }
      loadTotals();
      loadSummary(currentDateRange?.start, currentDateRange?.end);

      setError(null);
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (startDate, endDate) => {
    setCurrentDateRange({ start: startDate, end: endDate });
    loadExpenses(startDate, endDate);
    loadSummary(startDate, endDate);
  };

  const handleResetFilter = () => {
    setCurrentDateRange(null);
    loadExpenses();
    loadSummary();
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>💰 ExpenseTracker</h1>
        <p>Track your expenses efficiently and simply</p>
      </div>

      {error && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div className="content">
        <div className="sidebar">
          <ExpenseForm onSubmit={handleAddExpense} />
          <DateFilter onFilter={handleFilter} onReset={handleResetFilter} />
        </div>

        <div className="main">
          <Dashboard totals={totals} summary={summary} />
          {loading && <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Loading...</div>}
          {!loading && <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />}
        </div>
      </div>
    </div>
  );
}

export default App;
