
import React from 'react';
import { FileText, Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FileAttachment = ({ url }) => {
  // Extract filename
  const filename = decodeURIComponent(url.split('/').pop().split('?')[0]).split('_').slice(1).join('_'); // Remove timestamp prefix
  const isImage = url.match(/\.(jpeg|jpg|png|gif|webp)$/i);

  return (
    <div className="flex items-center gap-3 bg-[#0A1612]/50 p-3 rounded-lg border border-[#E0A995]/20 max-w-[250px] mt-2">
      <div className="bg-[#13251E] p-2 rounded">
        {isImage ? <ImageIcon className="w-5 h-5 text-[#E0A995]" /> : <FileText className="w-5 h-5 text-[#E0A995]" />}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-xs text-[#EBE8E3] truncate font-medium">{filename}</p>
        <p className="text-[10px] text-[#A8B3AF] uppercase">Attachment</p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" download>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#A8B3AF] hover:text-[#E0A995]">
          <Download className="w-4 h-4" />
        </Button>
      </a>
    </div>
  );
};

export default FileAttachment;
