
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Minimize2, ExternalLink, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatWithMimo } from '@/lib/chatService';
import AudioCallButton from '@/components/AudioCallButton';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello. I am Mimo's AI concierge. How can I assist you with his work or availability today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPages, setSuggestedPages] = useState([]);
  const messagesEndRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Hide widget on full chat page
  if (location.pathname === '/chat') return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Prepare history for API (exclude tool/system internal states if any)
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const { response, toolCalls, suggestedPages: newSuggestions } = await chatWithMimo(userMsg, history);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        toolCalls: toolCalls 
      }]);
      
      if (newSuggestions) setSuggestedPages(newSuggestions);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    // Simple markdown-like bolding
    const parts = content.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#E0A995]">{part}</strong> : part);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[80vh] bg-[#0F1C15]/95 backdrop-blur-xl border border-[#E0A995]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#13251E] border-b border-[#E0A995]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E0A995] animate-pulse" />
                <span className="font-serif font-bold text-[#EBE8E3]">Mimo Intelligence</span>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/chat')} 
                  title="Open Full Page"
                  className="h-8 w-8 text-[#A8B3AF] hover:text-[#E0A995]"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-[#A8B3AF] hover:text-[#E0A995]"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#E0A995] text-[#0A1612] rounded-tr-none' 
                        : 'bg-[#13251E] text-[#EBE8E3] border border-[#E0A995]/10 rounded-tl-none'
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>

                  {/* Render Action Buttons if toolCalls present */}
                  {msg.toolCalls?.map((tool, tIdx) => (
                    tool.name === 'open_audio_call' && (
                       <div key={tIdx} className="mt-2">
                         <AudioCallButton className="text-xs py-2 h-auto" />
                       </div>
                    )
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-[#13251E] p-3 rounded-2xl rounded-tl-none border border-[#E0A995]/10">
                    <Loader2 className="w-4 h-4 animate-spin text-[#E0A995]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Pages */}
            {suggestedPages.length > 0 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-[#E0A995]/5">
                {suggestedPages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(page.path);
                    }}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#E0A995]/10 text-[#E0A995] hover:bg-[#E0A995] hover:text-[#0A1612] transition-colors border border-[#E0A995]/20"
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-[#13251E] border-t border-[#E0A995]/10 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Mimo..."
                className="bg-[#0A1612] border-[#E0A995]/20 text-[#EBE8E3] focus:border-[#E0A995]"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading}
                className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
