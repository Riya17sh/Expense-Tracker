# My ExpenseTracker

A modern, efficient web application for tracking expenses with category-wise organization and daily, weekly, and monthly views. (Converted to JSX/JavaScript and ESM modules)

## Features

✅ **Add & Manage Expenses** - Quickly add expenses with category, amount (₹), date, and description
✅ **Category-wise Tracking** - Organize expenses by categories (Food, Transportation, Entertainment, Shopping, Bills, Health, Other)
✅ **Multiple Time Views** - View expenses for today, this week, this month, or custom date ranges
✅ **Summary Dashboard** - See spending totals for today, week, and month at a glance
✅ **Category Summary** - View total spending by category with item counts
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
✅ **Simple & Intuitive UI** - Clean, user-friendly interface with smooth interactions

## Project Structure

```
my-expense-tracker/
├── backend/
│   ├── src/
│   │   ├── server.js           # Main Express server
│   │   ├── db.js               # Database connection & initialization
│   │   ├── models/
│   │   │   └── Expense.js       # Expense model with database queries
│   │   ├── controllers/
│   │   │   └── expenseController.js  # API route handlers
│   │   └── routes/
│   │       └── expenses.js      # API routes
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── App.jsx              # Main app component (JSX)
│   │   ├── index.jsx            # React entry point
│   │   ├── services/
│   │   │   └── apiService.js    # API client
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx     # Form to add expenses
│   │   │   ├── ExpenseList.jsx     # List of expenses
│   │   │   ├── Dashboard.jsx       # Summary dashboard
│   │   │   └── DateFilter.jsx      # Date filtering
│   │   └── styles/
│   │       ├── index.css
│   │       ├── ExpenseForm.css
│   │       ├── ExpenseList.css
│   │       ├── Dashboard.css
│   │       └── DateFilter.css
│   ├── .env                    # Environment variables
│   └── package.json
│
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

## Installation & Setup

### 1. Clone or Download the Project

```bash
cd my-expense-tracker
```

### 2. Set Up PostgreSQL Database

First, create a PostgreSQL database:

```sql
CREATE DATABASE expense_tracker;
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure the database connection in `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
PORT=5000
NODE_ENV=development
```

Replace `username` and `password` with your PostgreSQL credentials.

Start the backend server:

```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

The `.env` file is already configured to point to the backend API at `http://localhost:5000/api`

Start the frontend development server:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Usage

1. **Add an Expense**: Fill out the form on the left with amount, category, date, and description, then click "Add Expense"

2. **Filter by Date**: Use the quick filters (Today, This Week, This Month) or set a custom date range

3. **View Summary**: Check the dashboard for spending totals and category-wise breakdowns

4. **Manage Expenses**: Delete expenses by clicking the "Delete" button next to each item

5. **View Statistics**: The dashboard automatically updates to show:
   - Total spent today
   - Total spent this week
   - Total spent this month
   - Breakdown by category

## API Endpoints

### GET /api/expenses
Get all expenses or filter by date range/category
- Query params: `startDate`, `endDate`, `category`

### POST /api/expenses
Create a new expense
- Body: `{ amount, category, description, expenseDate }`

### PUT /api/expenses/:id
Update an existing expense
- Body: `{ amount, category, description, expenseDate }`

### DELETE /api/expenses/:id
Delete an expense

### GET /api/expenses/summary/category
Get spending summary by category
- Query params: `startDate`, `endDate`

### GET /api/expenses/totals
Get totals for today, week, and month

## Technologies Used

**Backend:**
- Node.js & Express.js
- PostgreSQL
- CORS middleware
- Dotenv for configuration

**Frontend:**
- React 18 with TypeScript
- Axios for API calls
- CSS3 for styling
- Responsive design

## Development

### Backend Commands
```bash
npm run dev      # Run with nodemon (auto-restart)
npm start        # Run production server
```

### Frontend Commands
```bash
npm start        # Start development server
npm build        # Build for production
npm test         # Run tests
```

## Features Implementation Details

### Database Schema
The `expenses` table includes:
- `id` - Primary key
- `amount` - Decimal amount of the expense
- `category` - Category name
- `description` - Optional description
- `expense_date` - Date of the expense
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated

### Frontend State Management
The App component manages:
- `expenses` - Array of expense objects
- `totals` - Spending totals (today, week, month)
- `summary` - Category-wise spending breakdown
- `loading` - Loading state for API calls
- `error` - Error messages
- `currentDateRange` - Active date filter

## Troubleshooting

**Backend won't start?**
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify port 5000 is available

**Frontend can't connect to API?**
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend
- Verify API URL in frontend `.env`

**Empty database?**
- Database tables are created automatically on first backend run
- Try adding a new expense

## Future Enhancements

- User authentication & multiple user support
- Budget limits and spending alerts
- Export expenses to CSV/PDF
- Charts and graphs for visualization
- Recurring expenses
- Receipt upload functionality
- Mobile app version
- Dark mode theme

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check the project structure and ensure all dependencies are installed correctly.
