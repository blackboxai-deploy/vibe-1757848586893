'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Sample data interfaces
interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: 'Total Inventory Value',
      value: '$2,847,392',
      change: '+12.5%',
      icon: '📦',
      trend: 'up'
    },
    {
      title: 'Monthly Revenue',
      value: '$584,293',
      change: '+8.3%',
      icon: '💰',
      trend: 'up'
    },
    {
      title: 'Active Suppliers',
      value: '247',
      change: '+5.2%',
      icon: '🏢',
      trend: 'up'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-15.7%',
      icon: '⚠️',
      trend: 'down'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'inventory_update',
      description: 'Updated stock levels for Acetaminophen 500mg',
      timestamp: '2 minutes ago',
      user: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'purchase_order',
      description: 'New purchase order created for Medical Supplies Co.',
      timestamp: '15 minutes ago',
      user: 'Michael Chen'
    },
    {
      id: '3',
      type: 'ai_alert',
      description: 'AI detected potential stockout risk for Insulin',
      timestamp: '1 hour ago',
      user: 'AI System'
    },
    {
      id: '4',
      type: 'sale',
      description: 'Large order processed for Central Hospital',
      timestamp: '2 hours ago',
      user: 'Jessica Wong'
    },
    {
      id: '5',
      type: 'expiry_alert',
      description: 'Medications expiring in next 30 days flagged',
      timestamp: '3 hours ago',
      user: 'System Alert'
    }
  ]);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'inventory_update': return '📦';
      case 'purchase_order': return '🛒';
      case 'ai_alert': return '🤖';
      case 'sale': return '💰';
      case 'expiry_alert': return '⏰';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name || 'User'}!
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with your supply chain today.
          </p>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{metric.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                metric.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : metric.trend === 'down'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.change}
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📦</span>
                <span className="font-medium text-gray-900">Add Inventory Item</span>
              </div>
              <span className="text-blue-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🛒</span>
                <span className="font-medium text-gray-900">Create Purchase Order</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🤖</span>
                <span className="font-medium text-gray-900">AI Recommendations</span>
              </div>
              <span className="text-purple-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📊</span>
                <span className="font-medium text-gray-900">Generate Report</span>
              </div>
              <span className="text-orange-600">→</span>
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-800">Low Stock Alert</h4>
              <p className="text-sm text-amber-700 mt-1">
                23 items are running low on stock. Review and reorder soon.
              </p>
              <button className="mt-3 text-xs font-medium text-amber-800 hover:text-amber-900">
                View Details →
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-800">AI Insights Ready</h4>
              <p className="text-sm text-blue-700 mt-1">
                New demand forecasting and optimization recommendations available.
              </p>
              <button className="mt-3 text-xs font-medium text-blue-800 hover:text-blue-900">
                View Insights →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}