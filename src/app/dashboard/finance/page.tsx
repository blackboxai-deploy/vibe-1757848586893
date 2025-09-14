'use client';

import { useState } from 'react';

// Sample financial data
const financialData = {
  '6months': {
    revenue: [
      { period: 'Jan 2024', amount: 425000, growth: 12.5 },
      { period: 'Feb 2024', amount: 485000, growth: 14.1 },
      { period: 'Mar 2024', amount: 525000, growth: 8.2 },
      { period: 'Apr 2024', amount: 478000, growth: -8.9 },
      { period: 'May 2024', amount: 556000, growth: 16.3 },
      { period: 'Jun 2024', amount: 598000, growth: 7.6 },
    ],
    expenses: [
      { period: 'Jan 2024', amount: 325000 },
      { period: 'Feb 2024', amount: 345000 },
      { period: 'Mar 2024', amount: 375000 },
      { period: 'Apr 2024', amount: 355000 },
      { period: 'May 2024', amount: 385000 },
      { period: 'Jun 2024', amount: 395000 },
    ]
  }
};

const keyMetrics = {
  totalRevenue: 3067000,
  totalExpenses: 2180000,
  netProfit: 887000,
  profitMargin: 28.9,
  averageOrderValue: 1245,
  customerLifetimeValue: 15680
};

export default function FinancePage() {
  const [dateRange, setDateRange] = useState('6months');
  const [activeView, setActiveView] = useState('overview');
  const [chartType, setChartType] = useState('line');

  const currentData = financialData[dateRange as keyof typeof financialData] || financialData['6months'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  };

  const getDateRangeLabel = () => {
    const labels = {
      '6months': 'Past 6 Months',
      '1year': 'Past 1 Year',
      '2years': 'Past 2 Years',
      'custom': 'Custom Range'
    };
    return labels[dateRange as keyof typeof labels] || 'Past 6 Months';
  };

  const views = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'profit-analysis', name: 'Profit Analysis', icon: '💰' },
    { id: 'revenue-breakdown', name: 'Revenue Breakdown', icon: '📈' },
    { id: 'expense-analysis', name: 'Expense Analysis', icon: '💳' },
    { id: 'forecasting', name: 'Forecasting', icon: '🔮' }
  ];

  return (
    <div className="space-y-6">
      {/* Header - Stripe Style */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track revenue, expenses, and profitability with real-time insights
            </p>
          </div>
          
          <div className="mt-4 flex space-x-3 sm:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="6months">Past 6 Months</option>
              <option value="1year">Past 1 Year</option>
              <option value="2years">Past 2 Years</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              📊 Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics - Stripe Cards Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(keyMetrics.totalRevenue)}
          </p>
          <p className="text-sm text-gray-600">
            {getDateRangeLabel()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">
              +8.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(keyMetrics.totalExpenses)}
          </p>
          <p className="text-sm text-gray-600">
            {getDateRangeLabel()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
              +24.8%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Net Profit</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(keyMetrics.netProfit)}
          </p>
          <p className="text-sm text-gray-600">
            {keyMetrics.profitMargin}% margin
          </p>
        </div>
      </div>

      {/* View Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Financial Analysis</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === view.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{view.icon}</span>
                {view.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Chart Type Selection */}
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-gray-900">
              {views.find(v => v.id === activeView)?.name} - {getDateRangeLabel()}
            </h4>
            <div className="flex space-x-2">
              {['line', 'bar', 'pie'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    chartType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                </button>
              ))}
            </div>
          </div>

          {/* Chart Placeholder - Stripe Style */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart Visualization
            </h3>
            <p className="text-gray-600 mb-6">
              Interactive {activeView.replace('-', ' ')} chart would be displayed here using Recharts or similar library
            </p>
            
            {/* Sample Data Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Revenue Trend ({getDateRangeLabel()})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {currentData.revenue.map((item, index) => (
                  <div key={index} className="text-left">
                    <p className="text-gray-500">{item.period}</p>
                    <p className="font-medium text-gray-900">{formatCurrency(item.amount)}</p>
                    <p className={`text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(item.growth)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Financial Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            {[
              { category: 'Prescription Drugs', amount: 1850000, percentage: 60.3, color: 'bg-blue-500' },
              { category: 'Over-the-Counter', amount: 737000, percentage: 24.0, color: 'bg-green-500' },
              { category: 'Medical Devices', amount: 308000, percentage: 10.0, color: 'bg-yellow-500' },
              { category: 'Supplements', amount: 172000, percentage: 5.7, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total revenue</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Score</h3>
          
          {/* Health Score Circle */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">85</span>
            </div>
            <p className="text-sm text-gray-600">Excellent financial health</p>
          </div>

          {/* Health Indicators */}
          <div className="space-y-3">
            {[
              { metric: 'Cash Flow', score: 92, status: 'Excellent' },
              { metric: 'Profit Margins', score: 88, status: 'Good' },
              { metric: 'Inventory Turnover', score: 85, status: 'Good' },
              { metric: 'Receivables', score: 79, status: 'Average' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.score}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.score >= 90 ? 'bg-green-100 text-green-800' :
                    item.score >= 80 ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}