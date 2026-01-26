
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const InquiryForm = ({ isOpen, onClose, item }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferred_contact_method: 'email'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Save to Database
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([{
          ...formData,
          service_id: item.category ? item.id : null,
          brand_id: !item.category && item.name ? item.id : null,
          // Generic fallback logic for item ID association could be improved
        }]);

      if (dbError) throw dbError;

      // 2. Send Email via Edge Function
      const { error: funcError } = await supabase.functions.invoke('send-inquiry-email', {
        body: {
          ...formData,
          item_name: item.title || item.name,
          item_type: item.category || 'brand'
        }
      });

      if (funcError) console.warn('Email notification failed but inquiry saved:', funcError);

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '', preferred_contact_method: 'email' });
      }, 2000);

    } catch (error) {
      console.error('Inquiry Error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again later or contact us directly."
      });
    } finally {
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
          className="bg-[#0F1C15] border border-[#E0A995]/20 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-[#E0A995]/10 bg-[#13251E]">
            <h3 className="text-xl font-serif font-bold text-[#EBE8E3]">Request Info</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#A8B3AF] hover:text-[#E0A995]">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                <h4 className="text-2xl font-bold text-[#EBE8E3]">Request Sent!</h4>
                <p className="text-[#A8B3AF]">We will get back to you shortly regarding {item.title || item.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-[#E0A995]/5 p-3 rounded-lg border border-[#E0A995]/10 mb-4">
                  <p className="text-xs text-[#E0A995] uppercase tracking-wider mb-1">Inquiring About</p>
                  <p className="font-medium text-[#EBE8E3]">{item.title || item.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[#A8B3AF] uppercase">Name</label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="bg-[#0A1612] border-[#E0A995]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-[#A8B3AF] uppercase">Phone</label>
                    <Input 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="bg-[#0A1612] border-[#E0A995]/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#A8B3AF] uppercase">Email</label>
                  <Input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="bg-[#0A1612] border-[#E0A995]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#A8B3AF] uppercase">Preferred Contact</label>
                  <select 
                    value={formData.preferred_contact_method}
                    onChange={e => setFormData({...formData, preferred_contact_method: e.target.value})}
                    className="w-full h-10 px-3 rounded-md bg-[#0A1612] border border-[#E0A995]/20 text-white focus:outline-none focus:border-[#E0A995]"
                  >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#A8B3AF] uppercase">Message</label>
                  <Textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="bg-[#0A1612] border-[#E0A995]/20 text-white resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] font-bold py-6"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Send Request</>}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryForm;
