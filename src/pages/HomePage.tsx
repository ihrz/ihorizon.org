import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import "../assets/css/style.css";
import "../assets/css/card.css";
import useScript from "../hooks/useScript";
import { Link } from "react-router-dom";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { teamMembers } from "../data/teamMembers";
import TeamCarousel from "../components/TeamCarousel";
import UserTestimonials from "../components/UserTestimonials";
import Features from "../components/Features";
import Installation from "../components/Installation";
import Stats from "../components/Stats";
import ihorizonImage from '@/assets/img/ihorizon.png';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const HomePage = () => {
  useScript("/assets/js/snow.js");

  const { language } = useLanguage();

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
          element.classList.add("animate-visible");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="py-16 md:py-24 section-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('@/assets/img/grid.svg')] opacity-10"></div>
        <ResponsiveContainer>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="text-center md:text-left">
              <h1 className="blackText text-white mb-6 relative">
                <span className="relative inline-block">
                  iHorizon
                  <span className="absolute -inset-1 bg-gradient-to-r from-[var(--secondaryColor)] to-[var(--tertiaryColor)] blur-xl opacity-30"></span>
                </span>
              </h1>
              <p className="regularText text-white/90 mb-8 max-w-2xl">
                {getTranslation('heroTitle', language)}
                <span className="block mt-2 text-[var(--secondaryColor)]">
                  {getTranslation('heroSubtitle', language)}
                </span>
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="https://discord.com/oauth2/authorize?client_id=898934061322956873&permissions=8&scope=bot%20applications.commands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-color text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105"
                >
                  {getTranslation('addToDiscord', language)}
                </a>
                <a
                  href="https://discord.gg/B6UNgNUjbt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-transparent border-2 border-[var(--secondaryColor)] text-white rounded-lg font-bold hover:bg-[var(--secondaryColor)]/10 transition-all transform hover:scale-105"
                >
                  {getTranslation('joinSupport', language)}
                </a>
              </div>
            </div>
            <div className="w-full md:w-2/5 relative">
              <div className="relative p-12 flex justify-center md:justify-start">
                <img
                  src={ihorizonImage}
                  alt="iHorizon Bot"
                  className="w-3/4 md:w-1/2 h-auto relative z-10 animate-float-fast"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </header>

      {/* Stats Section */}
      <Stats currentLang={language} />

      {/* Installation Section */}
      <Installation currentLang={language} />

      {/* Detailed Features Section */}
      <Features currentLang={language} />

      {/* Documentation Section */}
      <section className="py-20 md:py-28 section-background">
        <ResponsiveContainer>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-3/5 animate-on-scroll relative">
              <h2 className="extraBoldText text-4xl md:text-5xl text-white mb-8">
                <span className="gradientColor">{getTranslation('docTitle', language)}</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
                {getTranslation('docDescription', language)}
              </p>
              <Link
                to="/documentation"
                className="inline-block px-10 py-5 bg-[var(--secondaryColor)] text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-glow"
              >
                {getTranslation('readDoc', language)}
              </Link>
            </div>
            <div className="w-full md:w-2/5 bg-[#1a1a1a]/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-[var(--secondaryColor)]/20 animate-on-scroll transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold gradientText mb-8">{getTranslation('popularDocs', language)}</h3>
              <ul className="space-y-6">
                <li className="transform transition-all duration-300 hover:translate-x-2">
                  <Link
                    to="/docs/guide"
                    className="text-[var(--secondaryColor)] hover:text-white hover:underline flex items-center group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{getTranslation('gettingStarted', language)}</span>
                  </Link>
                </li>
                <li className="transform transition-all duration-300 hover:translate-x-2">
                  <Link
                    to="/docs/token"
                    className="text-[var(--secondaryColor)] hover:text-white hover:underline flex items-center group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{getTranslation('tokenSetup', language)}</span>
                  </Link>
                </li>
                <li className="transform transition-all duration-300 hover:translate-x-2">
                  <Link
                    to="/docs/selfhost"
                    className="text-[var(--secondaryColor)] hover:text-white hover:underline flex items-center group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{getTranslation('selfHosting', language)}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Testimonials Section */}
      <UserTestimonials currentLang={language} />

      {/* Team Section */}
      <TeamCarousel currentLang={language} />

      {/* CTA Section */}
      <section className="py-20 md:py-28 section-background">
        <ResponsiveContainer>
          <div className="text-center relative z-10 animate-on-scroll bg-[var(--primaryColor)] border border-[var(--secondaryColor)]/20 rounded-xl p-12">
            <h2 className="extraBoldText text-4xl md:text-5xl text-white mb-8">
              <span className="gradientColor">{getTranslation('ctaTitle', language)}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {getTranslation('ctaDescription', language)}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href="https://discord.com/oauth2/authorize?client_id=898934061322956873&permissions=8&scope=bot%20applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-[var(--secondaryColor)] text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-glow"
              >
                {getTranslation('addToDiscord', language)}
              </a>
              <a
                href="https://discord.gg/B6UNgNUjbt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-transparent border-2 border-[var(--secondaryColor)] text-white rounded-lg font-bold hover:bg-[var(--secondaryColor)]/10 transition-all transform hover:scale-105"
              >
                {getTranslation('joinSupportServer', language)}
              </a>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default HomePage;
