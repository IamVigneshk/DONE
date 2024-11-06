import React from 'react';
import { Shield, CreditCard, ArrowLeft } from 'lucide-react';

export default function Payment() {
  const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{"plan": "Basic Premium", "price": 20}');

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </button>

        <div className="bg-gray-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-cyan-500" />
            <h1 className="text-2xl font-bold text-white">Complete Your Purchase</h1>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{selectedPlan.plan}</span>
              <span className="text-white font-semibold">${selectedPlan.price}/month</span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-400 text-sm">
              This is a placeholder payment page. You can integrate your preferred payment API here.
            </p>
            
            <button 
              className="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
              onClick={() => alert('Payment integration coming soon!')}
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}