import { pool } from '../db.js';

// Create a new expense
const createExpense = async (amount, category, description, expenseDate) => {
  const query = `
    INSERT INTO expenses (amount, category, description, expense_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(query, [amount, category, description, expenseDate]);
  const row = result.rows[0];
  return { ...row, amount: parseFloat(row.amount) };
};

// Get all expenses
const getAllExpenses = async () => {
  const query = 'SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC';
  const result = await pool.query(query);
  return result.rows.map(r => ({ ...r, amount: parseFloat(r.amount) }));
};

// Get expenses for a specific date range
const getExpensesByDateRange = async (startDate, endDate) => {
  const query = `
    SELECT * FROM expenses 
    WHERE expense_date BETWEEN $1 AND $2 
    ORDER BY expense_date DESC
  `;
  const result = await pool.query(query, [startDate, endDate]);
  return result.rows.map(r => ({ ...r, amount: parseFloat(r.amount) }));
};

// Get expenses by category
const getExpensesByCategory = async (category) => {
  const query = `
    SELECT * FROM expenses 
    WHERE category = $1 
    ORDER BY expense_date DESC
  `;
  const result = await pool.query(query, [category]);
  return result.rows.map(r => ({ ...r, amount: parseFloat(r.amount) }));
};

// Get expense summary by category
const getSummaryByCategory = async (startDate, endDate) => {
  const query = `
    SELECT category, SUM(amount) as total_amount, COUNT(*) as count
    FROM expenses 
    WHERE expense_date BETWEEN $1 AND $2 
    GROUP BY category 
    ORDER BY total_amount DESC
  `;
  const result = await pool.query(query, [startDate, endDate]);
  return result.rows.map(r => ({ ...r, total_amount: parseFloat(r.total_amount) }));
};

// Update an expense
const updateExpense = async (id, amount, category, description, expenseDate) => {
  const query = `
    UPDATE expenses 
    SET amount = $1, category = $2, description = $3, expense_date = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
  `;
  const result = await pool.query(query, [amount, category, description, expenseDate, id]);
  const row = result.rows[0];
  return row ? { ...row, amount: parseFloat(row.amount) } : null;
};

// Delete an expense
const deleteExpense = async (id) => {
  const query = 'DELETE FROM expenses WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get total for today
const getTodayTotal = async () => {
  const query = `
    SELECT SUM(amount) as total FROM expenses 
    WHERE expense_date = CURRENT_DATE
  `;
  const result = await pool.query(query);
  return result.rows[0].total || 0;
};

// Get total for current week
const getWeekTotal = async () => {
  const query = `
    SELECT SUM(amount) as total FROM expenses 
    WHERE expense_date >= CURRENT_DATE - INTERVAL '7 days'
  `;
  const result = await pool.query(query);
  return result.rows[0].total || 0;
};

// Get total for current month
const getMonthTotal = async () => {
  const query = `
    SELECT SUM(amount) as total FROM expenses 
    WHERE DATE_TRUNC('month', expense_date) = DATE_TRUNC('month', CURRENT_DATE)
  `;
  const result = await pool.query(query);
  return result.rows[0].total || 0;
};

export {
  createExpense,
  getAllExpenses,
  getExpensesByDateRange,
  getExpensesByCategory,
  getSummaryByCategory,
  updateExpense,
  deleteExpense,
  getTodayTotal,
  getWeekTotal,
  getMonthTotal,
};
