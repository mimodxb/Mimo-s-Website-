
import React from 'react';
import { Button } from '@/components/ui/button';
import { Archive, XCircle, RefreshCw } from 'lucide-react';
import { messagingService } from '@/lib/messagingService';

const ConversationHeader = ({ conversation, isClient }) => {
  if (!conversation) return null;

  const handleStatusChange = async (status) => {
    // Call service to update status
    // For now we just console log as the service function signature in task 2 implies implementation
    // Ideally we add updateStatus to messagingService
    console.log(`Setting status to ${status}`);
  };

  return (
    <div className="h-16 border-b border-[#E0A995]/10 flex items-center justify-between px-6 bg-[#0F1C15]">
      <div>
        <h2 className="font-bold text-[#EBE8E3] text-lg">{isClient ? 'Support Team' : conversation.client_name}</h2>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#E0A995]">{conversation.subject}</span>
          <span className="w-1 h-1 bg-[#A8B3AF] rounded-full" />
          <span className={`uppercase font-bold ${conversation.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
            {conversation.status}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!isClient && (
          <>
            <Button size="sm" variant="ghost" title="Archive" className="text-[#A8B3AF] hover:text-[#E0A995]">
              <Archive className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" title="Close" className="text-[#A8B3AF] hover:text-red-500">
              <XCircle className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationHeader;
