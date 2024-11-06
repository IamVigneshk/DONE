import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UnderDevelopment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        <Construction className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">Under Development</h1>
        <p className="text-gray-400 mb-8">
          This section is currently under development. We're working hard to bring you new features soon!
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </button>
      </div>
    </div>
  );
}