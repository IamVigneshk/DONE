import React, { useState } from 'react';
import { Menu, Shield, X, Lock, User } from 'lucide-react';
import ScanModal from './ScanModal';
import UserAuthModal from './UserAuthModal';
import AdminAuthModal from './AdminAuthModal';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onScanStart: (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => void;
  onAdminClick: () => void;
  onUserLogin: (email: string, password: string) => boolean;
}

export default function Navbar({ onScanStart }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showUserAuth, setShowUserAuth] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUserLoginSuccess = () => {
    navigate('/userdash');
  };

  const handleAdminLoginSuccess = () => {
    navigate('/admin');
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="ml-2 text-xl font-bold text-white">ScanHere4U</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => setShowScanModal(true)}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Start Scan
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUserAuth(true)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                User Login
              </button>
              <button
                onClick={() => setShowAdminAuth(true)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                scrollToSection('features');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => {
                scrollToSection('services');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => {
                setShowScanModal(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md"
            >
              Start Scan
            </button>
            <button
              onClick={() => {
                setShowUserAuth(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2 justify-center"
            >
              <User className="w-4 h-4" />
              User Login
            </button>
            <button
              onClick={() => {
                setShowAdminAuth(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2 justify-center"
            >
              <Lock className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>
      )}

      <ScanModal
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        onScanStart={onScanStart}
      />

      <UserAuthModal
        isOpen={showUserAuth}
        onClose={() => setShowUserAuth(false)}
        onSuccess={handleUserLoginSuccess}
      />

      <AdminAuthModal
        isOpen={showAdminAuth}
        onClose={() => setShowAdminAuth(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </nav>
  );
}