import React from 'react';
import { Shield, Search, Lock, Cloud, Database, Wifi, Globe, Zap, FileCode, AlertTriangle, FileText } from 'lucide-react';

const services = [
  {
    title: 'RECON Service',
    description: 'Advanced reconnaissance module for gathering target information.',
    icon: Search,
    features: ['Asset Discovery', 'Domain Enumeration', 'Service Identification'],
    development: false
  },
  {
    title: 'Attack Surface Mapping',
    description: 'Comprehensive mapping of potential attack vectors and entry points.',
    icon: Globe,
    features: ['Surface Analysis', 'Entry Point Detection', 'Risk Assessment'],
    development: false
  },
  {
    title: 'Vulnerability Scanning',
    description: 'Detailed vulnerability assessment and security testing.',
    icon: Shield,
    features: ['Automated Scanning', 'CVE Detection', 'Security Assessment'],
    development: false
  },
  {
    title: 'Exploitation',
    description: 'Advanced exploitation techniques and penetration testing.',
    icon: Lock,
    features: ['Exploit Development', 'Penetration Testing', 'Security Validation'],
    development: false
  },
  {
    title: 'Post Exploitation',
    description: 'Post-exploitation analysis and assessment.',
    icon: Cloud,
    features: ['Access Analysis', 'Privilege Assessment', 'Security Hardening'],
    development: false
  },
  {
    title: 'Reporting',
    description: 'Comprehensive security reports and recommendations.',
    icon: FileText,
    features: ['Detailed Reports', 'Remediation Steps', 'Executive Summary'],
    development: false
  }
];

export default function Services() {
  return (
    <div id="services" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl logo-text">
            Security Testing Modules
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Advanced security testing modules for comprehensive analysis
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500 bg-opacity-10">
                  <service.icon className="h-8 w-8 text-cyan-500" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 logo-text">
                {service.title}
                {service.development && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Development
                  </span>
                )}
              </h3>

              <p className="text-gray-400 mb-6">{service.description}</p>

              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                    <Zap className="h-4 w-4 text-cyan-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}