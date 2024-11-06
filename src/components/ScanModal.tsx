import React, { useState } from 'react';
import { X, Globe, Server, AlertCircle } from 'lucide-react';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanStart: (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => void;
}

export default function ScanModal({ isOpen, onClose, onScanStart }: ScanModalProps) {
  const [scanType, setScanType] = useState<'domain' | 'ip'>('domain');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateInput = () => {
    setError('');
    
    if (!input) {
      setError('Please enter a value');
      return false;
    }

    if (scanType === 'domain') {
      const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      if (!domainRegex.test(input)) {
        setError('Please enter a valid domain (e.g., example.com)');
        return false;
      }
    } else {
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(input)) {
        setError('Please enter a valid IP address (e.g., 192.168.1.1)');
        return false;
      }
      
      const parts = input.split('.');
      const valid = parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
      
      if (!valid) {
        setError('IP address numbers must be between 0 and 255');
        return false;
      }
    }

    return true;
  };

  const handleScan = () => {
    if (validateInput()) {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = (isAdmin: boolean) => {
    onScanStart({ type: scanType, value: input }, isAdmin);
    setShowAuth(false);
    onClose();
    navigate(isAdmin ? '/admin' : '/user');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleBackgroundClick}>
      {/* ... rest of the modal UI remains the same */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        targetInfo={{ type: scanType, value: input }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}