'use client';

import { useState, useCallback } from 'react';

// Data import interfaces
interface ImportFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  records: number;
  errors?: string[];
}

interface DataMapping {
  sourceField: string;
  targetField: string;
  required: boolean;
  dataType: 'string' | 'number' | 'date' | 'boolean';
}

export default function DataImportPage() {
  const [dragActive, setDragActive] = useState(false);
  const [importFiles, setImportFiles] = useState<ImportFile[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [showMappingModal, setShowMappingModal] = useState(false);

  // Sample data mappings for different import types
  const dataMappings = {
    inventory: [
      { sourceField: 'Drug Name', targetField: 'drugName', required: true, dataType: 'string' as const },
      { sourceField: 'Generic Name', targetField: 'genericName', required: false, dataType: 'string' as const },
      { sourceField: 'Category', targetField: 'category', required: true, dataType: 'string' as const },
      { sourceField: 'Quantity', targetField: 'quantity', required: true, dataType: 'number' as const },
      { sourceField: 'Unit Price', targetField: 'unitPrice', required: true, dataType: 'number' as const },
      { sourceField: 'Expiry Date', targetField: 'expiryDate', required: false, dataType: 'date' as const },
      { sourceField: 'RFID Tag', targetField: 'rfidTag', required: false, dataType: 'string' as const }
    ],
    suppliers: [
      { sourceField: 'Supplier Name', targetField: 'supplierName', required: true, dataType: 'string' as const },
      { sourceField: 'Contact Person', targetField: 'contactPerson', required: true, dataType: 'string' as const },
      { sourceField: 'Email', targetField: 'email', required: true, dataType: 'string' as const },
      { sourceField: 'Phone', targetField: 'phone', required: false, dataType: 'string' as const },
      { sourceField: 'Address', targetField: 'address', required: false, dataType: 'string' as const }
    ],
    sales: [
      { sourceField: 'Date', targetField: 'saleDate', required: true, dataType: 'date' as const },
      { sourceField: 'Drug Name', targetField: 'drugName', required: true, dataType: 'string' as const },
      { sourceField: 'Quantity', targetField: 'quantity', required: true, dataType: 'number' as const },
      { sourceField: 'Unit Price', targetField: 'unitPrice', required: true, dataType: 'number' as const },
      { sourceField: 'Customer', targetField: 'customer', required: false, dataType: 'string' as const }
    ]
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: ImportFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        progress: 0,
        records: 0
      };
      
      setImportFiles(prev => [...prev, newFile]);
      
      // Simulate file processing
      simulateFileProcessing(newFile.id);
    });
  };

  const simulateFileProcessing = (fileId: string) => {
    // Update status to processing
    setImportFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status: 'processing' as const } : file
    ));

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setImportFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (progress >= 100) {
            clearInterval(interval);
            return {
              ...file,
              status: 'completed' as const,
              progress: 100,
              records: Math.floor(Math.random() * 1000) + 100
            };
          }
          return { ...file, progress: Math.min(progress, 95) };
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setImportFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('csv') || type.includes('comma-separated')) return '📄';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('json')) return '📋';
    if (type.includes('xml')) return '📑';
    return '📁';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const tabs = [
    { id: 'upload', name: 'File Upload', icon: '📤' },
    { id: 'mapping', name: 'Data Mapping', icon: '🔄' },
    { id: 'history', name: 'Import History', icon: '📜' },
    { id: 'templates', name: 'Templates', icon: '📋' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Import & Export</h1>
          <p className="mt-1 text-sm text-gray-500">
            Import structured and unstructured data from various sources
          </p>
        </div>
        
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            📊 Export Data
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            📋 Download Template
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

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Data Format</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'csv', name: 'CSV Files', icon: '📄', description: 'Comma-separated values' },
                { id: 'excel', name: 'Excel Files', icon: '📊', description: 'XLS, XLSX spreadsheets' },
                { id: 'json', name: 'JSON Files', icon: '📋', description: 'JavaScript Object Notation' },
                { id: 'xml', name: 'XML Files', icon: '📑', description: 'Extensible Markup Language' }
              ].map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedFormat === format.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{format.icon}</div>
                  <h4 className="font-medium text-sm">{format.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{format.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* File Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <span className="text-6xl mb-4 block">📤</span>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    accept=".csv,.xlsx,.xls,.json,.xml"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                CSV, Excel, JSON, XML files up to 50MB each
              </p>
            </div>
          </div>

          {/* File List */}
          {importFiles.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Import Queue</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {importFiles.map((file) => (
                  <div key={file.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(file.status)}`}>
                          {file.status}
                        </span>
                        
                        {file.status === 'processing' && (
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        )}
                        
                        {file.status === 'completed' && (
                          <span className="text-xs text-gray-500">{file.records} records</span>
                        )}
                        
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data Mapping Tab */}
      {activeTab === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Mapping Configuration</h3>
            <p className="text-gray-600 mb-6">
              Configure how your data fields map to the system fields for accurate import.
            </p>

            <div className="space-y-6">
              {Object.entries(dataMappings).map(([category, mappings]) => (
                <div key={category} className="border rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3 capitalize">{category} Data Mapping</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source Field</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Target Field</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mappings.map((mapping, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{mapping.sourceField}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{mapping.targetField}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                mapping.dataType === 'string' ? 'bg-blue-100 text-blue-800' :
                                mapping.dataType === 'number' ? 'bg-green-100 text-green-800' :
                                mapping.dataType === 'date' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {mapping.dataType}
                              </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              {mapping.required ? (
                                <span className="text-red-600">★ Required</span>
                              ) : (
                                <span className="text-gray-400">Optional</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Inventory Template', 
                description: 'Import pharmaceutical inventory data', 
                icon: '📦',
                fields: 7,
                format: 'CSV, Excel'
              },
              { 
                name: 'Supplier Template', 
                description: 'Import supplier contact information', 
                icon: '🏢',
                fields: 5,
                format: 'CSV, Excel'
              },
              { 
                name: 'Sales Template', 
                description: 'Import historical sales data', 
                icon: '💰',
                fields: 5,
                format: 'CSV, Excel'
              }
            ].map((template, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">{template.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    <p>{template.fields} fields • {template.format}</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Download Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Import History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Imports</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">📜</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No import history</h3>
              <p className="text-gray-500">Your import history will appear here once you start importing data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}