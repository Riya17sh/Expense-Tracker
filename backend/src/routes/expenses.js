import express from 'express';
import * as expenseController from '../controllers/expenseController.js';

const router = express.Router();

// GET all expenses (with optional filters)
router.get('/', expenseController.getExpenses);

// GET expenses summary by category
router.get('/summary/category', expenseController.getSummaryByCategory);

// GET totals (today, week, month)
router.get('/totals', expenseController.getTotals);

// POST create new expense
router.post('/', expenseController.createExpense);

// PUT update expense
router.put('/:id', expenseController.updateExpense);

// DELETE expense
router.delete('/:id', expenseController.deleteExpense);

export default router;