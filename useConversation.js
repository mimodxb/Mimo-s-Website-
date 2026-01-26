
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { messagingService } from '@/lib/messagingService';

export const useConversation = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use ref to avoid stale closure in subscription callback
  const messagesRef = useRef([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    let subscription;

    const fetchMessages = async () => {
      try {
        const data = await messagingService.getMessages(conversationId);
        setMessages(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to real-time changes
    const channel = supabase.channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT and UPDATE
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
             setMessages(prev => prev.map(msg => 
               msg.id === payload.new.id ? payload.new : msg
             ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return { messages, loading, error };
};
