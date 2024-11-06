import React, { useState } from 'react';
import { X, Mail, Lock, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetInfo: { type: 'domain' | 'ip'; value: string };
  onSuccess: (isAdmin: boolean) => void;
}

export default function AuthModal({ isOpen, onClose, targetInfo, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAuth = () => {
    const adminCreds = {
      email: 'vigneshk1432@gmail.com',
      password: '0806/2006'
    };

    if (email === adminCreds.email && password === adminCreds.password) {
      onSuccess(isAdminMode);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" onClick={onClose} />
        
        <div className="relative inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-800 rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-cyan-500" />
              <h3 className="text-2xl font-bold text-white">
                {isAdminMode ? 'Admin Login' : 'User Authentication'}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm mt-2">
                  {error}
                </div>
              )}

              <button
                onClick={handleAuth}
                className="w-full py-2 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                {isAdminMode ? 'Admin Login' : 'Continue Scan'}
              </button>

              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="w-full py-2 px-4 border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-500/10 transition-colors"
              >
                {isAdminMode ? 'Switch to User Login' : 'Admin Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}