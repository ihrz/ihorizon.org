import React, { useState } from 'react';
import '../tools/bb_calculator/styles.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import badgeImage from '@/assets/img/badge-boost-calculator.png';
import { Calendar, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import ResponsiveContainer from '../components/ResponsiveContainer';

const BadgeBoostCalculator = () => {
  const [boostDate, setBoostDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [badgeDates, setBadgeDates] = useState<{ label: string, date: string }[]>([]);
  const { toast } = useToast();

  const calculateBadgeDates = () => {
    if (!boostDate) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une date de boost.",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date(boostDate);
    
    const badgeMonths = [1, 2, 3, 6, 9, 12, 15, 18, 24];
    const badgeLabels = [
      "1 Mois", "2 Mois", "3 Mois", "6 Mois",
      "9 Mois", "12 Mois", "15 Mois", "18 Mois", "24 Mois"
    ];

    const results = badgeMonths.map((months, index) => {
      const badgeDate = addMonths(startDate, months);
      return {
        label: badgeLabels[index],
        date: format(badgeDate, 'dd MMMM yyyy', { locale: fr })
      };
    });

    setBadgeDates(results);
    setShowResults(true);
    
    toast({
      title: "Calcul effectué",
      description: "Les dates d'évolution des badges ont été calculées avec succès.",
    });
  };

  return (
    <div className="calculator-page overflow-x-hidden">
      <ResponsiveContainer>
        <div className="calculator-container">
          <div className="calculator-header">
            <h1 className="calculator-title">Calculateur d'Évolution des Badges Boost</h1>
            <p className="calculator-description">
              Cet outil vous permet de calculer les dates d'évolution de vos badges Boost en fonction de la date de début.
            </p>
          </div>

          <div className="calculator-input">
            <div className="date-input-wrapper">
              <label htmlFor="boost-date" className="input-label">
                <Calendar className="input-icon" size={20} />
                <span>Date de boost:</span>
              </label>
              <input 
                type="date" 
                id="boost-date" 
                className="date-input"
                value={boostDate} 
                onChange={(e) => setBoostDate(e.target.value)} 
              />
            </div>
            <button className="calculate-button" onClick={calculateBadgeDates}>
              Calculer
            </button>
          </div>
          
          <div className={`calculator-results ${showResults ? '' : 'hidden'}`}>
            <div className="results-badge">
              <img src={badgeImage} alt="Évolution des Badges" className="badge-image" />
            </div>
            <div className="results-info">
              <div className="info-header">
                <Info size={20} />
                <h2>Dates d'évolution</h2>
              </div>
              <ul className="badge-list">
                {badgeDates.map((badge, index) => (
                  <li key={index} className="badge-item">
                    <span className="badge-label">{badge.label}</span>
                    <span className="badge-date">{badge.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default BadgeBoostCalculator;
