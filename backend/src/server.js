import express from 'express';
import cors from 'cors';
import { initializeDB } from './db.js';
import expenseRoutes from './routes/expenses.js';

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database
initializeDB();

// Routes
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('ExpenseTracker API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
