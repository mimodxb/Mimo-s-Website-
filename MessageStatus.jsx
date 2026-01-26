
import React from 'react';
import { Check, CheckCheck, Loader2 } from 'lucide-react';

const MessageStatus = ({ status, time }) => {
  return (
    <div className="flex items-center justify-end gap-1 text-[10px] text-[#A8B3AF] mt-1 opacity-70">
      <span>{time}</span>
      {status === 'sending' && <Loader2 className="w-3 h-3 animate-spin" />}
      {status === 'sent' && <Check className="w-3 h-3" />}
      {status === 'read' && <CheckCheck className="w-3 h-3 text-blue-400" />}
    </div>
  );
};

export default MessageStatus;
