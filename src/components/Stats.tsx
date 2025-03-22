import React, { useState, useEffect } from 'react';
import helpModuleImage from '@/assets/img/Help-module.png';
import { getTranslation } from '../translations';

interface StatsProps {
  currentLang: string;
}

const Stats: React.FC<StatsProps> = ({ currentLang }) => {
  const [stats, setStats] = useState<{
    servers: number;
    members: number;
    commands: number;
    category: number;
  }>({ servers: 0, members: 0, commands: 0, category: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://gateway.ihorizon.org/api/ihorizon/v1/bot')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStats({
          servers: data.info.servers,
          members: data.info.members,
          commands: data.content.commands,
          category: data.content.category
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError(getTranslation('statsError', currentLang as 'fr' | 'en'));
      });
  }, [currentLang]);
  return (
    <section className="py-24 section-background">
      <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--quaColor)]/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Title */}
        <div className="text-center mb-20">
          <h2 className="extraBoldText text-4xl md:text-5xl text-white mb-8">
            <span className="gradientColor">{getTranslation('statsTitle', currentLang as 'fr' | 'en')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {getTranslation('statsSubtitle', currentLang as 'fr' | 'en')}
          </p>
          <a
            href="https://discord.com/oauth2/authorize?client_id=945202900907470899"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-[var(--secondaryColor)] text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-glow"
          >
            {getTranslation('addToServer', currentLang as 'fr' | 'en')}
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-[var(--secondaryColor)]/20">
            <p className="text-5xl font-bold gradientText mb-4">{stats.servers}+</p>
            <p className="text-xl text-white font-medium">{getTranslation('servers', currentLang as 'fr' | 'en')}</p>
          </div>
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-[var(--secondaryColor)]/20">
            <p className="text-5xl font-bold gradientText mb-4">{Math.round(stats.members / 1000)}k+</p>
            <p className="text-xl text-white font-medium">{getTranslation('users', currentLang as 'fr' | 'en')}</p>
          </div>
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-[var(--secondaryColor)]/20">
            <p className="text-5xl font-bold gradientText mb-4">{stats.commands}+</p>
            <p className="text-xl text-white font-medium">{getTranslation('commands', currentLang as 'fr' | 'en')}</p>
          </div>
        </div>

        {/* Help Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-12 border border-[var(--secondaryColor)]/10">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-4xl font-bold text-white mb-6 gradientText">
              {getTranslation('helpTitle', currentLang as 'fr' | 'en')}
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              {getTranslation('helpDescription', currentLang as 'fr' | 'en')}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={helpModuleImage}
                alt="Help Module"
                className="relative rounded-lg shadow-2xl w-full transform transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 