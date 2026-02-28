import React from 'react';
import '../styles/ExpenseList.css';


const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <div className="empty-message">No expenses found. Add your first expense!</div>;
  }

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      <div className="list-container">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-details">
              <div className="expense-category">{expense.category}</div>
              <div className="expense-description">{expense.description || 'No description'}</div>
              <div className="expense-date">{new Date(expense.expense_date).toLocaleDateString()}</div>
            </div>
            <div className="expense-right">
              <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
              <button className="delete-btn" onClick={() => onDelete(expense.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
