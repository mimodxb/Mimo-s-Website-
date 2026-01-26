
import React, { useEffect, useRef } from 'react';
import { useConversation } from '@/hooks/useConversation';
import { messagingService } from '@/lib/messagingService';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { formatDistanceToNow } from 'date-fns';
import FileAttachment from './FileAttachment';
import MessageStatus from './MessageStatus';

const MessageThread = ({ conversationId }) => {
  const { messages, loading } = useConversation(conversationId);
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      messagingService.markConversationAsRead(conversationId);
    }
  }, [conversationId, messages.length]);

  if (loading) return <div className="flex-1 flex items-center justify-center text-[#A8B3AF]">Loading messages...</div>;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center text-[#A8B3AF] py-10 opacity-50">
          No messages yet. Start the conversation!
        </div>
      )}
      
      {messages.map((msg) => {
        const isMe = msg.sender_id === user.id;
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`px-4 py-3 rounded-2xl text-sm ${
                isMe 
                  ? 'bg-[#E0A995] text-[#0A1612] rounded-tr-none' 
                  : 'bg-[#13251E] text-[#EBE8E3] border border-[#E0A995]/10 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.message_text}</p>
              </div>
              
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-1 space-y-1">
                  {msg.attachments.map((url, i) => (
                    <FileAttachment key={i} url={url} />
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#A8B3AF] opacity-70">
                   {msg.sender_name} • {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageThread;
