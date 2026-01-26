
import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencyService } from '@/lib/currencyService';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLocale, setSelectedLocale] = useState('en-US');

  useEffect(() => {
    const locale = currencyService.detectUserLocale();
    setSelectedLocale(locale);
    const detectedCurrency = currencyService.getLocalCurrency(locale);
    // Optional: allow user to persist preference in localStorage
    const saved = localStorage.getItem('mimo_currency');
    setSelectedCurrency(saved || detectedCurrency);
  }, []);

  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('mimo_currency', currency);
  };

  const convertPrice = (amount, fromCurrency = 'USD') => {
    return currencyService.convertCurrency(amount, fromCurrency, selectedCurrency);
  };

  const format = (amount, fromCurrency = 'USD') => {
    const converted = convertPrice(amount, fromCurrency);
    return currencyService.formatPrice(converted, selectedCurrency, selectedLocale);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, selectedLocale, changeCurrency, convertPrice, format }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
