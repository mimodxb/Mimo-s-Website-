
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useConversations } from '@/hooks/useConversations';
import ConversationList from '@/components/ConversationList';
import MessageThread from '@/components/MessageThread';
import MessageInput from '@/components/MessageInput';
import ConversationHeader from '@/components/ConversationHeader';
import { messagingService } from '@/lib/messagingService';
import { caseDeliverableService } from '@/lib/caseDeliverableService';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, Clock } from 'lucide-react';

const ClientMessagingPage = () => {
  const { user } = useAuth();
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { conversations, loading } = useConversations(user?.id, 'client');
  const [mobileView, setMobileView] = useState('list');
  const [deliverable, setDeliverable] = useState(null);

  const selectedConversation = conversations.find(c => c.id === conversationId) || conversations[0];

  useEffect(() => {
    if (selectedConversation && selectedConversation.intake_id) {
      caseDeliverableService.getCaseDeliverable(selectedConversation.intake_id)
        .then(setDeliverable)
        .catch(console.error);
    } else {
      setDeliverable(null);
    }
  }, [selectedConversation]);

  const handleSelect = (conv) => {
    navigate(`/client-messaging/${conv.id}`);
    setMobileView('chat');
  };

  const handleSend = async (text, attachments) => {
    if (!selectedConversation) return;
    await messagingService.sendMessage(
      selectedConversation.id,
      { id: user.id, type: 'client', name: user.user_metadata?.full_name || 'Client', email: user.email },
      text,
      attachments
    );
  };

  return (
    <div className="h-[calc(100vh-5rem)] bg-[#0A1612] flex overflow-hidden">
      {/* Left Panel - List */}
      <div className={`${conversationId ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] lg:w-[400px] flex-col border-r border-[#E0A995]/10`}>
        <ConversationList 
          conversations={conversations} 
          selectedId={selectedConversation?.id} 
          onSelect={handleSelect}
          loading={loading}
        />
      </div>

      {/* Right Panel - Chat */}
      <div className={`${conversationId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#0A1612]`}>
        {selectedConversation ? (
          <>
            <ConversationHeader conversation={selectedConversation} isClient={true} />
            
            {/* Deliverable Status Banner */}
            {selectedConversation.intake_id && (
              <div className="bg-[#13251E] p-4 border-b border-[#E0A995]/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    {deliverable?.delivery_status === 'delivered' ? (
                       <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                       <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#EBE8E3]">
                         Case Status: <span className="text-[#E0A995] uppercase">{deliverable?.delivery_status?.replace('_', ' ') || 'Pending'}</span>
                      </p>
                      {deliverable?.delivered_at && (
                         <p className="text-[10px] text-[#A8B3AF]">Delivered: {new Date(deliverable.delivered_at).toLocaleDateString()}</p>
                      )}
                    </div>
                 </div>
                 
                 {deliverable?.delivery_status === 'delivered' ? (
                   <Button 
                      size="sm" 
                      onClick={() => navigate(`/case-deliverable/${selectedConversation.intake_id}`)}
                      className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]"
                   >
                     <Download className="w-4 h-4 mr-2" /> View Case PDF
                   </Button>
                 ) : (
                   <span className="text-xs text-[#A8B3AF] italic">Drafting in progress...</span>
                 )}
              </div>
            )}

            <MessageThread conversationId={selectedConversation.id} />
            <MessageInput onSend={handleSend} conversationId={selectedConversation.id} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#A8B3AF] flex-col gap-4">
             <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMessagingPage;
