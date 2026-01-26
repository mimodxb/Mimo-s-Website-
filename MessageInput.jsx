
import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { messageFileService } from '@/lib/messageFileService';
import { useToast } from '@/components/ui/use-toast';

const MessageInput = ({ onSend, conversationId }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(f => {
       const check = messageFileService.validateFile(f);
       if (!check.valid) toast({ variant: "destructive", title: "File Error", description: check.error });
       return check.valid;
    });
    setFiles(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const handleSend = async () => {
    if ((!text.trim() && files.length === 0) || sending) return;
    
    setSending(true);
    try {
      // Upload files first
      const uploadedUrls = [];
      for (const file of files) {
        const url = await messageFileService.uploadMessageFile(file, conversationId);
        uploadedUrls.push(url);
      }
      
      await onSend(text, uploadedUrls);
      
      setText('');
      setFiles([]);
    } catch (error) {
      toast({ variant: "destructive", title: "Send Failed", description: error.message });
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-[#0F1C15] border-t border-[#E0A995]/10">
      {files.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {files.map((f, i) => (
            <div key={i} className="bg-[#13251E] px-3 py-1 rounded-full text-xs text-[#EBE8E3] flex items-center gap-2 border border-[#E0A995]/20">
              <span className="truncate max-w-[150px]">{f.name}</span>
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="hover:text-red-500"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[50px] max-h-[150px] bg-[#13251E] border-[#333] pr-10 resize-none"
          />
          <div className="absolute right-2 bottom-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileSelect} 
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-[#A8B3AF] hover:text-[#E0A995]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button 
          onClick={handleSend} 
          disabled={(!text.trim() && files.length === 0) || sending}
          className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] h-[50px] w-[50px] rounded-xl"
        >
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </Button>
      </div>
      <div className="text-[10px] text-[#A8B3AF] text-right mt-1">
        {text.length}/5000 • Ctrl+Enter to send
      </div>
    </div>
  );
};

export default MessageInput;
