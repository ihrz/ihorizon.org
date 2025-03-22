import React from 'react';
import { getTranslation } from '../translations';

interface UserTestimonialsProps {
  currentLang: string;
}

const UserTestimonials: React.FC<UserTestimonialsProps> = ({ currentLang }) => {
  const getTestimonialStars = (index: number): number => {
    const stars = getTranslation(`testimonials.items.${index}.stars`, currentLang as 'fr' | 'en');
    return typeof stars === 'number' ? stars : 5;
  };

  const calculateAverageRating = (): number => {
    const ratings = Array.from({ length: 30 }, (_, i) => getTestimonialStars(i));
    const validRatings = ratings.filter(rating => typeof rating === 'number');
    const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
    const average = validRatings.length > 0 ? sum / validRatings.length : 0;
    return Math.min(Math.round(average * 10) / 10, 5);
  };

  const averageRating = calculateAverageRating();

  const MAX_TESTIMONIALS = 30;

  return (
    <section className="py-20 section-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--quaColor)]/10 to-transparent"></div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/src/assets/img/pattern.png')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradientColor">{getTranslation('testimonials.title', currentLang as 'fr' | 'en')}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
            {getTranslation('testimonials.subtitle', currentLang as 'fr' | 'en')}
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xl font-bold text-white">{averageRating}/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: MAX_TESTIMONIALS }, (_, index) => {
            const title = getTranslation(`testimonials.items.${index}.title`, currentLang as 'fr' | 'en');
            if (title === `testimonials.items.${index}.title`) return null;
            
            return (
              <div key={index} className="group">
                <div className="relative bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg p-6 border border-[var(--secondaryColor)]/20 transform hover:scale-[1.02] transition-all duration-300 h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < getTestimonialStars(index) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-[var(--secondaryColor)]">{title}</h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {getTranslation(`testimonials.items.${index}.content`, currentLang as 'fr' | 'en')}
                    </p>
                    <div className="pt-3 border-t border-[var(--secondaryColor)]/10">
                      <p className="text-white font-medium">
                        {getTranslation(`testimonials.items.${index}.name`, currentLang as 'fr' | 'en')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials; 