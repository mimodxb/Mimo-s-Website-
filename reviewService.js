
import { supabase } from '@/lib/customSupabaseClient';

export const reviewService = {
  getReviews: async (itemType, itemId) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createReview: async (reviewData) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ ...reviewData, status: 'pending' }])
      .select()
      .single();
    return { data, error };
  },

  updateReviewStatus: async (reviewId, status) => {
    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', reviewId)
      .select();
    return { data, error };
  },

  deleteReview: async (reviewId) => {
    const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
    return { error };
  },

  getAverageRating: async (itemType, itemId) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .eq('status', 'approved');

    if (error || !data || data.length === 0) return { rating: 0, count: 0 };

    const total = data.reduce((acc, curr) => acc + curr.rating, 0);
    return { rating: (total / data.length).toFixed(1), count: data.length };
  }
};
