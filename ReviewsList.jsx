
import React, { useState, useEffect } from 'react';
import { reviewService } from '@/lib/reviewService';
import RatingStars from './RatingStars';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const ReviewsList = ({ itemType, itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ rating: 0, count: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const fetchReviews = async () => {
    const { data } = await reviewService.getReviews(itemType, itemId);
    const { rating, count } = await reviewService.getAverageRating(itemType, itemId);
    if (data) setReviews(data);
    setStats({ rating, count });
  };

  useEffect(() => {
    fetchReviews();
  }, [itemType, itemId]);

  return (
    <div className="space-y-6 mt-8 border-t border-[#E0A995]/10 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#EBE8E3] flex items-center gap-2">
            Reviews <span className="text-sm font-normal text-[#A8B3AF]">({stats.count})</span>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <RatingStars rating={Number(stats.rating)} />
            <span className="text-[#E0A995] font-bold">{stats.rating}</span>
          </div>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-[#E0A995]/30 text-[#E0A995] hover:bg-[#E0A995]/10">
              <Plus className="w-4 h-4 mr-2" /> Write Review
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0F1C15] border-[#E0A995]/20 text-[#EBE8E3]">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <ReviewForm itemType={itemType} itemId={itemId} onSuccess={fetchReviews} onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="bg-[#13251E]/50 p-4 rounded-xl border border-[#E0A995]/10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-[#EBE8E3]">{review.title}</h4>
                  <RatingStars rating={review.rating} size="w-3 h-3" />
                </div>
                <span className="text-xs text-[#A8B3AF]">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-[#A8B3AF] mb-2">{review.comment}</p>
              <div className="text-xs text-[#E0A995] font-medium">- {review.name || 'Anonymous'}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[#A8B3AF] bg-[#13251E]/30 rounded-xl">
            No reviews yet. Be the first to share your experience!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
