import React, { useEffect, useState } from 'react';
import { Server, Shield, Database, Cloud, Wifi, Home } from 'lucide-react';

interface ScanningInterfaceProps {
  targetInfo: { type: 'domain' | 'ip'; value: string };
  isAdmin: boolean;
  onReturnHome: () => void;
}

export default function ScanningInterface({ targetInfo, isAdmin, onReturnHome }: ScanningInterfaceProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const scanPhases = [
    { icon: Wifi, title: 'Network Analysis', description: 'Scanning network ports and services', duration: 5000 },
    { icon: Shield, title: 'Vulnerability Detection', description: 'Identifying security vulnerabilities', duration: 8000 },
    { icon: Database, title: 'Configuration Audit', description: 'Analyzing security configurations', duration: 6000 },
    { icon: Cloud, title: 'Cloud Asset Analysis', description: 'Premium: Scanning cloud infrastructure', duration: 7000 },
    { icon: Server, title: 'Advanced Threat Detection', description: 'Premium: Detecting sophisticated threats', duration: 9000 }
  ];

  useEffect(() => {
    let totalDuration = 0;
    scanPhases.forEach(phase => {
      totalDuration += phase.duration;
    });

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowResults(true);
          return 100;
        }
        return prev + (100 / totalDuration) * 50;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phaseIndex = scanPhases.findIndex((_, index) => {
      const previousPhasesDuration = scanPhases
        .slice(0, index)
        .reduce((sum, phase) => sum + phase.duration, 0);
      const totalDuration = scanPhases.reduce((sum, phase) => sum + phase.duration, 0);
      const progressPercentage = (previousPhasesDuration / totalDuration) * 100;
      return scanProgress <= progressPercentage;
    });

    setCurrentPhase(phaseIndex === -1 ? scanPhases.length - 1 : Math.max(0, phaseIndex - 1));
  }, [scanProgress]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Scanning Target</h2>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="font-semibold">Type:</span>
              <span className="text-cyan-500">{targetInfo.type.toUpperCase()}</span>
              <span className="font-semibold">Target:</span>
              <span className="text-cyan-500">{targetInfo.value}</span>
            </div>
          </div>
          <button
            onClick={onReturnHome}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-md flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </button>
        </div>

        <div className="relative h-2 bg-gray-700 rounded-full mb-8 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${scanProgress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        <div className="grid gap-6">
          {scanPhases.map((phase, index) => {
            const isActive = index === currentPhase;
            const isComplete = index < currentPhase;
            const isPremium = index > 2 && !isAdmin;

            return (
              <div
                key={index}
                className={`relative bg-gray-800 p-6 rounded-lg transform transition-all duration-300 ${
                  isActive ? 'ring-2 ring-cyan-500 scale-102' : ''
                } ${isPremium ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <phase.icon className={`w-8 h-8 transition-colors duration-300 ${
                    isComplete ? 'text-green-500' : isActive ? 'text-cyan-500 animate-pulse' : 'text-gray-500'
                  }`} />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {phase.title}
                      {isPremium && (
                        <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400">{phase.description}</p>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-cyan-500 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}