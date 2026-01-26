
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Loader2, ArrowLeft, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatWithMimo } from '@/lib/chatService';
import AudioCallButton from '@/components/AudioCallButton';
import GradientBackground from '@/components/GradientBackground';
import LogoComponent from '@/components/LogoComponent';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello. I am Mimo's personal AI concierge. I can answer questions about his filmography, provide official contact details, or schedule a live audio discussion. How may I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPages, setSuggestedPages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const { response, toolCalls, suggestedPages: newSuggestions } = await chatWithMimo(userMsg, history);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        toolCalls: toolCalls 
      }]);
      
      if (newSuggestions) setSuggestedPages(newSuggestions);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a connection error. Please check your internet and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const parts = content.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#E0A995]">{part}</strong> : part);
  };

  return (
    <>
      <Helmet>
        <title>AI Concierge | Movsum Mirzazada</title>
        <meta name="description" content="Chat with Mimo's AI concierge for instant information about his work and availability." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] font-sans flex flex-col relative overflow-hidden">
        <GradientBackground />

        {/* Header */}
        <header className="p-4 md:p-6 border-b border-[#E0A995]/10 bg-[#13251E]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="text-[#A8B3AF] hover:text-[#E0A995] hover:bg-[#E0A995]/10 -ml-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-[#E0A995]/20" />
              <div className="flex items-center gap-3">
                <LogoComponent size="sm" className="h-8" />
                <span className="font-serif font-bold text-lg hidden sm:block">Intelligence</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-end gap-3 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[#E0A995] text-[#0A1612]' : 'bg-[#13251E] border border-[#E0A995]/30'}`}>
                    {msg.role === 'user' ? (
                      <span className="font-bold text-xs">YOU</span>
                    ) : (
                      <div className="w-2 h-2 bg-[#E0A995] rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div 
                    className={`p-4 md:p-6 rounded-2xl text-base leading-relaxed shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-[#E0A995] text-[#0A1612] rounded-tr-none' 
                        : 'glass-card bg-[#13251E]/80 border border-[#E0A995]/10 text-[#EBE8E3] rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{renderMessageContent(msg.content)}</div>
                  </div>
                </div>

                {/* Tools/Actions */}
                {msg.toolCalls?.map((tool, tIdx) => (
                  tool.name === 'open_audio_call' && (
                     <motion.div 
                       key={tIdx} 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="mt-4 ml-11"
                     >
                       <div className="p-4 border border-[#E0A995]/30 rounded-xl bg-[#0A1612]/50 inline-flex flex-col gap-3 items-start">
                         <div className="flex items-center gap-2 text-[#E0A995]">
                           <Mic className="w-4 h-4" />
                           <span className="text-sm font-semibold">Voice Channel Ready</span>
                         </div>
                         <AudioCallButton />
                       </div>
                     </motion.div>
                  )
                ))}
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#13251E] border border-[#E0A995]/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#E0A995] rounded-full animate-pulse" />
                 </div>
                 <div className="text-[#A8B3AF] text-sm animate-pulse">Mimo Intelligence is thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </main>

        {/* Input Footer */}
        <footer className="p-4 md:p-6 bg-[#0A1612] border-t border-[#E0A995]/10 z-20">
          <div className="max-w-3xl mx-auto">
            {/* Suggestions */}
            {suggestedPages.length > 0 && (
              <div className="flex gap-3 mb-4 overflow-x-auto pb-2 no-scrollbar">
                {suggestedPages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(page.path)}
                    className="flex-shrink-0 text-sm px-4 py-2 rounded-full bg-[#13251E] text-[#E0A995] hover:bg-[#E0A995] hover:text-[#0A1612] transition-colors border border-[#E0A995]/20"
                  >
                    Go to {page.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="relative flex items-center gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about availability, bio, or specific films..."
                className="bg-[#13251E] border-[#E0A995]/20 text-[#EBE8E3] focus:border-[#E0A995] h-14 pl-6 text-lg rounded-full shadow-inner"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading}
                className="h-14 w-14 rounded-full bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] shadow-lg hover:shadow-[#E0A995]/20 flex-shrink-0 transition-all"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </Button>
            </form>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChatPage;
