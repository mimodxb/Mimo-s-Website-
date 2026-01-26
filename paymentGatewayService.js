
export const paymentGatewayService = {
  getAvailablePaymentMethods: (currency, locale) => {
    const methods = [
      { id: 'stripe', name: 'Credit/Debit Card', icon: '💳', provider: 'Stripe' }
    ];

    if (currency === 'AZN' || locale?.includes('AZ')) {
      methods.push(
        { id: 'birbank', name: 'Birbank', icon: '🏦', provider: 'Kapital Bank' },
        { id: 'm10', name: 'm10 Wallet', icon: '📱', provider: 'PashaPay' }
      );
    }

    if (currency === 'AED' || locale?.includes('AE')) {
      methods.push(
        { id: 'payby', name: 'PayBy', icon: '📱', provider: 'FAB' },
        { id: 'tabby', name: 'Tabby (BNPL)', icon: '⏳', provider: 'Tabby' }
      );
    }

    methods.push({ id: 'crypto', name: 'Crypto', icon: '₿', provider: 'Coinbase' });
    methods.push({ id: 'paypal', name: 'PayPal', icon: '🅿️', provider: 'PayPal' });

    return methods;
  }
};
