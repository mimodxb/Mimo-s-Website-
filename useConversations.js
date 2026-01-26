
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { messagingService } from '@/lib/messagingService';

export const useConversations = (userId, userType) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      try {
        const data = await messagingService.getConversations(userId, userType);
        setConversations(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchConversations();

    // Subscribe to changes in conversations table
    const channel = supabase.channel(`conversations-list:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations'
          // Ideally filter by client_id if client, but for Admin we need all.
          // RLS handles the initial fetch, but Realtime filters are simple equality.
          // For client: filter `client_id=eq.${userId}`
          // For admin: filter is harder, so we might just listen to all and filter in callback or rely on specific admin channel logic.
        },
        (payload) => {
          // Refresh list to ensure sorting and data is correct
          // A full refetch is safer than manual state manipulation for lists with sorting
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, userType]);

  return { conversations, loading, error, refetch: () => messagingService.getConversations(userId, userType).then(setConversations) };
};
