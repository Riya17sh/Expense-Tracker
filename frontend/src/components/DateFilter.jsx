import React, { useState } from 'react';
import '../styles/DateFilter.css';


const DateFilter = ({ onFilter, onReset }) => {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('month');

  function getFirstDayOfMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  }

  const handleQuickFilter = (newView) => {
    setView(newView);
    const today = new Date();

    if (newView === 'all') {
      onReset();
      return;
    }

    let newStartDate = today.toISOString().split('T')[0];

    if (newView === 'today') {
      newStartDate = today.toISOString().split('T')[0];
    } else if (newView === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      newStartDate = weekAgo.toISOString().split('T')[0];
    } else if (newView === 'month') {
      newStartDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    }

    setStartDate(newStartDate);
    setEndDate(today.toISOString().split('T')[0]);
    onFilter(newStartDate, today.toISOString().split('T')[0]);
  };

  const handleCustomFilter = () => {
    onFilter(startDate, endDate);
    setView('month');
  };

  return (
    <div className="date-filter">
      <h3>Filter by Date</h3>

      <div className="quick-filters">
        <button className={view === 'all' ? 'active' : ''} onClick={() => handleQuickFilter('all')}>
          All
        </button>
        <button className={view === 'today' ? 'active' : ''} onClick={() => handleQuickFilter('today')}>
          Today
        </button>
        <button className={view === 'week' ? 'active' : ''} onClick={() => handleQuickFilter('week')}>
          This Week
        </button>
        <button className={view === 'month' ? 'active' : ''} onClick={() => handleQuickFilter('month')}>
          This Month
        </button>
      </div>

      <div className="custom-range">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span>to</span>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleCustomFilter}>Filter</button>
      </div>
    </div>
  );
};

export default DateFilter;
