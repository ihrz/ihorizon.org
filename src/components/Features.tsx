import React from 'react';
import { getTranslation } from '../translations';
import automodImage from '/assets/img/automod-module.png';
import welcomeImage from '/assets/img/Welcome-module.png';
import musicImage from '/assets/img/music-module.png';
import invitesImage from '/assets/img/inv-module.png';
import tempchannelsImage from '/assets/img/tempvoice-module.png';

interface FeaturesProps {
  currentLang: string;
}

const Features: React.FC<FeaturesProps> = ({ currentLang }) => {
  const features = [
    {
      key: 'automod',
      image: automodImage
    },
    {
      key: 'welcome',
      image: welcomeImage
    },
    {
      key: 'music',
      image: musicImage
    },
    {
      key: 'invites',
      image: invitesImage
    },
    {
      key: 'tempchannels',
      image: tempchannelsImage
    }
  ];

  return (
    <section className="py-20 section-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 animate-on-scroll`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <img 
                    src={feature.image} 
                    alt={getTranslation(`features.${feature.key}.title`, currentLang as 'fr' | 'en')}
                    className="relative rounded-lg shadow-2xl w-full transform transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-white">{getTranslation(`features.${feature.key}.title`, currentLang as 'fr' | 'en')}</h3>
                <p className="text-lg text-gray-300">{getTranslation(`features.${feature.key}.description`, currentLang as 'fr' | 'en')}</p>
                <a
                  href="https://discord.com/oauth2/authorize?client_id=945202900907470899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[var(--secondaryColor)] text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-glow"
                >
                  {getTranslation(`features.${feature.key}.action`, currentLang as 'fr' | 'en')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 
