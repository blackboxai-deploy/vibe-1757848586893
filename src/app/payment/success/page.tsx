'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('invoice');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching payment details
    setTimeout(() => {
      setPaymentDetails({
        invoiceId: invoiceId || 'INV-2024-001',
        amount: '$199.00',
        plan: 'Professional Plan',
        paymentMethod: 'Credit Card',
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: 'Active'
      });
      setLoading(false);
    }, 1000);
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-sm font-medium text-gray-600">Regnum Pecunia</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Regnum Pecunia! Your 14-day free trial has started.
          </p>
          <p className="text-gray-500">
            Invoice ID: {paymentDetails?.invoiceId}
          </p>
        </motion.div>

        {/* Payment Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-gray-900">{paymentDetails?.plan}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-gray-900">{paymentDetails?.amount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-gray-900">{paymentDetails?.paymentMethod}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {paymentDetails?.status}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Trial End Date</span>
                <span className="font-semibold text-gray-900">{paymentDetails?.trialEndDate}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Next Billing</span>
                <span className="font-semibold text-gray-900">{paymentDetails?.nextBillingDate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-blue-50 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e67b8a25-bbe4-4756-ad14-6362c262cb8f.png" alt="Account setup icon" className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Complete Setup</h4>
              <p className="text-sm text-gray-600">
                Set up your organization profile and configure your preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ae81c28-e87f-40b5-b166-1f2a0f23a21f.png" alt="Data import icon" className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Import Data</h4>
              <p className="text-sm text-gray-600">
                Upload your existing inventory and supplier data to get started quickly
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dea274ce-e15f-4204-a7ab-63285e7fd4e0.png" alt="Team invitation icon" className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Invite Team</h4>
              <p className="text-sm text-gray-600">
                Add team members and assign roles based on their responsibilities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
          >
            Access Dashboard
          </Link>
          <Link 
            href="/dashboard/data-import"
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-lg font-semibold text-center border border-gray-200 transition-colors"
          >
            Import Data
          </Link>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-4">
            Need help getting started? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:support@regnumpecunia.com" className="text-blue-600 hover:text-blue-700">
              📧 support@regnumpecunia.com
            </a>
            <a href="tel:+1-800-123-4567" className="text-blue-600 hover:text-blue-700">
              📞 1-800-123-4567
            </a>
            <Link href="/help" className="text-blue-600 hover:text-blue-700">
              📚 Help Center
            </Link>
          </div>
        </motion.div>

        {/* Email Confirmation Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8"
        >
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">
                Check Your Email
              </h4>
              <p className="text-sm text-yellow-700">
                We've sent a confirmation email with your invoice and login credentials. 
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
     </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading success page...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}