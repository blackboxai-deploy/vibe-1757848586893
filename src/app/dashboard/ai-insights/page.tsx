'use client';

import { useState, useEffect } from 'react';

// AI Insights Data Types
interface ForecastData {
  period: string;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface AnomalyAlert {
  id: string;
  type: 'inventory' | 'sales' | 'supplier' | 'employee';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  confidence: number;
  recommendation: string;
}

interface SmartAlert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  actionable: boolean;
}

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState('ARIMA');
  const [forecastPeriod, setForecastPeriod] = useState('30days');

  // Sample AI data - in production this would come from ML models
  const [performanceMetrics] = useState({
    predictionAccuracy: 94.2,
    modelPerformance: 'Excellent',
    dataQuality: 96.8,
    lastModelUpdate: '2024-01-15 14:30:00',
    activeModels: 5
  });

  const [revenueForecasts] = useState<ForecastData[]>([
    { period: 'Week 1', predicted: 145000, confidence: 92, trend: 'up' },
    { period: 'Week 2', predicted: 152000, confidence: 89, trend: 'up' },
    { period: 'Week 3', predicted: 148000, confidence: 85, trend: 'down' },
    { period: 'Week 4', predicted: 158000, confidence: 88, trend: 'up' },
  ]);

  const [itemForecasts] = useState([
    {
      drugName: 'Acetaminophen 500mg',
      currentStock: 450,
      predictedDemand: 280,
      recommendedOrder: 150,
      confidence: 94,
      model: 'ARIMA'
    },
    {
      drugName: 'Insulin (Humalog)',
      currentStock: 25,
      predictedDemand: 45,
      recommendedOrder: 70,
      confidence: 89,
      model: 'ETS'
    },
    {
      drugName: 'Amoxicillin 250mg',
      currentStock: 80,
      predictedDemand: 65,
      recommendedOrder: 40,
      confidence: 91,
      model: 'STL'
    }
  ]);

  const [anomalies] = useState<AnomalyAlert[]>([
    {
      id: '1',
      type: 'inventory',
      severity: 'high',
      description: 'Unusual stock depletion rate for Insulin detected',
      timestamp: '2024-01-15 10:30:00',
      confidence: 87,
      recommendation: 'Investigate potential bulk orders or supply chain disruption'
    },
    {
      id: '2',
      type: 'sales',
      severity: 'medium',
      description: 'Sales pattern deviation from seasonal trends',
      timestamp: '2024-01-15 09:15:00',
      confidence: 73,
      recommendation: 'Review marketing campaigns and competitor activity'
    },
    {
      id: '3',
      type: 'supplier',
      severity: 'low',
      description: 'Delivery time variance from PharmaCorp Ltd',
      timestamp: '2024-01-14 16:45:00',
      confidence: 65,
      recommendation: 'Monitor delivery performance and consider backup suppliers'
    }
  ]);

  const [smartAlerts] = useState<SmartAlert[]>([
    {
      id: '1',
      title: 'Stock Optimization Opportunity',
      message: 'AI detected potential 15% cost savings through optimized ordering',
      type: 'success',
      priority: 'medium',
      timestamp: '2 hours ago',
      actionable: true
    },
    {
      id: '2',
      title: 'Demand Surge Prediction',
      message: 'Model predicts 25% increase in cold medication demand next week',
      type: 'info',
      priority: 'high',
      timestamp: '4 hours ago',
      actionable: true
    },
    {
      id: '3',
      title: 'Expiry Risk Alert',
      message: 'High-value medications at risk of expiry within 30 days',
      type: 'warning',
      priority: 'high',
      timestamp: '6 hours ago',
      actionable: true
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🤖' },
    { id: 'forecasting', name: 'Forecasting', icon: '🔮' },
    { id: 'item-forecast', name: 'Item Forecast', icon: '📦' },
    { id: 'anomalies', name: 'Anomalies', icon: '⚠️' },
    { id: 'recommendations', name: 'Recommendations', icon: '💡' },
    { id: 'expiry-risk', name: 'Expiry Risk', icon: '⏰' },
    { id: 'smart-alerts', name: 'Smart Alerts', icon: '🔔' }
  ];

  const mlModels = [
    { id: 'ARIMA', name: 'ARIMA', description: 'Best for time series with trends' },
    { id: 'ETS', name: 'ETS', description: 'Excellent for seasonal patterns' },
    { id: 'STL', name: 'STL', description: 'Robust to outliers' },
    { id: 'Regression', name: 'Regression', description: 'Multi-variable analysis' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Insights & Analytics</h1>
            <p className="text-purple-100 text-lg">
              Advanced machine learning powered supply chain optimization
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-sm text-purple-100">AI Assistant Active</p>
              <p className="text-2xl font-bold">🤖</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{performanceMetrics.predictionAccuracy}%</div>
          <p className="text-sm text-gray-600">Prediction Accuracy</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="text-lg font-bold text-blue-600 mb-2">{performanceMetrics.modelPerformance}</div>
          <p className="text-sm text-gray-600">Model Performance</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{performanceMetrics.dataQuality}%</div>
          <p className="text-sm text-gray-600">Data Quality</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{performanceMetrics.activeModels}</div>
          <p className="text-sm text-gray-600">Active Models</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="text-xs font-medium text-gray-600 mb-1">Last Update</div>
          <div className="text-sm text-gray-900">{performanceMetrics.lastModelUpdate.split(' ')[0]}</div>
        </div>
      </div>

      {/* AI Assistant Chat */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="text-lg font-medium text-blue-900">AI Assistant</h3>
              <p className="text-blue-700">Ask questions about your supply chain data</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            💬 Start Chat
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-gray-600 italic">
            "Show me antibiotic sales in the past quarter" or "Which suppliers have the best performance?"
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm mr-4 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Radar</h3>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                <p className="text-gray-600">Multi-dimensional performance visualization</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Inventory Efficiency</p>
                    <p className="font-semibold text-green-600">95%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Demand Accuracy</p>
                    <p className="font-semibold text-blue-600">92%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cost Optimization</p>
                    <p className="font-semibold text-purple-600">88%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Risk Management</p>
                    <p className="font-semibold text-orange-600">91%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Systems Health</h3>
              <div className="space-y-4">
                {[
                  { system: 'ML Models', status: 'Optimal', health: 98 },
                  { system: 'Data Pipeline', status: 'Good', health: 94 },
                  { system: 'Real-time Analytics', status: 'Excellent', health: 97 },
                  { system: 'Prediction Engine', status: 'Good', health: 92 }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{item.system}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            item.health >= 95 ? 'bg-green-500' :
                            item.health >= 90 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${item.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.health}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Forecasting Tab */}
        {activeTab === 'forecasting' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Forecasting</h3>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="block rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    {mlModels.map((model) => (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                  </select>
                  <select
                    value={forecastPeriod}
                    onChange={(e) => setForecastPeriod(e.target.value)}
                    className="block rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="7days">7 Days</option>
                    <option value="30days">30 Days</option>
                    <option value="90days">90 Days</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {revenueForecasts.map((forecast, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">{forecast.period}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      ${forecast.predicted.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${
                        forecast.trend === 'up' ? 'text-green-600' :
                        forecast.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {forecast.trend === 'up' ? '↗' : forecast.trend === 'down' ? '↘' : '→'} Trend
                      </span>
                      <span className="text-xs text-gray-500">{forecast.confidence}% conf.</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <strong>Model: {selectedModel}</strong> - {mlModels.find(m => m.id === selectedModel)?.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Item Forecast Tab */}
        {activeTab === 'item-forecast' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Individual Item Forecasting</h3>
              <p className="text-sm text-gray-600">AI-powered demand prediction for each pharmaceutical item</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Drug Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Predicted Demand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {itemForecasts.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.drugName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.currentStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.predictedDemand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.recommendedOrder} units
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{item.confidence}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Anomalies Tab */}
        {activeTab === 'anomalies' && (
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{anomaly.type}</span>
                      <span className="text-sm text-gray-500">{anomaly.confidence}% confidence</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{anomaly.description}</h4>
                    <p className="text-sm text-gray-600 mb-3">{anomaly.recommendation}</p>
                    <p className="text-xs text-gray-500">{anomaly.timestamp}</p>
                  </div>
                  <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Investigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Smart Alerts Tab */}
        {activeTab === 'smart-alerts' && (
          <div className="space-y-4">
            {smartAlerts.map((alert) => (
              <div key={alert.id} className={`rounded-lg border p-6 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-medium">{alert.title}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="mb-3">{alert.message}</p>
                    <p className="text-sm opacity-75">{alert.timestamp}</p>
                  </div>
                  {alert.actionable && (
                    <button className="ml-4 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}