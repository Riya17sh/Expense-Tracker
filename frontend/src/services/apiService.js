import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/expenses';

const apiService = {
  // Get all expenses with optional filters
  getExpenses: async (startDate, endDate, category) => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (category) params.append('category', category);

      const response = await axios.get(`${API_BASE_URL}${params.toString() ? '?' + params.toString() : ''}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  // Create new expense
  createExpense: async (amount, category, description, expenseDate) => {
    try {
      const response = await axios.post(API_BASE_URL, {
        amount,
        category,
        description,
        expenseDate,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  // Update expense
  updateExpense: async (id, amount, category, description, expenseDate) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        amount,
        category,
        description,
        expenseDate,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },

  // Get summary by category
  getSummaryByCategory: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summary/category?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  },

  // Get totals (today, week, month)
  getTotals: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/totals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching totals:', error);
      throw error;
    }
  },
};

export default apiService;
