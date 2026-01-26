
export const currencyService = {
  detectUserLocale: () => {
    return navigator.language || 'en-US';
  },

  getLocalCurrency: (locale) => {
    // Simple mapping based on locale or timezone could be better, but this is a rough approximation
    // Real implementation would likely use a geolocation service
    if (locale.includes('AZ')) return 'AZN';
    if (locale.includes('AE')) return 'AED';
    if (locale.includes('GB')) return 'GBP';
    if (locale.includes('EU') || locale.includes('DE') || locale.includes('FR')) return 'EUR';
    return 'USD';
  },

  convertCurrency: (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    
    // Fixed exchange rates (Mock) relative to USD
    const rates = {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      AZN: 1.7,
      AED: 3.67
    };

    const inUSD = amount / rates[fromCurrency];
    return (inUSD * rates[toCurrency]).toFixed(2);
  },

  formatPrice: (amount, currency, locale) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
};
