'use client';

import { useState, useEffect } from 'react';

// Activity data interfaces
interface ActivityItem {
  id: string;
  type: 'inventory' | 'sales' | 'purchase' | 'employee' | 'supplier' | 'clinic' | 'system';
  description: string;
  timestamp: string;
  user: string;
  details?: any;
  status?: 'completed' | 'pending' | 'failed';
}

interface FilterOption {
  id: string;
  name: string;
  icon: string;
}

export default function ActivityPage() {
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7days');

  // Sample activity data - role-based
  const sampleActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'inventory',
      description: 'Stock level updated for Acetaminophen 500mg',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'Sarah Johnson',
      status: 'completed'
    },
    {
      id: '2',
      type: 'purchase',
      description: 'New purchase order created for PharmaCorp Ltd',
      timestamp: '2024-01-15T09:15:00Z',
      user: 'Michael Chen',
      status: 'pending'
    },
    {
      id: '3',
      type: 'sales',
      description: 'Large order processed for Central Hospital',
      timestamp: '2024-01-15T08:45:00Z',
      user: 'Jessica Wong',
      status: 'completed'
    },
    {
      id: '4',
      type: 'supplier',
      description: 'New supplier registration: MediSupply Co verified',
      timestamp: '2024-01-14T16:20:00Z',
      user: 'System',
      status: 'completed'
    },
    {
      id: '5',
      type: 'employee',
      description: 'Employee access granted to inventory module',
      timestamp: '2024-01-14T14:10:00Z',
      user: 'Admin',
      status: 'completed'
    },
    {
      id: '6',
      type: 'clinic',
      description: 'Clinic profile updated - contact information',
      timestamp: '2024-01-14T13:30:00Z',
      user: 'Dr. Smith',
      status: 'completed'
    },
    {
      id: '7',
      type: 'system',
      description: 'Automated inventory reorder triggered',
      timestamp: '2024-01-14T12:00:00Z',
      user: 'AI System',
      status: 'completed'
    },
    {
      id: '8',
      type: 'inventory',
      description: 'Critical stock alert resolved for Insulin',
      timestamp: '2024-01-14T11:15:00Z',
      user: 'Maria Rodriguez',
      status: 'completed'
    }
  ];

  // Filter options based on user role
  const getFilterOptions = (): FilterOption[] => {
    const baseFilters = [
      { id: 'all', name: 'All Activities', icon: '🔄' },
      { id: 'inventory', name: 'Inventory', icon: '📦' },
      { id: 'sales', name: 'Sales', icon: '💰' },
      { id: 'system', name: 'System', icon: '⚙️' }
    ];

    if (user?.role === 'Supplier') {
      return [
        ...baseFilters,
        { id: 'clinic', name: 'Clinics', icon: '🏥' },
        { id: 'purchase', name: 'Orders', icon: '🛒' }
      ];
    } else if (user?.role === 'Clinic') {
      return [
        ...baseFilters,
        { id: 'supplier', name: 'Suppliers', icon: '🏢' },
        { id: 'employee', name: 'Employees', icon: '👥' }
      ];
    } else {
      return [
        ...baseFilters,
        { id: 'supplier', name: 'Suppliers', icon: '🏢' },
        { id: 'clinic', name: 'Clinics', icon: '🏥' },
        { id: 'employee', name: 'Employees', icon: '👥' },
        { id: 'purchase', name: 'Purchases', icon: '🛒' }
      ];
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setActivities(sampleActivities);
  }, []);

  const filterOptions = getFilterOptions();

  // Filter activities based on selected filters and search
  const filteredActivities = activities.filter(activity => {
    const matchesFilter = selectedFilters.includes('all') || selectedFilters.includes(activity.type);
    const matchesSearch = searchQuery === '' || 
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedFilters(['all']);
    } else {
      const newFilters = selectedFilters.includes(filterId)
        ? selectedFilters.filter(f => f !== filterId)
        : [...selectedFilters.filter(f => f !== 'all'), filterId];
      
      setSelectedFilters(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      inventory: '📦',
      sales: '💰',
      purchase: '🛒',
      employee: '👥',
      supplier: '🏢',
      clinic: '🏥',
      system: '⚙️'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Feed</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track all system activities and user interactions
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search activities, users, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterToggle(filter.id)}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilters.includes(filter.id)
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{filteredActivities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredActivities.filter(a => a.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredActivities.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Set(filteredActivities.map(a => a.user)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredActivities.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      {activity.status && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-gray-500">{formatTimestamp(activity.timestamp)}</p>
                      <span className="text-gray-400">•</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        activity.type === 'inventory' ? 'bg-blue-100 text-blue-800' :
                        activity.type === 'sales' ? 'bg-green-100 text-green-800' :
                        activity.type === 'purchase' ? 'bg-purple-100 text-purple-800' :
                        activity.type === 'supplier' ? 'bg-orange-100 text-orange-800' :
                        activity.type === 'clinic' ? 'bg-teal-100 text-teal-800' :
                        activity.type === 'employee' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">View details</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {filteredActivities.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Load More Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}