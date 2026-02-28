import * as Expense from '../models/Expense.js';

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    let expenses;
    if (startDate && endDate) {
      expenses = await Expense.getExpensesByDateRange(startDate, endDate);
    } else if (category) {
      expenses = await Expense.getExpensesByCategory(category);
    } else {
      expenses = await Expense.getAllExpenses();
    }

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// Create new expense
const createExpense = async (req, res) => {
  try {
    const { amount, category, description, expenseDate } = req.body;

    if (!amount || !category || !expenseDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expense = await Expense.createExpense(amount, category, description, expenseDate);
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, expenseDate } = req.body;

    if (!amount || !category || !expenseDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expense = await Expense.updateExpense(id, amount, category, description, expenseDate);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.deleteExpense(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully', expense });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// Get summary by category
const getSummaryByCategory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const summary = await Expense.getSummaryByCategory(startDate, endDate);
    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

// Get totals
const getTotals = async (req, res) => {
  try {
    const today = await Expense.getTodayTotal();
    const week = await Expense.getWeekTotal();
    const month = await Expense.getMonthTotal();

    res.json({
      today: parseFloat(today),
      week: parseFloat(week),
      month: parseFloat(month),
    });
  } catch (error) {
    console.error('Error fetching totals:', error);
    res.status(500).json({ error: 'Failed to fetch totals' });
  }
};

export {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummaryByCategory,
  getTotals,
};