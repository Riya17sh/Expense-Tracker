import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ totals, summary }) => {
  return (
    <div className="dashboard">
      <h2>Summary</h2>

      {totals && (
        <div className="totals-container">
          <div className="total-card">
            <h3>Today</h3>
            <p className="amount">₹{totals.today.toFixed(2)}</p>
          </div>
          <div className="total-card">
            <h3>This Week</h3>
            <p className="amount">₹{totals.week.toFixed(2)}</p>
          </div>
          <div className="total-card">
            <h3>This Month</h3>
            <p className="amount">₹{totals.month.toFixed(2)}</p>
          </div>
        </div>
      )}

      {summary.length > 0 && (
        <div className="category-summary">
          <h3>By Category</h3>
          <div className="category-list">
            {summary.map((item) => (
              <div key={item.category} className="category-item">
                <span className="category-name">{item.category}</span>
                <span className="category-count">({item.count} items)</span>
                <span className="category-amount">₹{parseFloat(item.total_amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
