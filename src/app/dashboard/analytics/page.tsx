'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for charts
const salesData = [
  { month: 'Jan', revenue: 425000, expenses: 325000, sales: 1240 },
  { month: 'Feb', revenue: 485000, expenses: 345000, sales: 1455 },
  { month: 'Mar', revenue: 525000, expenses: 375000, sales: 1678 },
  { month: 'Apr', revenue: 478000, expenses: 355000, sales: 1523 },
  { month: 'May', revenue: 556000, expenses: 385000, sales: 1789 },
  { month: 'Jun', revenue: 598000, expenses: 395000, sales: 1923 },
];

const categoryData = [
  { name: 'Analgesics', value: 35, color: '#3B82F6' },
  { name: 'Antibiotics', value: 28, color: '#10B981' },
  { name: 'Cardiovascular', value: 22, color: '#F59E0B' },
  { name: 'Diabetes', value: 15, color: '#EF4444' },
];

const inventoryTrends = [
  { month: 'Jan', inStock: 4250, lowStock: 125, criticalStock: 45 },
  { month: 'Feb', inStock: 4456, lowStock: 98, criticalStock: 32 },
  { month: 'Mar', inStock: 4689, lowStock: 142, criticalStock: 28 },
  { month: 'Apr', inStock: 4523, lowStock: 156, criticalStock: 41 },
  { month: 'May', inStock: 4721, lowStock: 134, criticalStock: 35 },
  { month: 'Jun', inStock: 4892, lowStock: 123, criticalStock: 29 },
];

const topSuppliers = [
  { name: 'PharmaCorp Ltd', orders: 245, value: 485000 },
  { name: 'MediSupply Co', orders: 189, value: 398000 },
  { name: 'Global Pharma', orders: 167, value: 356000 },
  { name: 'HeartMeds Inc', orders: 134, value: 298000 },
  { name: 'CardioSupply', orders: 123, value: 267000 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6months');
  const [activeChart, setActiveChart] = useState('revenue');

  const getTitle = () => {
    const ranges = {
      '6months': 'Past 6 Months',
      '1year': 'Past 1 Year', 
      '2years': 'Past 2 Years',
      'custom': 'Custom Range'
    };
    return ranges[dateRange as keyof typeof ranges] || 'Past 6 Months';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive insights into your supply chain performance
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="6months">Past 6 Months</option>
            <option value="1year">Past 1 Year</option>
            <option value="2years">Past 2 Years</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$3.2M</p>
              <p className="text-sm text-green-600">+12.5% from last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900">24.8%</p>
              <p className="text-sm text-green-600">+2.1% from last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Inventory Turnover</p>
              <p className="text-2xl font-bold text-gray-900">6.2x</p>
              <p className="text-sm text-blue-600">Above industry avg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Order Fulfillment</p>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
              <p className="text-sm text-green-600">+0.8% from last period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'revenue', name: 'Revenue Analysis', icon: '💰' },
            { id: 'inventory', name: 'Inventory Trends', icon: '📦' },
            { id: 'categories', name: 'Category Distribution', icon: '📊' },
            { id: 'suppliers', name: 'Supplier Performance', icon: '🏢' }
          ].map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === chart.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{chart.icon}</span>
              {chart.name}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {activeChart === 'revenue' && `Revenue & Expenses - ${getTitle()}`}
            {activeChart === 'inventory' && `Inventory Levels - ${getTitle()}`}
            {activeChart === 'categories' && `Sales by Category - ${getTitle()}`}
            {activeChart === 'suppliers' && `Top Suppliers - ${getTitle()}`}
          </h3>

          <div className="h-80">
            {activeChart === 'revenue' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'inventory' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inventoryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="inStock" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#10B981"
                    name="In Stock"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lowStock" 
                    stackId="1" 
                    stroke="#F59E0B" 
                    fill="#F59E0B"
                    name="Low Stock"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="criticalStock" 
                    stackId="1" 
                    stroke="#EF4444" 
                    fill="#EF4444"
                    name="Critical Stock"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'categories' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'suppliers' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSuppliers} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Items</h3>
          <div className="space-y-4">
            {[
              { name: 'Acetaminophen 500mg', sales: 2456, revenue: '$12,450' },
              { name: 'Insulin (Humalog)', sales: 1234, revenue: '$55,530' },
              { name: 'Lisinopril 10mg', sales: 1456, revenue: '$17,836' },
              { name: 'Amoxicillin 250mg', sales: 987, revenue: '$8,636' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.sales} units sold</p>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-lg">🚨</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Critical Stock Alert</p>
                <p className="text-xs text-gray-500">Insulin supplies critically low</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-500 text-lg">⚠️</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Expiry Warning</p>
                <p className="text-xs text-gray-500">5 items expiring within 30 days</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">📈</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Sales Milestone</p>
                <p className="text-xs text-gray-500">Monthly target achieved</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Order Value</span>
              <span className="text-sm font-medium text-gray-900">$1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="text-sm font-medium text-green-600">96.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivery Performance</span>
              <span className="text-sm font-medium text-blue-600">98.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inventory Accuracy</span>
              <span className="text-sm font-medium text-green-600">99.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Waste Reduction</span>
              <span className="text-sm font-medium text-green-600">15.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}