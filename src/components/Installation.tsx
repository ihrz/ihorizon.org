import React from 'react';
import { getTranslation } from '../translations';

interface InstallationProps {
  currentLang: string;
}

const Installation: React.FC<InstallationProps> = ({ currentLang }) => {
  const steps = [
    {
      number: "1",
      key: "add"
    },
    {
      number: "2",
      key: "configure"
    },
    {
      number: "3",
      key: "ready"
    }
  ];

  return (
    <section className="py-24 section-background overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--quaColor)]/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="extraBoldText text-4xl md:text-5xl text-white mb-8">
            <span className="gradientColor">{getTranslation('installation.title', currentLang as 'fr' | 'en')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {getTranslation('installation.subtitle', currentLang as 'fr' | 'en')}
          </p>
          <p className="text-2xl font-bold gradientText mb-12">{getTranslation('installation.followUs', currentLang as 'fr' | 'en')}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-[var(--secondaryColor)]/20 relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] rounded-full flex items-center justify-center shadow-glow">
                  <span className="text-2xl font-bold text-white">
                    {step.number}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-4">{getTranslation(`installation.steps.${step.key}.title`, currentLang as 'fr' | 'en')}</h3>
              <p className="text-gray-300 text-lg">{getTranslation(`installation.steps.${step.key}.description`, currentLang as 'fr' | 'en')}</p>
            </div>
          ))}
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            "https://www.youtube.com/embed/10Fjk43GsAs",
            "https://www.youtube.com/embed/6psOuPbeYDk",
            "https://www.youtube.com/embed/KcdhglvM5Wk"
          ].map((url, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <iframe 
                  className="w-full h-full"
                  src={url}
                  title={`Installation Tutorial ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-12 border border-[var(--secondaryColor)]/10">
          <a
            href="https://discord.com/oauth2/authorize?client_id=898934061322956873&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-glow mb-8"
          >
            {getTranslation('installation.addToServer', currentLang as 'fr' | 'en')}
          </a>
          <p className="text-2xl font-bold gradientText">
            {getTranslation('installation.free', currentLang as 'fr' | 'en')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Installation; 