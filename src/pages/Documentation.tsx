import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Book, Code, Search, Shield, Music, Gift, User, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import ResponsiveContainer from '../components/ResponsiveContainer';
import '../assets/css/documentation.css';
import { getTranslation } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';
import { debounce } from 'lodash';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  description: string;
  tab: string;
  searchKeys: string[];
}

const ContentSection: React.FC<{
  id: string;
  title: string;
  description: string;
  content: string;
  children?: React.ReactNode;
}> = React.memo(({ id, title, description, content, children }) => (
  <section className="content-section" id={id} aria-labelledby={`${id}-title`}>
    <div className="section-header">
      <h2 id={`${id}-title`}>{title}</h2>
    </div>
    <div className="accordion-content">
      <div className="section-intro">
        <p>{description}</p>
      </div>
      <div className="doc-content">
        <p>{content}</p>
        {children}
      </div>
    </div>
  </section>
));

const FeatureCard: React.FC<{
  title: string;
  description: string;
}> = React.memo(({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
));

const FAQItem: React.FC<{
  title: string;
  description: string;
  permissions?: {
    user: string;
    bot: string;
  };
}> = React.memo(({ title, description, permissions }) => (
  <li className="faq-item">
    <h3>{title}</h3>
    <p>{description}</p>
    {permissions && (
      <div className="permissions">
        <p>{permissions.user}</p>
        <p>{permissions.bot}</p>
      </div>
    )}
  </li>
));

const GuideStep: React.FC<{
  number: number;
  title: string;
  description: string;
  command?: string;
}> = React.memo(({ number, title, description, command }) => (
  <div className="guide-step">
    <div className="step-number">{number}</div>
    <div className="step-content">
      <h3>{title}</h3>
      <p>{description}</p>
      {command && <p><code>{command}</code></p>}
    </div>
  </div>
));

const Documentation = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('getting-started');
  const [activeSidebarItem, setActiveSidebarItem] = useState('what-is');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const tabSections = useMemo(() => ({
    'getting-started-section': ['what-is-nav', 'how-to-use-nav'],
    'commands-section': ['backup-nav', 'bot-nav', 'economy-nav', 'fun-nav', 'other-categories-nav'],
    'self-hosting-section': ['requirements-nav', 'config-nav', 'start-nav'],
    'token-section': ['what-is-token-nav', 'create-token-nav', 'security-nav']
  }), []);

  const searchableContent = useMemo(() => {
    const content: SearchResult[] = [];
    
    Object.entries(tabSections).forEach(([tab, sections]) => {
      sections.forEach(section => {
        const translatedTitle = getTranslation(section, language as 'fr' | 'en');
        const translatedContent = getTranslation(`${section}-content`, language as 'fr' | 'en');
        const translatedDescription = getTranslation(`${section}-desc`, language as 'fr' | 'en');
        
        content.push({
          id: section,
          title: translatedTitle,
          content: translatedContent,
          description: translatedDescription,
          tab,
          searchKeys: [
            translatedTitle,
            translatedContent,
            translatedDescription
          ].filter(Boolean)
        });
      });
    });
    
    return content;
  }, [language, tabSections]);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSidebarItem(sectionId);
    
    const scrollToElement = () => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement && mainContentRef.current) {
        const yOffset = -80;
        const topPosition = sectionElement.getBoundingClientRect().top + 
                          mainContentRef.current.scrollTop + yOffset;
        
        mainContentRef.current.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      } else {
        setTimeout(scrollToElement, 100);
      }
    };

    requestAnimationFrame(scrollToElement);
  }, []);

  const handleSidebarClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    window.location.hash = sectionId;
    
    scrollToSection(sectionId);
  }, [scrollToSection]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setActiveSidebarItem('');
    setSearchQuery('');
    setSearchResults([]);
    
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 200);
    } else if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [scrollToSection]);

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = searchableContent.filter(item => {
        const searchText = item.searchKeys.join(' ').toLowerCase();
        return searchText.includes(query.toLowerCase());
      });

      setSearchResults(results);
    } catch (error) {
      setSearchError(getTranslation('searchError', language as 'fr' | 'en'));
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [searchableContent, language]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 300),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const searchContainer = document.querySelector('.search-results-container');
      if (searchContainer) {
        searchContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchResults]);

  const rowVirtualizer = useVirtualizer({
    count: searchResults.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        for (const [tab, sections] of Object.entries(tabSections)) {
          if (sections.includes(hash)) {
            setActiveTab(tab);
            setTimeout(() => scrollToSection(hash), 100);
            break;
          }
        }
      }
    };

    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [tabSections, scrollToSection]);

  const navItems = useMemo(() => [
    { id: 'getting-started-section', icon: Book, label: 'getting-started-section' },
    { id: 'commands-section', icon: Code, label: 'commands-section' },
    { id: 'self-hosting-section', icon: Shield, label: 'self-hosting-section' },
    { id: 'token-section', icon: Settings, label: 'token-section' }
  ], []);

  const sections = [
    {
      tab: 'getting-started-section',
      content: [
        { title: 'what-is-nav', description: 'what-is-desc' },
        { title: 'how-to-use-nav', description: 'how-to-use-desc' }
      ]
    },
    {
      tab: 'commands-section',
      content: [
        { title: 'backup-nav', description: 'backup-desc' },
        { title: 'bot-nav', description: 'bot-desc' },
        { title: 'economy-nav', description: 'economy-desc' },
        { title: 'fun-nav', description: 'fun-desc' },
        { title: 'other-categories-nav', description: 'other-categories-desc' }
      ]
    },
    {
      tab: 'self-hosting-section',
      content: [
        { title: 'requirements-nav', description: 'requirements-desc' },
        { title: 'config-nav', description: 'config-desc' },
        { title: 'start-nav', description: 'start-desc' }
      ]
    },
    {
      tab: 'token-section',
      content: [
        { title: 'what-is-token-nav', description: 'what-is-token-desc' },
        { title: 'create-token-nav', description: 'create-token-desc' },
        { title: 'security-nav', description: 'security-desc' }
      ]
    }
  ];
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#what-is-nav';
    }
  }, []);

  return (
    <div className="doc-page" role="document">
      <ResponsiveContainer>
        <div className="doc-header">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
            aria-label={getTranslation('back', language as 'fr' | 'en')}
          >
            <ArrowLeft size={18} />
            <span>{getTranslation('back', language as 'fr' | 'en')}</span>
          </button>
          <h1 className="doc-title">{getTranslation('docTitle', language as 'fr' | 'en')}</h1>
          <p className="doc-subtitle">
            {getTranslation('docDescription', language as 'fr' | 'en')}
          </p>
          
          <div className="doc-search-container">
            <div className="doc-search">
              <Search className="search-icon" size={18} aria-hidden="true" />
              <input 
                type="text" 
                className="search-input" 
                placeholder={getTranslation('searchDoc', language as 'fr' | 'en')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={getTranslation('searchDoc', language as 'fr' | 'en')}
              />
            </div>
          </div>
        </div>

        {searchError && (
          <div className="error-message" role="alert">
            {getTranslation('searchError', language as 'fr' | 'en')}
          </div>
        )}

        {isSearching && (
          <div className="loading-indicator" role="status">
            {getTranslation('searching', language as 'fr' | 'en')}
          </div>
        )}

        {searchResults.length > 0 ? (
          <div 
            ref={parentRef} 
            className="search-results-container"
            style={{ height: '400px', overflow: 'auto' }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const result = searchResults[virtualRow.index];
                return (
                  <div
                    key={result.id}
                    className="search-result-item"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={() => {
                      setActiveTab(result.tab);
                      setActiveSidebarItem(result.id);
                      window.location.hash = result.id;
                      setTimeout(() => {
                        scrollToSection(result.id);
                      }, 100);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveTab(result.tab);
                        setActiveSidebarItem(result.id);
                        window.location.hash = result.id;
                        setTimeout(() => {
                          scrollToSection(result.id);
                        }, 100);
                        setSearchQuery('');
                        setSearchResults([]);
                      }
                    }}
                  >
                    <h3>{result.title}</h3>
                    <p>{result.description}</p>
                    <span className="search-result-section">
                      {getTranslation(result.tab, language as 'fr' | 'en')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : searchQuery && searchResults.length === 0 ? (
          <div className="no-results">
            {getTranslation('noSearchResults', language as 'fr' | 'en')}
          </div>
        ) : (
          <>
            <nav className="doc-nav-container" role="navigation" aria-label="Documentation navigation">
              <div className="doc-nav">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button 
                    key={id}
                    className={`doc-nav-item ${activeTab === id ? 'active' : ''}`}
                    onClick={() => handleTabChange(id)}
                    aria-current={activeTab === id ? 'page' : undefined}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{getTranslation(label, language as 'fr' | 'en')}</span>
                  </button>
                ))}
              </div>
            </nav>
            
            <div className="doc-grid">
              <aside className="doc-sidebar hidden md:block" role="complementary">
                <div className="sidebar-container">
                  {activeTab === 'getting-started-section' && (
                    <>
                      <h3 className="sidebar-title">{getTranslation('getting-started-section', language as 'fr' | 'en')}</h3>
                      <ul className="sidebar-links" role="list">
                        <li className={`sidebar-link ${activeSidebarItem === 'what-is-nav' ? 'active' : ''}`}>
                          <a 
                            href="#what-is-nav" 
                            onClick={(e) => handleSidebarClick(e, 'what-is-nav')}
                            aria-current={activeSidebarItem === 'what-is-nav' ? 'page' : undefined}
                          >
                            {getTranslation('what-is-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'how-to-use-nav' ? 'active' : ''}`}>
                          <a 
                            href="#how-to-use-nav" 
                            onClick={(e) => handleSidebarClick(e, 'how-to-use-nav')}
                            aria-current={activeSidebarItem === 'how-to-use-nav' ? 'page' : undefined}
                          >
                            {getTranslation('how-to-use-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                  
                  {activeTab === 'commands-section' && (
                    <>
                      <h3 className="sidebar-title">{getTranslation('commands-section', language as 'fr' | 'en')}</h3>
                      <ul className="sidebar-links">
                        <li className={`sidebar-link ${activeSidebarItem === 'backup-nav' ? 'active' : ''}`}>
                          <a 
                            href="#backup-nav" 
                            onClick={(e) => handleSidebarClick(e, 'backup-nav')}
                          >
                            {getTranslation('backup-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'bot-nav' ? 'active' : ''}`}>
                          <a 
                            href="#bot-nav" 
                            onClick={(e) => handleSidebarClick(e, 'bot-nav')}
                          >
                            {getTranslation('bot-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'economy-nav' ? 'active' : ''}`}>
                          <a 
                            href="#economy-nav" 
                            onClick={(e) => handleSidebarClick(e, 'economy-nav')}
                          >
                            {getTranslation('economy-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'fun-nav' ? 'active' : ''}`}>
                          <a 
                            href="#fun-nav" 
                            onClick={(e) => handleSidebarClick(e, 'fun-nav')}
                          >
                            {getTranslation('fun-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'other-categories-nav' ? 'active' : ''}`}>
                          <a 
                            href="#other-categories-nav" 
                            onClick={(e) => handleSidebarClick(e, 'other-categories-nav')}
                          >
                            {getTranslation('other-categories-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                  
                  {activeTab === 'self-hosting-section' && (
                    <>
                      <h3 className="sidebar-title">{getTranslation('self-hosting-section', language as 'fr' | 'en')}</h3>
                      <ul className="sidebar-links">
                        <li className={`sidebar-link ${activeSidebarItem === 'requirements-nav' ? 'active' : ''}`}>
                          <a 
                            href="#requirements-nav" 
                            onClick={(e) => handleSidebarClick(e, 'requirements-nav')}
                          >
                            {getTranslation('requirements-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'config-nav' ? 'active' : ''}`}>
                          <a 
                            href="#config-nav" 
                            onClick={(e) => handleSidebarClick(e, 'config-nav')}
                          >
                            {getTranslation('config-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'start-nav' ? 'active' : ''}`}>
                          <a 
                            href="#start-nav" 
                            onClick={(e) => handleSidebarClick(e, 'start-nav')}
                          >
                            {getTranslation('start-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                  
                  {activeTab === 'token-section' && (
                    <>
                      <h3 className="sidebar-title">{getTranslation('token-section', language as 'fr' | 'en')}</h3>
                      <ul className="sidebar-links">
                        <li className={`sidebar-link ${activeSidebarItem === 'what-is-token-nav' ? 'active' : ''}`}>
                          <a 
                            href="#what-is-token-nav" 
                            onClick={(e) => handleSidebarClick(e, 'what-is-token-nav')}
                          >
                            {getTranslation('what-is-token-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'create-token-nav' ? 'active' : ''}`}>
                          <a 
                            href="#create-token-nav" 
                            onClick={(e) => handleSidebarClick(e, 'create-token-nav')}
                          >
                            {getTranslation('create-token-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                        <li className={`sidebar-link ${activeSidebarItem === 'security-nav' ? 'active' : ''}`}>
                          <a 
                            href="#security-nav" 
                            onClick={(e) => handleSidebarClick(e, 'security-nav')}
                          >
                            {getTranslation('security-nav', language as 'fr' | 'en')}
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </aside>
              
              <main className="doc-main-content" ref={mainContentRef} role="main">
                {activeTab === 'getting-started-section' && (
                  <div className="doc-section animate-fade-in">
                    <ContentSection
                      id="what-is-nav"
                      title={getTranslation('what-is-nav', language as 'fr' | 'en')}
                      description={getTranslation('what-is-desc', language as 'fr' | 'en')}
                      content={getTranslation('what-is-content', language as 'fr' | 'en')}
                    >
                      <div className="features-grid">
                        <FeatureCard
                          title={getTranslation('protection', language as 'fr' | 'en')}
                          description={getTranslation('protectionDesc', language as 'fr' | 'en')}
                        />
                        <FeatureCard
                          title={getTranslation('musicFeature', language as 'fr' | 'en')}
                          description={getTranslation('musicFeatureDesc', language as 'fr' | 'en')}
                        />
                        <FeatureCard
                          title={getTranslation('economyFeature', language as 'fr' | 'en')}
                          description={getTranslation('economyFeatureDesc', language as 'fr' | 'en')}
                        />
                        <FeatureCard
                          title={getTranslation('moderationFeature', language as 'fr' | 'en')}
                          description={getTranslation('moderationFeatureDesc', language as 'fr' | 'en')}
                        />
                      </div>
                    </ContentSection>
                    
                    <ContentSection
                      id="how-to-use-nav"
                      title={getTranslation('how-to-use-nav', language as 'fr' | 'en')}
                      description={getTranslation('how-to-use-desc', language as 'fr' | 'en')}
                      content={getTranslation('how-to-use-content', language as 'fr' | 'en')}
                    >
                      <div className="guide">
                        <GuideStep
                          number={1}
                          title={getTranslation('how-to-use-step1-title', language as 'fr' | 'en')}
                          description={getTranslation('how-to-use-step1-desc', language as 'fr' | 'en')}
                        />
                        <GuideStep
                          number={2}
                          title={getTranslation('how-to-use-step2-title', language as 'fr' | 'en')}
                          description={getTranslation('how-to-use-step2-desc', language as 'fr' | 'en')}
                        />
                        <GuideStep
                          number={3}
                          title={getTranslation('how-to-use-step3-title', language as 'fr' | 'en')}
                          description={getTranslation('how-to-use-step3-desc', language as 'fr' | 'en')}
                        />
                      </div>
                    </ContentSection>
                  </div>
                )}
                
                {activeTab === 'commands-section' && (
                  <div className="doc-section animate-fade-in">
                    <ContentSection
                      id="backup-nav"
                      title={getTranslation('backup-nav', language as 'fr' | 'en')}
                      description={getTranslation('backup-desc', language as 'fr' | 'en')}
                      content={getTranslation('backup-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('backup-list', language as 'fr' | 'en')}
                          description={getTranslation('backup-list-desc', language as 'fr' | 'en')}
                          permissions={{
                            user: getTranslation('userPermRequired', language as 'fr' | 'en'),
                            bot: getTranslation('noPerm', language as 'fr' | 'en')
                          }}
                        />
                        <FAQItem
                          title={getTranslation('backup-create', language as 'fr' | 'en')}
                          description={getTranslation('backup-create-desc', language as 'fr' | 'en')}
                          permissions={{
                            user: getTranslation('userPermRequired', language as 'fr' | 'en'),
                            bot: getTranslation('adminPerm', language as 'fr' | 'en')
                          }}
                        />
                        <FAQItem
                          title={getTranslation('backup-load', language as 'fr' | 'en')}
                          description={getTranslation('backup-load-desc', language as 'fr' | 'en')}
                          permissions={{
                            user: getTranslation('userPermRequired', language as 'fr' | 'en'),
                            bot: getTranslation('ownerPerm', language as 'fr' | 'en')
                          }}
                        />
                      </ul>
                    </ContentSection>
                    
                    <ContentSection
                      id="bot-nav"
                      title={getTranslation('bot-nav', language as 'fr' | 'en')}
                      description={getTranslation('bot-desc', language as 'fr' | 'en')}
                      content={getTranslation('bot-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('bot-status', language as 'fr' | 'en')}
                          description={getTranslation('bot-status-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('bot-ping', language as 'fr' | 'en')}
                          description={getTranslation('bot-ping-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('bot-kisakay', language as 'fr' | 'en')}
                          description={getTranslation('bot-kisakay-desc', language as 'fr' | 'en')}
                        />
                      </ul>
                    </ContentSection>
                    
                    <ContentSection
                      id="economy-nav"
                      title={getTranslation('economy-nav', language as 'fr' | 'en')}
                      description={getTranslation('economy-desc', language as 'fr' | 'en')}
                      content={getTranslation('economy-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('economy-wallet', language as 'fr' | 'en')}
                          description={getTranslation('economy-wallet-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('economy-manage-add', language as 'fr' | 'en')}
                          description={getTranslation('economy-manage-add-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('economy-pay', language as 'fr' | 'en')}
                          description={getTranslation('economy-pay-desc', language as 'fr' | 'en')}
                        />
                      </ul>
                    </ContentSection>
                    
                    <ContentSection
                      id="fun-nav"
                      title={getTranslation('fun-nav', language as 'fr' | 'en')}
                      description={getTranslation('fun-desc', language as 'fr' | 'en')}
                      content={getTranslation('fun-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('fun-love', language as 'fr' | 'en')}
                          description={getTranslation('fun-love-desc', language as 'fr' | 'en')}
                        />
                      </ul>
                    </ContentSection>
                    
                    <ContentSection
                      id="other-categories-nav"
                      title={getTranslation('other-categories-nav', language as 'fr' | 'en')}
                      description={getTranslation('other-categories-desc', language as 'fr' | 'en')}
                      content={getTranslation('other-categories-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('giveaway-nav', language as 'fr' | 'en')}
                          description={getTranslation('giveaway-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('guild-config-nav', language as 'fr' | 'en')}
                          description={getTranslation('guild-config-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('invite-manager-nav', language as 'fr' | 'en')}
                          description={getTranslation('invite-manager-desc', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('music-commands-nav', language as 'fr' | 'en')}
                          description={getTranslation('music-commands-desc', language as 'fr' | 'en')}
                        />
                      </ul>
                    </ContentSection>
                  </div>
                )}
                
                {activeTab === 'self-hosting-section' && (
                  <div className="doc-section animate-fade-in">
                    <ContentSection
                      id="requirements-nav"
                      title={getTranslation('requirements-nav', language as 'fr' | 'en')}
                      description={getTranslation('requirements-desc', language as 'fr' | 'en')}
                      content={getTranslation('requirements-content', language as 'fr' | 'en')}
                    >
                      <ul className="faq-list">
                        <FAQItem
                          title={getTranslation('requirements-nodejs', language as 'fr' | 'en')}
                          description={getTranslation('requirements-nodejs-version', language as 'fr' | 'en')}
                        />
                        <FAQItem
                          title={getTranslation('requirements-npm', language as 'fr' | 'en')}
                          description={getTranslation('requirements-npm-included', language as 'fr' | 'en')}
                        />
                      </ul>
                    </ContentSection>
                    
                    <ContentSection
                      id="config-nav"
                      title={getTranslation('config-nav', language as 'fr' | 'en')}
                      description={getTranslation('config-desc', language as 'fr' | 'en')}
                      content={getTranslation('config-content', language as 'fr' | 'en')}
                    >
                      <div className="guide">
                        <GuideStep
                          number={1}
                          title={getTranslation('config-edit', language as 'fr' | 'en')}
                          description={getTranslation('config-edit-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={2}
                          title={getTranslation('config-enter-info', language as 'fr' | 'en')}
                          description={getTranslation('config-enter-info-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={3}
                          title={getTranslation('config-rename-file', language as 'fr' | 'en')}
                          description={getTranslation('config-rename-file-desc', language as 'fr' | 'en')}
                        />
                      </div>
                    </ContentSection>
                    
                    <ContentSection
                      id="start-nav"
                      title={getTranslation('start-nav', language as 'fr' | 'en')}
                      description={getTranslation('start-desc', language as 'fr' | 'en')}
                      content={getTranslation('startLinuxMac', language as 'fr' | 'en')}
                    >
                      <div className="guide">
                        <GuideStep
                          number={1}
                          title={getTranslation('start-check-versions', language as 'fr' | 'en')}
                          description={getTranslation('start-check-versions-desc', language as 'fr' | 'en')}
                          command={getTranslation('nodeVersionCommand', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={2}
                          title={getTranslation('start-install-deps', language as 'fr' | 'en')}
                          description={getTranslation('start-install-deps', language as 'fr' | 'en')}
                          command={getTranslation('start-install-deps-command', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={3}
                          title={getTranslation('start-compile', language as 'fr' | 'en')}
                          description={getTranslation('start-compile', language as 'fr' | 'en')}
                          command={getTranslation('start-build-command', language as 'fr' | 'en')}
                        />
                      </div>
                    </ContentSection>
                  </div>
                )}
                
                {activeTab === 'token-section' && (
                  <div className="doc-section animate-fade-in">
                    <ContentSection
                      id="what-is-token-nav"
                      title={getTranslation('what-is-token-nav', language as 'fr' | 'en')}
                      description={getTranslation('what-is-token-desc', language as 'fr' | 'en')}
                      content={getTranslation('tokenExplanation', language as 'fr' | 'en')}
                    />
                    
                    <ContentSection
                      id="create-token-nav"
                      title={getTranslation('create-token-nav', language as 'fr' | 'en')}
                      description={getTranslation('create-token-desc', language as 'fr' | 'en')}
                      content={getTranslation('create-token-content', language as 'fr' | 'en')}
                    >
                      <div className="guide">
                        <GuideStep
                          number={1}
                          title={getTranslation('create-token-access-portal', language as 'fr' | 'en')}
                          description={getTranslation('create-token-access-portal-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={2}
                          title={getTranslation('create-token-new-app', language as 'fr' | 'en')}
                          description={getTranslation('create-token-new-app-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={3}
                          title={getTranslation('create-token-configure-bot', language as 'fr' | 'en')}
                          description={getTranslation('create-token-configure-bot-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={4}
                          title={getTranslation('create-token-configure-options', language as 'fr' | 'en')}
                          description={getTranslation('create-token-configure-options-desc', language as 'fr' | 'en')}
                        />
                        
                        <GuideStep
                          number={5}
                          title={getTranslation('create-token-get', language as 'fr' | 'en')}
                          description={getTranslation('create-token-get-desc', language as 'fr' | 'en')}
                        />
                      </div>
                    </ContentSection>
                    
                    <ContentSection
                      id="security-nav"
                      title={getTranslation('security-nav', language as 'fr' | 'en')}
                      description={getTranslation('security-desc', language as 'fr' | 'en')}
                      content={getTranslation('security-content', language as 'fr' | 'en')}
                    >
                      <p>{getTranslation('token-security-reset', language as 'fr' | 'en')}</p>
                    </ContentSection>
                  </div>
                )}
              </main>
            </div>
          </>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(Documentation);
