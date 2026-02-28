import React, { useState } from 'react';
import '../styles/ExpenseForm.css';


const CATEGORIES = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

const ExpenseForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !expenseDate) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      expenseDate,
    });

    // Reset form
    setAmount('');
    setCategory('Food');
    setDescription('');
    setExpenseDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>

      <div className="form-group">
        <label htmlFor="amount">Amount (₹)</label>
        <input
          type="number"
          id="amount"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="expenseDate">Date</label>
        <input type="date" id="expenseDate" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
          rows={3}
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
