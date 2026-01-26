
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { reviewService } from '@/lib/reviewService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RatingStars from './RatingStars';
import { Loader2 } from 'lucide-react';

const ReviewForm = ({ itemType, itemId, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({ rating: 5, title: '', comment: '', name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await reviewService.createReview({
      item_type: itemType,
      item_id: itemId,
      ...formData
    });

    setLoading(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not submit review." });
    } else {
      toast({ title: "Success", description: "Review submitted for moderation." });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-[#A8B3AF]">Rating</label>
        <div className="py-2">
          <RatingStars 
            rating={formData.rating} 
            readOnly={false} 
            onRate={(r) => setFormData({...formData, rating: r})} 
            size="w-8 h-8"
          />
        </div>
      </div>

      <Input 
        placeholder="Review Title" 
        value={formData.title} 
        onChange={e => setFormData({...formData, title: e.target.value})}
        className="bg-[#0A1612] border-[#E0A995]/20 text-white"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input 
          placeholder="Your Name" 
          required
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="bg-[#0A1612] border-[#E0A995]/20 text-white"
        />
        <Input 
          placeholder="Email" 
          required
          type="email"
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="bg-[#0A1612] border-[#E0A995]/20 text-white"
        />
      </div>

      <Textarea 
        placeholder="Tell us about your experience..." 
        value={formData.comment} 
        onChange={e => setFormData({...formData, comment: e.target.value})}
        className="bg-[#0A1612] border-[#E0A995]/20 text-white min-h-[100px]"
      />

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={onClose} className="text-[#A8B3AF]">Cancel</Button>
        <Button type="submit" disabled={loading} className="bg-[#E0A995] text-[#0A1612]">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
