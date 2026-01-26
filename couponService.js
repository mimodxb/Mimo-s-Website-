
import { supabase } from '@/lib/customSupabaseClient';

export const couponService = {
  validateCoupon: async (code) => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .single();

      if (error) throw new Error('Invalid coupon code');
      if (!data) throw new Error('Coupon not found');

      const now = new Date();
      if (data.expires_at && new Date(data.expires_at) < now) {
        throw new Error('Coupon expired');
      }

      if (data.max_usage > 0 && data.usage_count >= data.max_usage) {
        throw new Error('Coupon usage limit reached');
      }

      return { valid: true, coupon: data };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  },

  applyCoupon: (coupon, amount) => {
    if (!coupon) return 0;
    let discount = 0;
    if (coupon.discount_type === 'percent') {
      discount = (amount * coupon.discount_value) / 100;
    } else {
      discount = coupon.discount_value;
    }
    // Ensure discount doesn't exceed total
    return Math.min(discount, amount);
  },

  useCoupon: async (couponId) => {
    // Atomic increment
    const { error } = await supabase.rpc('increment_coupon_usage', { coupon_id: couponId });
    // Note: RPC function needs to be created in DB. Fallback to standard update if RPC not avail:
    if (error) {
       const { data: coupon } = await supabase.from('coupons').select('usage_count').eq('id', couponId).single();
       if (coupon) {
         await supabase.from('coupons').update({ usage_count: coupon.usage_count + 1 }).eq('id', couponId);
       }
    }
  }
};
