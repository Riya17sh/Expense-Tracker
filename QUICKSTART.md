# Quick Start Guide - ExpenseTracker

## 📋 What's Been Built

Your expense tracker application includes:

### Backend (Node.js/Express + PostgreSQL)
✅ Database setup and configuration
✅ Expense model with full CRUD operations
✅ API routes for managing expenses
✅ Controllers for handling requests
✅ Summary statistics (by category, daily, weekly, monthly)

### Frontend (React + TypeScript)
✅ Responsive UI with modern design
✅ Expense form for adding new expenses
✅ Expense list with delete functionality
✅ Dashboard with spending totals
✅ Date range filtering (today, week, month, custom)
✅ Category-wise spending breakdown

## 🚀 Quick Start

### Step 1: Setup PostgreSQL
```bash
# Create database (using PostgreSQL CLI)
createdb expense_tracker
```

### Step 2: Start Backend
```bash
cd backend
npm install
# Update .env with your PostgreSQL credentials
npm run dev
# Backend runs on http://localhost:5000
```

### Step 3: Start Frontend (new terminal)
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

## 💡 How to Use

1. **Add Expense**: Fill the form on the left with:
   - Amount (₹)
   - Category (Food, Transportation, etc.)
   - Date
   - Description (optional)

2. **View Summary**: Check the dashboard for:
   - Today's total
   - Week's total
   - Month's total
   - Spending breakdown by category

3. **Filter Expenses**: Use date filters to view:
   - All expenses
   - Today's expenses
   - This week's expenses
   - This month's expenses
   - Custom date range

4. **Delete Expense**: Click the Delete button on any expense

## 🎨 Key Features

- **Multiple Views**: Today, Week, Month, and custom date ranges
- **Category Tracking**: Organize expenses into 7 predefined categories
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Dashboard updates automatically
- **Simple & Clean UI**: Intuitive interface for easy tracking

## 📁 Project Files Created

**Backend:**
- `src/db.js` - Database connection
- `src/server.js` - Express server setup
- `src/models/Expense.js` - Database queries
- `src/controllers/expenseController.js` - API handlers
- `src/routes/expenses.js` - API routes
- `.env` - Configuration

**Frontend:**
- `src/App.tsx` - Main component
- `src/components/` - React components
- `src/services/apiService.ts` - API client
- `src/styles/` - CSS styles
- `public/index.html` - HTML template
- `.env` - Configuration

## ⚙️ Environment Variables

**Backend (.env):**
```
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔧 Available Scripts

**Backend:**
- `npm run dev` - Run with auto-reload
- `npm start` - Production start

**Frontend:**
- `npm start` - Development server
- `npm build` - Production build
- `npm test` - Run tests

## 📊 Database Schema

**Expenses Table:**
- `id` - Primary key
- `amount` - Expense amount
- `category` - Category name
- `description` - Description
- `expense_date` - Date of expense
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp

## 🎯 Categories Supported

- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Health
- Other

## ✨ Next Steps

1. Install Node.js dependencies in both directories
2. Set up PostgreSQL database
3. Configure environment variables
4. Run the backend server
5. Run the frontend development server
6. Start tracking expenses!

## 🆘 Troubleshooting

**Backend won't connect to database?**
- Verify PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Ensure database 'expense_tracker' exists

**Frontend shows "Failed to load" error?**
- Make sure backend is running on port 5000
- Check CORS is enabled
- Verify API URL in frontend/.env

**Dependencies installation issues?**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Update Node.js to latest version

## 🌟 Features Highlight

✅ Add expenses with amount, category, date, and description
✅ Get instant spending totals (today, week, month)
✅ View category-wise spending breakdown
✅ Filter by custom date ranges
✅ Delete expenses with one click
✅ Beautiful, responsive UI
✅ Real-time data updates
✅ Quick category selection
✅ Mobile-friendly design

Happy tracking! 💰
