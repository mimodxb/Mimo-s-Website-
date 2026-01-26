
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, max = 5, onRate, size = "w-4 h-4", readOnly = true }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = i === Math.floor(rating) && rating % 1 !== 0; // Simplified half star logic if needed
        
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onRate && onRate(i + 1)}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          >
            <Star 
              className={`${size} ${isFilled ? 'fill-[#E0A995] text-[#E0A995]' : 'text-[#A8B3AF]'}`} 
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
