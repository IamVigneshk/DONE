import React, { useState } from 'react';
import { Shield, Search, Lock } from 'lucide-react';
import ScanModal from './ScanModal';

interface HeroProps {
  onScanStart: (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => void;
}

export default function Hero({ onScanStart }: HeroProps) {
  const [showScanModal, setShowScanModal] = useState(false);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Automated Security</span>
                <span className="block text-cyan-500">Attack Surface Analysis</span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover vulnerabilities, analyze attack surfaces, and secure your infrastructure with our advanced scanning platform.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setShowScanModal(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 md:py-4 md:text-lg md:px-10"
                  >
                    Start Free Scan
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={scrollToFeatures}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-500 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ScanModal
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        onScanStart={onScanStart}
      />
    </div>
  );
}