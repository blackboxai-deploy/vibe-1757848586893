'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-sm font-medium text-gray-600">Regnum Pecunia</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Pricing
              </Link>
              <Link 
                href="/auth/login" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Sign in
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8"
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Visibility. Accountability.
              </span>
              <br />
              <span className="text-gray-900">Supply Chain Control.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 leading-relaxed"
            >
              Reigning Over Resources, Securing Your Success
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              Advanced healthcare supply chain management with AI-powered analytics, 
              real-time inventory tracking, and predictive insights. Built for clinics, 
              pharmacies, and distributors.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-gray-500 mb-12 max-w-2xl mx-auto font-medium"
            >
              SCMS (Supply Chain Management Software) • AI-Powered Analytics • Healthcare Compliance
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/auth/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start free trial
              </Link>
              <Link 
                href="#demo"
                className="bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border border-gray-200 shadow-sm"
              >
                Watch demo
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <span>Trusted by healthcare providers</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>SCMS (Supply Chain Management Software)</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>AI-Powered Analytics</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything you need to manage your supply chain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools for inventory management, financial tracking, and predictive analytics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI-Powered Analytics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-150/50 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7dbf9b7e-8800-4fcd-a307-2cc2c9484ab9.png" alt="AI analytics icon with neural network and data visualization elements" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced machine learning models including ARIMA, ETS, and STL for demand forecasting, anomaly detection, and predictive insights
              </p>
            </motion.div>

            {/* Smart Inventory Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-150/50 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f05f63f5-d5d9-4c7e-b928-f82d5f7eacac.png" alt="Inventory management icon with RFID scanner and warehouse organization" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Inventory Control</h3>
              <p className="text-gray-600 leading-relaxed">
                RFID scanning, real-time tracking, expiry management, automated reorder suggestions, and role-based inventory views
              </p>
            </motion.div>

            {/* Enterprise Security */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-150/50 transition-all duration-300 border border-green-100 hover:border-green-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/056a615a-653b-4d2f-ba84-b451bd894e9c.png" alt="Security icon with shield, lock, and compliance symbols" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                HIPAA/GDPR compliance, OAuth integration, passkey authentication, comprehensive audit logging, and role-based access control
              </p>
            </motion.div>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* ETL & Data Integration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-150/50 transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dbeebe8d-b588-44e3-a7bf-4b4b349d25a7.png" alt="Data integration icon showing ETL pipeline with multiple data sources" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Multi-source ETL pipelines supporting databases, APIs, Excel, CSV, POS systems, and cloud storage with automated processing
              </p>
            </motion.div>

            {/* Financial Analytics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-150/50 transition-all duration-300 border border-orange-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a1de5be1-d551-4283-aab0-435d9c93817f.png" alt="Financial analytics icon with charts, graphs, and revenue metrics" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                Stripe-inspired financial dashboards with profit analysis, revenue forecasting, and custom chart configurations
              </p>
            </motion.div>

            {/* Cloud Infrastructure */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:from-indigo-100 hover:to-indigo-150/50 transition-all duration-300 border border-indigo-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2378486d-6c75-4284-b90b-500c7bb1987d.png" alt="Cloud infrastructure icon with AWS services and scalability symbols" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cloud-Native</h3>
              <p className="text-gray-600 leading-relaxed">
                AWS-powered infrastructure with RDS databases, S3 storage, and scalable deployment for enterprise-grade performance
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose the plan that works best for your healthcare organization. No hidden fees, cancel anytime.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Standard</h3>
                <p className="text-gray-600 mb-6">Perfect for small to medium healthcare providers</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-500 ml-2 text-lg">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Dashboard access</span>
                    <p className="text-sm text-gray-500">Complete overview of your operations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Basic reporting</span>
                    <p className="text-sm text-gray-500">Essential analytics and insights</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Data entry</span>
                    <p className="text-sm text-gray-500">Manual and automated data input</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Standard analytics</span>
                    <p className="text-sm text-gray-500">Core forecasting and trends</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Up to 5 users</span>
                    <p className="text-sm text-gray-500">Role-based access control</p>
                  </div>
                </li>
              </ul>

              <Link 
                href="/auth/register?plan=standard"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-center block transition-all duration-200 hover:scale-105 transform"
              >
                Start 14-day free trial
              </Link>
            </motion.div>

            {/* Professional Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl p-8 text-white relative scale-105 border-4 border-blue-400"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-8 mt-4">
                <h3 className="text-2xl font-bold mb-3">Professional</h3>
                <p className="text-blue-100 mb-6">Best for growing healthcare organizations</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">$199</span>
                  <span className="text-blue-200 ml-2 text-lg">/month</span>
                </div>
                <p className="text-sm text-blue-200 mt-2">Billed monthly • Cancel anytime</p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Everything in Standard</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Advanced AI analytics</span>
                    <p className="text-sm text-blue-200">ARIMA, ETS, STL forecasting models</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">RFID scanning & tracking</span>
                    <p className="text-sm text-blue-200">Real-time inventory management</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">ETL data pipelines</span>
                    <p className="text-sm text-blue-200">Multi-source data integration</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Up to 25 users</span>
                    <p className="text-sm text-blue-200">Advanced role management</p>
                  </div>
                </li>
              </ul>

              <Link 
                href="/auth/register?plan=professional"
                className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 font-semibold text-center block transition-all duration-200 hover:scale-105 transform"
              >
                Start 14-day free trial
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise</h3>
                <p className="text-gray-600 mb-6">Fully customized solution for large organizations</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">Custom pricing</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Tailored to your needs</p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Everything in Professional</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Custom integrations</span>
                    <p className="text-sm text-gray-500">API connections to your existing systems</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Priority support</span>
                    <p className="text-sm text-gray-500">24/7 dedicated support team</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Dedicated account manager</span>
                    <p className="text-sm text-gray-500">Personal onboarding and training</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Unlimited users</span>
                    <p className="text-sm text-gray-500">Scale without limits</p>
                  </div>
                </li>
              </ul>

              <Link 
                href="/contact"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-center block transition-all duration-200 hover:scale-105 transform"
              >
                Contact sales
              </Link>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-4">
              All plans include: SSL encryption, daily backups, and HIPAA/GDPR compliance
            </p>
            <p className="text-sm text-gray-500">
              Powered by AWS • 99.9% uptime guarantee • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RP</span>
                </div>
                <span className="font-semibold text-gray-900">Regnum Pecunia</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced healthcare supply chain management with AI-powered insights for modern healthcare providers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Regnum Pecunia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}