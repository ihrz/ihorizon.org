import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/css/style.css';
import './assets/css/card.css';

const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(fontAwesome);

const jquery = document.createElement('script');
jquery.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.head.appendChild(jquery);

const owlCarouselCss = document.createElement('link');
owlCarouselCss.rel = 'stylesheet';
owlCarouselCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css';
document.head.appendChild(owlCarouselCss);

const owlCarouselThemeCss = document.createElement('link');
owlCarouselThemeCss.rel = 'stylesheet';
owlCarouselThemeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css';
document.head.appendChild(owlCarouselThemeCss);

const owlCarouselJs = document.createElement('script');
owlCarouselJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
document.head.appendChild(owlCarouselJs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
