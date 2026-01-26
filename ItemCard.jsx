
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Info, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ReviewsList from './ReviewsList';
import RatingStars from './RatingStars';
import { reviewService } from '@/lib/reviewService';

const ItemCard = ({ item, onRequestInfo, onBuyNow }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [ratingData, setRatingData] = useState({ rating: 0, count: 0 });

  useEffect(() => {
    const fetchRating = async () => {
      const data = await reviewService.getAverageRating(item.category || 'general', item.id);
      setRatingData(data);
    };
    fetchRating();
  }, [item.id, item.category]);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(224, 169, 149, 0.1)" }}
      className="bg-[#13251E]/80 backdrop-blur-md border border-[#E0A995]/20 rounded-xl overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.title || item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#0A1612] flex items-center justify-center text-[#E0A995]/30">
            <ShoppingBag className="w-12 h-12" />
          </div>
        )}
        {item.price && (
          <div className="absolute top-3 right-3 bg-[#E0A995] text-[#0A1612] font-bold px-3 py-1 rounded-full text-sm">
            {item.currency === 'USD' ? '$' : item.currency}{item.price}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
           <div className="flex justify-between items-start">
             <h3 className="text-xl font-serif font-bold text-[#EBE8E3] mb-1">{item.title || item.name}</h3>
           </div>
           
           {ratingData.count > 0 && (
             <div className="flex items-center gap-1 mb-2">
               <RatingStars rating={Number(ratingData.rating)} size="w-3 h-3" />
               <span className="text-xs text-[#A8B3AF]">({ratingData.count})</span>
             </div>
           )}

          <p className="text-[#A8B3AF] text-sm line-clamp-3">{item.description}</p>
        </div>

        <div className="flex gap-2 pt-4 border-t border-[#E0A995]/10 mt-auto">
          <Button 
            onClick={() => onRequestInfo(item)}
            variant="outline" 
            className="flex-1 border-[#E0A995]/30 text-[#EBE8E3] hover:text-[#E0A995] hover:bg-[#E0A995]/10 px-2"
          >
            <Info className="w-4 h-4 mr-2" />
            Info
          </Button>
          
          <Button
            onClick={() => setShowReviews(true)}
            variant="ghost"
            size="icon"
            className="text-[#E0A995] hover:bg-[#E0A995]/10"
            title="Reviews"
          >
             <MessageSquare className="w-4 h-4" />
          </Button>

          {onBuyNow && (item.price || item.type === 'offer') && (
            <Button 
              onClick={() => onBuyNow(item)}
              className="flex-1 bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-2"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showReviews} onOpenChange={setShowReviews}>
        <DialogContent className="max-w-2xl bg-[#0F1C15] border-[#E0A995]/20 text-[#EBE8E3] max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{item.title || item.name} - Reviews</h2>
          <ReviewsList itemType={item.category || 'general'} itemId={item.id} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ItemCard;
