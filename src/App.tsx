import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BadgeBoostCalculator from "./pages/BadgeBoostCalculator";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from './contexts/LanguageContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="tools/bb_calculator" element={<BadgeBoostCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
