'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Interface definitions
interface InventoryItem {
  id: number;
  drugName: string;
  genericName: string;
  category: string;
  supplier: string;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
  lastUpdated: string;
  stockStatus: 'Normal' | 'Low' | 'Critical' | 'Expired';
  expiryDate: string;
  rfidTag?: string;
}

interface User {
  role: string;
}

export default function InventoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Sample inventory data - in production this would come from API
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      drugName: 'Acetaminophen 500mg',
      genericName: 'Paracetamol',
      category: 'Analgesics',
      supplier: 'PharmaCorp Ltd',
      quantity: 450,
      reorderLevel: 100,
      unitPrice: 2.50,
      lastUpdated: '2024-01-15',
      stockStatus: 'Normal',
      expiryDate: '2025-06-30',
      rfidTag: 'RF001234'
    },
    {
      id: 2,
      drugName: 'Insulin (Humalog)',
      genericName: 'Insulin Lispro',
      category: 'Diabetes',
      supplier: 'MediSupply Co',
      quantity: 25,
      reorderLevel: 50,
      unitPrice: 45.00,
      lastUpdated: '2024-01-14',
      stockStatus: 'Critical',
      expiryDate: '2025-03-15',
      rfidTag: 'RF002567'
    },
    {
      id: 3,
      drugName: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      category: 'Antibiotics',
      supplier: 'Global Pharma',
      quantity: 80,
      reorderLevel: 75,
      unitPrice: 8.75,
      lastUpdated: '2024-01-13',
      stockStatus: 'Low',
      expiryDate: '2025-12-01',
      rfidTag: 'RF003891'
    },
    {
      id: 4,
      drugName: 'Lisinopril 10mg',
      genericName: 'Lisinopril',
      category: 'Cardiovascular',
      supplier: 'HeartMeds Inc',
      quantity: 200,
      reorderLevel: 75,
      unitPrice: 12.25,
      lastUpdated: '2024-01-12',
      stockStatus: 'Normal',
      expiryDate: '2025-08-20',
      rfidTag: 'RF004123'
    },
    {
      id: 5,
      drugName: 'Aspirin 81mg',
      genericName: 'Acetylsalicylic Acid',
      category: 'Cardiovascular',
      supplier: 'CardioSupply',
      quantity: 15,
      reorderLevel: 100,
      unitPrice: 1.50,
      lastUpdated: '2024-01-11',
      stockStatus: 'Critical',
      expiryDate: '2024-02-28',
      rfidTag: 'RF005678'
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Filter inventory based on search and status
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.stockStatus.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const handleRFIDScan = () => {
    // Simulate RFID scanning
    const mockRFID = `RF${Date.now().toString().slice(-6)}`;
    alert(`RFID Scanner activated. Scanned tag: ${mockRFID}`);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'detailed', name: 'Detailed View', icon: '📋' },
    { id: 'ai-refill', name: 'AI Refill', icon: '🤖' },
    { id: 'rfid-scan', name: 'RFID Scan', icon: '📱' },
    { id: 'categories', name: 'Categories', icon: '🏷️' }
  ];

  const [customCategories, setCustomCategories] = useState([
    'Analgesics', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Respiratory'
  ]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCustomCategories(customCategories.filter(cat => cat !== category));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your pharmaceutical inventory with AI-powered insights
          </p>
        </div>
        
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button
            onClick={handleRFIDScan}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            📱 RFID Scan
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            📦 Add Item
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Items</p>
                  <p className="text-3xl font-bold text-blue-900">{inventory.length}</p>
                  <p className="text-xs text-blue-500 mt-1">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a77c994e-58a3-4710-bfea-006fb15c1e38.png" alt="Total inventory items icon" className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Low Stock</p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {inventory.filter(item => item.stockStatus === 'Low').length}
                  </p>
                  <p className="text-xs text-yellow-500 mt-1">Needs attention</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/02aeab23-a71d-4fc2-8423-a617cb4a83ad.png" alt="Low stock warning icon" className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Critical Stock</p>
                  <p className="text-3xl font-bold text-red-900">
                    {inventory.filter(item => item.stockStatus === 'Critical').length}
                  </p>
                  <p className="text-xs text-red-500 mt-1">Immediate action required</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba33582d-5d93-4f98-8c8f-537a64899652.png" alt="Critical stock alert icon" className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Value</p>
                  <p className="text-3xl font-bold text-green-900">
                    ${inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-500 mt-1">+8.3% increase</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b01661c1-dafc-4234-907e-2288a1c9f608.png" alt="Total inventory value icon" className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Role-based Information Bar */}
          {user?.role && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {user.role === 'Supplier' && 'Supplier Dashboard - Manage Multiple Clinics'}
                    {user.role === 'Clinic' && 'Clinic Dashboard - View Supplier Networks'}
                    {user.role === 'Pharmacist' && 'Pharmacist Dashboard - Bridge Suppliers & Clinics'}
                    {user.role === 'Admin' && 'Admin Dashboard - Full System Access'}
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    {user.role === 'Supplier' && 'Track inventory across all clinics you supply to. Monitor demand patterns and optimize distribution.'}
                    {user.role === 'Clinic' && 'Manage relationships with your suppliers. View available stock and place orders efficiently.'}
                    {user.role === 'Pharmacist' && 'Access both supplier networks and clinic relationships for comprehensive inventory management.'}
                    {user.role === 'Admin' && 'Oversee all operations with complete visibility across suppliers, clinics, and pharmacists.'}
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/358e8197-feca-4ca8-b9f6-105f19fee46d.png" alt="Role-based access icon" className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by drug name, category, or supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="normal">Normal</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.drugName}</div>
                          <div className="text-sm text-gray-500">{item.genericName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user?.role === 'Supplier' ? 'Various Clinics' : item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.stockStatus)}`}>
                          {item.stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDetailView(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

       {/* Detailed View Tab */}
      {activeTab === 'detailed' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Inventory Overview</h3>
              <p className="text-sm text-gray-600">Complete information for all inventory items</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generic Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {user?.role === 'Supplier' ? 'Clinic' : 'Supplier'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70cde164-0e3e-4f54-9475-67f676885b64.png" alt="Medicine icon" className="w-5 h-5" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{item.drugName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.genericName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user?.role === 'Supplier' ? 'Multiple Clinics' : item.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{item.quantity}</span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                item.quantity <= item.reorderLevel * 0.5 ? 'bg-red-500' :
                                item.quantity <= item.reorderLevel ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((item.quantity / (item.reorderLevel * 2)) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderLevel}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.stockStatus)}`}>
                          {item.stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c6e9b291-7900-40f8-b7fd-cb064eb66a86.png" alt="Edit item" className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 transition-colors">
                            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2fa5b779-faea-47b4-b9b4-e5ca8094039f.png" alt="View details" className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/49615753-677b-4935-9f35-1f80d9e219d1.png" alt="Remove item" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Categories Management Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Custom Categories</h3>
                <p className="text-sm text-gray-600">Manage and customize your inventory categories</p>
              </div>
              <button
                onClick={() => setShowAddCategory(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1ce349a7-346e-4c2a-a411-7423c5a7dcac.png" alt="Add category" className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>

            {showAddCategory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategory('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customCategories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/31f67b13-aa38-4e7e-822e-fc0127d448ea.png" alt="Category icon" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category}</h4>
                        <p className="text-sm text-gray-500">
                          {inventory.filter(item => item.category === category).length} items
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCategory(category)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/49fd9e4c-1e1b-462f-80fe-8f0bd37e8c87.png" alt="Remove category" className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Usage Statistics</h3>
            <div className="space-y-3">
              {customCategories.map((category) => {
                const count = inventory.filter(item => item.category === category).length;
                const percentage = (count / inventory.length) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{category}</span>
                      <span className="text-sm text-gray-500">{count} items</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-12">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

       {/* Enhanced AI Refill Tab */}
      {activeTab === 'ai-refill' && (
        <div className="space-y-8">
          {/* AI Insights Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d28061fd-a0dc-449a-b04d-581374948be7.png" alt="AI brain icon" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">AI-Powered Refill Intelligence</h3>
                    <p className="text-blue-100">Advanced algorithms analyzing expiry, usage patterns, and demand forecasting</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-blue-100">Items Analyzed</p>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-blue-100">Recommendations</p>
                    <p className="text-2xl font-bold">
                      {inventory.filter(item => item.stockStatus === 'Critical' || item.stockStatus === 'Low').length}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm text-blue-100">Confidence Level</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/04ac12ab-d97d-47e6-afc4-3cbb41122dd5.png" alt="AI analytics visualization" className="w-48 h-36 rounded-lg opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Smart Recommendations */}
          <div className="grid gap-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/323e1f24-3329-4ccb-888a-209896cbfe60.png" alt="Smart recommendations icon" className="w-5 h-5 mr-2" />
              Intelligent Reorder Recommendations
            </h3>
            
            {inventory.filter(item => item.stockStatus === 'Critical' || item.stockStatus === 'Low').map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4">
                        <img src="https://placehold.co/24x24?text=Medicine+pill+drug+icon" alt="Medicine icon" className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{item.drugName}</h4>
                        <p className="text-sm text-gray-500">{item.genericName} • {item.category}</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(item.stockStatus)}`}>
                          {item.stockStatus} Priority
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Current Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{item.quantity}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.quantity <= item.reorderLevel * 0.5 ? 'bg-red-500' :
                              item.quantity <= item.reorderLevel ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((item.quantity / (item.reorderLevel * 2)) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">AI Recommendation</p>
                        <p className="text-2xl font-bold text-blue-900">
                          {Math.max(item.reorderLevel * 2 - item.quantity, 0)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Units to order</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Estimated Cost</p>
                        <p className="text-2xl font-bold text-green-900">
                          ${(Math.max(item.reorderLevel * 2 - item.quantity, 0) * item.unitPrice).toFixed(2)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">Total investment</p>
                      </div>
                      
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">Days Until Critical</p>
                        <p className="text-2xl font-bold text-orange-900">
                          {item.stockStatus === 'Critical' ? 'NOW' : Math.floor(Math.random() * 15) + 1}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">Based on usage</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/08fe33cb-33a5-431c-ac49-0273a18d92a9.png" alt="Expiry date icon" className="w-4 h-4" />
                          <span className="text-sm text-gray-600">Expires: {item.expiryDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/121261fb-bdea-4ede-a450-08c28e3a8b8b.png" alt="Supplier icon" className="w-4 h-4" />
                          <span className="text-sm text-gray-600">Supplier: {item.supplier}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2cad628d-47a1-4b03-9346-267b2965c31a.png" alt="Price icon" className="w-4 h-4" />
                          <span className="text-sm text-gray-600">Unit Price: ${item.unitPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">AI Confidence: 94%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/61131df9-146a-43cd-bb2f-241b5f79d1c0.png" alt="ML algorithm icon" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">ARIMA Model Applied</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f0fe8eef-f80e-4c9b-b4ef-5e54a9f271a9.png" alt="Schedule icon" className="w-4 h-4 mr-2" />
                      Schedule Later
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                      <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7d164c5b-6bbd-4f84-8e67-c9da93601267.png" alt="Order icon" className="w-4 h-4 mr-2" />
                      Place Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Analytics Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-2">AI Insights Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-indigo-600">Total Savings Potential</p>
                    <p className="text-xl font-bold text-indigo-900">$12,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Waste Reduction</p>
                    <p className="text-xl font-bold text-indigo-900">23%</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Stockout Prevention</p>
                    <p className="text-xl font-bold text-indigo-900">98.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Forecast Accuracy</p>
                    <p className="text-xl font-bold text-indigo-900">94.2%</p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f4df12d7-0770-4821-ab0f-8d917e1040a8.png" alt="AI insights icon" className="w-10 h-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* RFID Scan Tab */}
      {activeTab === 'rfid-scan' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📱</span>
              <h3 className="text-lg font-medium text-purple-900 mb-2">RFID Scanner</h3>
              <p className="text-purple-700 mb-6">
                Scan RFID tags to quickly add or update inventory items
              </p>
              <button
                onClick={handleRFIDScan}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                🔍 Start Scanning
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent RFID Scans</h4>
            <div className="space-y-4">
              {inventory.filter(item => item.rfidTag).slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.drugName}</p>
                    <p className="text-sm text-gray-500">RFID: {item.rfidTag}</p>
                  </div>
                  <span className="text-sm text-gray-500">{item.lastUpdated}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}