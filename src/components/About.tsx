import React, { useState } from 'react';
import { Shield, Book, School, User, Github, X } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  github: string;
  contributions: string[];
  details: string;
}

export default function About() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const VITAP_LINK = 'https://vitap.ac.in';

  const teamMembers: TeamMember[] = [
    {
      name: 'Vignesh',
      role: 'Project Lead & Designer',
      github: 'https://github.com/IamVigneshk',
      contributions: [
        'Led overall project architecture and design',
        'Implemented core security scanning modules',
        'Designed user interface and experience',
        'Managed project development lifecycle'
      ],
      details: 'As the project lead, Vignesh spearheaded the development of ScanHere4U, bringing extensive experience in security testing and UI/UX design. His focus on user experience and security integration has been crucial to the project\'s success.'
    },
    {
      name: 'Suneel',
      role: 'Security Researcher & Developer',
      github: 'https://github.com/suneelnalla',
      contributions: [
        'Developed vulnerability assessment modules',
        'Implemented security testing features',
        'Conducted security research and analysis',
        'Backend system architecture'
      ],
      details: 'Suneel\'s expertise in security research and vulnerability assessment has been instrumental in developing robust scanning capabilities. His work ensures comprehensive security analysis for all scanned targets.'
    },
    {
      name: 'Jagadish',
      role: 'Frontend Developer',
      github: 'https://github.com/hii923084',
      contributions: [
        'Built responsive user interfaces',
        'Implemented frontend features',
        'Created interactive components',
        'UI/UX optimizations'
      ],
      details: 'Jagadish focused on creating an intuitive and responsive user interface, implementing key frontend features that enhance user experience. His contributions ensure smooth interaction across all device types.'
    },
    {
      name: 'Yatish',
      role: 'Developer & Tester',
      github: 'https://github.com/Yatishk03',
      contributions: [
        'Quality assurance and testing',
        'Bug fixing and optimization',
        'Feature implementation',
        'Performance testing'
      ],
      details: 'Yatish\'s dedication to quality assurance and testing has been vital in ensuring the reliability and performance of ScanHere4U. His thorough testing approach helps maintain high standards of functionality.'
    }
  ];

  return (
    <div id="about" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            About The Project
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Academic Capstone Project in Cybersecurity
          </p>
        </div>

        <div className="mt-16">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <School className="h-5 w-5 text-cyan-500" />
                  Institution
                </h4>
                <p className="text-gray-300">
                  <a 
                    href={VITAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-400"
                  >
                    Vellore Institute of Technology, Andhra Pradesh (VITAP)
                  </a>
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-500" />
                  Faculty Mentor
                </h4>
                <p className="text-gray-300">
                  <a 
                    href="http://sibichakkaravarthy.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-400"
                  >
                    Prof. Sibi Chakravarty
                  </a>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-gray-700 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-cyan-500 text-sm mb-4">{member.role}</p>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-4">{selectedMember.name}</h3>
            <p className="text-cyan-500 mb-4">{selectedMember.role}</p>
            
            <p className="text-gray-300 mb-6">{selectedMember.details}</p>
            
            <h4 className="text-lg font-semibold text-white mb-3">Key Contributions:</h4>
            <ul className="space-y-2">
              {selectedMember.contributions.map((contribution, index) => (
                <li key={index} className="text-gray-300 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  {contribution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}