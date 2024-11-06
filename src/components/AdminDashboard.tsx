import React, { useState } from 'react';
import { Users, UserPlus, Settings, LogOut, Shield, Activity, AlertTriangle, CheckCircle, Home } from 'lucide-react';

interface User {
  email: string;
  password: string;
  isPremium: boolean;
  dateAdded: string;
  lastScan?: string;
  status: 'active' | 'inactive';
}

interface AdminDashboardProps {
  onLogout: () => void;
  onAddUser: (user: User) => void;
  users: User[];
  onReturnHome: () => void;
}

export default function AdminDashboard({ onLogout, onAddUser, users, onReturnHome }: AdminDashboardProps) {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAddUser = () => {
    if (newUserEmail && newUserPassword) {
      onAddUser({
        email: newUserEmail,
        password: newUserPassword,
        isPremium,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'active'
      });
      setNewUserEmail('');
      setNewUserPassword('');
      setIsPremium(false);
      setShowAddUser(false);
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-cyan-500'
    },
    {
      title: 'Premium Users',
      value: users.filter(u => u.isPremium).length,
      icon: Shield,
      color: 'text-purple-500'
    },
    {
      title: 'Active Scans',
      value: '3',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      title: 'Security Alerts',
      value: '2',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-cyan-500" />
              <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800 overflow-hidden rounded-lg shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-lg font-semibold text-white">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-white">User Management</h3>
                  <button
                    onClick={() => setShowAddUser(!showAddUser)}
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add User
                  </button>
                </div>

                {showAddUser && (
                  <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Enter user email"
                        className="px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <input
                        type="password"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="Enter user password"
                        className="px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPremium"
                          checked={isPremium}
                          onChange={(e) => setIsPremium(e.target.checked)}
                          className="w-4 h-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 rounded"
                        />
                        <label htmlFor="isPremium" className="text-white">Premium Access</label>
                      </div>
                      <button
                        onClick={handleAddUser}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border border-gray-700 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead className="bg-gray-700">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                User
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Type
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Last Scan
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {users.map((user, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div>
                                      <div className="text-sm font-medium text-white">
                                        {user.email}
                                      </div>
                                      <div className="text-sm text-gray-400">
                                        Added {user.dateAdded}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.isPremium
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {user.isPremium ? 'Premium' : 'Free'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {user.lastScan || 'Never'}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}