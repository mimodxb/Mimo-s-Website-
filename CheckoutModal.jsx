
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CreditCard, Lock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useCurrency } from '@/contexts/CurrencyContext';
import { couponService } from '@/lib/couponService';
import { paymentGatewayService } from '@/lib/paymentGatewayService';
import { Link } from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { selectedCurrency, selectedLocale, convertPrice, format } = useCurrency();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [agreePayment, setAgreePayment] = useState(false);

  const basePrice = item.price ? Number(item.price) : 0;
  const convertedPrice = Number(convertPrice(basePrice, item.currency || 'USD'));
  const finalPrice = Math.max(0, convertedPrice - discountAmount);

  const paymentMethods = paymentGatewayService.getAvailablePaymentMethods(selectedCurrency, selectedLocale);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    const { valid, coupon, error } = await couponService.validateCoupon(couponCode);
    
    if (!valid) {
      toast({ variant: "destructive", title: "Invalid Coupon", description: error });
      setAppliedCoupon(null);
      setDiscountAmount(0);
      return;
    }

    const discount = couponService.applyCoupon(coupon, convertedPrice);
    setAppliedCoupon(coupon);
    setDiscountAmount(discount);
    toast({ title: "Coupon Applied", description: `You saved ${format(discount)}!` });
  };

  const handleCheckout = async () => {
    if (!agreePayment) return;
    
    setIsLoading(true);
    try {
      const endpoint = selectedMethod === 'paypal' ? 'create-paypal-checkout' :
                       selectedMethod === 'crypto' ? 'create-crypto-checkout' :
                       'create-stripe-checkout';

      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: {
          items: [{
            name: item.title || item.name,
            price: finalPrice,
            quantity: 1,
            id: item.id
          }],
          total_amount: finalPrice,
          currency: selectedCurrency,
          customer_email: 'guest@example.com', 
          coupon_id: appliedCoupon?.id,
          coupon_code: appliedCoupon?.code
        }
      });

      if (error) throw error;
      
      if (appliedCoupon) {
        await couponService.useCoupon(appliedCoupon.id);
      }

      if (data?.checkout_url || data?.payment_url) {
        window.location.href = data.checkout_url || data.payment_url;
      } else if (data?.wallet_address) {
        toast({ title: "Order Created", description: "Please complete crypto transfer." });
      } else {
        throw new Error("No payment URL returned");
      }

    } catch (error) {
      console.error('Checkout Error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: "Could not initiate payment. Please try again."
      });
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0F1C15] border border-[#E0A995]/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-[#E0A995]/10 bg-[#13251E]">
            <h3 className="text-xl font-serif font-bold text-[#EBE8E3]">Checkout</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#A8B3AF] hover:text-[#E0A995]">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-[#0A1612] rounded-xl border border-[#E0A995]/10">
              <div className="w-16 h-16 bg-[#13251E] rounded-md overflow-hidden">
                 {item.image_url && <img src={item.image_url} alt="" className="w-full h-full object-cover"/>}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#EBE8E3]">{item.title || item.name}</h4>
                <p className="text-sm text-[#A8B3AF]">Digital Service / Product</p>
              </div>
              <div className="text-xl font-bold text-[#E0A995]">
                {format(convertedPrice)}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="flex gap-2">
              <Input 
                placeholder="Promo Code" 
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className="bg-[#0A1612] border-[#E0A995]/20 text-white"
              />
              <Button onClick={handleApplyCoupon} variant="outline" className="border-[#E0A995]/50 text-[#E0A995]">
                Apply
              </Button>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-sm font-medium text-[#A8B3AF] mb-3 uppercase">Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                      selectedMethod === method.id 
                      ? 'bg-[#E0A995]/10 border-[#E0A995] text-[#E0A995]' 
                      : 'bg-[#0A1612] border-[#E0A995]/10 text-[#A8B3AF] hover:border-[#E0A995]/30'
                    }`}
                  >
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E0A995]/10">
              <div className="flex justify-between text-[#A8B3AF] text-sm">
                <span>Subtotal</span>
                <span>{format(convertedPrice)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-500 text-sm">
                  <span>Discount</span>
                  <span>-{format(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#EBE8E3] font-bold text-lg pt-2">
                <span>Total</span>
                <span>{format(finalPrice)}</span>
              </div>
            </div>

            {/* Payment Terms Agreement */}
            <div className="flex items-start gap-3 bg-[#E0A995]/5 p-3 rounded border border-[#E0A995]/10">
               <Checkbox 
                 id="pay_terms"
                 checked={agreePayment} 
                 onCheckedChange={(c) => setAgreePayment(c)} 
               />
               <label htmlFor="pay_terms" className="text-xs text-[#EBE8E3] cursor-pointer">
                 I agree to the <Link to="/payment-terms" target="_blank" className="text-[#E0A995] underline">Payment Terms</Link>. 
                 <br/><span className="text-[#A8B3AF]">Payment is non-refundable once work has started.</span>
               </label>
            </div>

            <Button 
              onClick={handleCheckout} 
              disabled={isLoading || !agreePayment}
              className="w-full bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] font-bold py-6 text-lg"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pay {format(finalPrice)}
                </div>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-[#A8B3AF]">
              <Lock className="w-3 h-3" />
              <span>Secure Payment processed by {paymentMethods.find(m => m.id === selectedMethod)?.provider}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
