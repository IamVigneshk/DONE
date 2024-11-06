import React from 'react';
import { Shield, Activity, History, Settings, LogOut, Home } from 'lucide-react';

interface UserDashboardProps {
  onLogout: () => void;
  onReturnHome: () => void;
}

export default function UserDashboard({ onLogout, onReturnHome }: UserDashboardProps) {
  const recentScans = [
    { target: 'example.com', date: '2024-03-15', type: 'Domain', status: 'Completed' },
    { target: '192.168.1.1', date: '2024-03-14', type: 'IP', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
              <Shield className="w-8 h-8 text-cyan-500" />
              <span className="ml-2 text-xl font-bold text-white">SecureScanner</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onReturnHome}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return Home
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800 overflow-hidden rounded-lg shadow p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-cyan-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Active Scans</h3>
                  <p className="text-2xl font-semibold text-cyan-500">2</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 overflow-hidden rounded-lg shadow p-6">
              <div className="flex items-center">
                <History className="h-8 w-8 text-cyan-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Total Scans</h3>
                  <p className="text-2xl font-semibold text-cyan-500">15</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 overflow-hidden rounded-lg shadow p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-cyan-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Account Status</h3>
                  <p className="text-lg font-medium text-green-500">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-white mb-4">Recent Scans</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Target
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {recentScans.map((scan, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {scan.target}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {scan.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {scan.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {scan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}