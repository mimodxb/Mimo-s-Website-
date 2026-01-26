import React, { useState, useRef, useEffect, memo } from 'react';
import { Mic, X, Sparkles } from 'lucide-react';

// --- 1. AUDIO UTILITIES (Inlined for reliability) ---
const encode = (bytes) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const decode = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
};

const createBlob = (data) => {
  const int16 = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    int16[i] = Math.max(-1, Math.min(1, data[i])) * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
};

const decodeAudioData = async (data, ctx, sampleRate, numChannels) => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

// --- 2. VISUALIZER COMPONENT ---
const Visualizer = memo(({ analyser, isActive, accentColor = '#E0A995' }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    let animationId;

    const render = () => {
      if (!canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      if (!analyser || !isActive) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 2;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [analyser, isActive, accentColor]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
});

// --- 3. MAIN CONCIERGE COMPONENT ---
const GeminiConcierge = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Ready');

  const audioContexts = useRef({ input: null, output: null });
  const analysers = useRef({ input: null, output: null });
  const sessionRef = useRef(null);
  const nextStartTime = useRef(0);
  const streamRef = useRef(null);
  const processorRef = useRef(null);

  const cleanup = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContexts.current.input) audioContexts.current.input.close();
    if (audioContexts.current.output) audioContexts.current.output.close();
    
    setIsConnected(false);
    setIsSpeaking(false);
    setStatus('Ready');
  };

  const connect = async () => {
    try {
      setStatus('Initializing...');
      setError(null);

      // DYNAMIC IMPORT: Loads the SDK only when needed, bypassing build errors
      const { GoogleGenAI } = await import('https://esm.sh/@google/genai@0.2.1');
      
      setStatus('Connecting...');

      const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      
      const inputAnalyser = inputCtx.createAnalyser();
      const outputAnalyser = outputCtx.createAnalyser();
      inputAnalyser.fftSize = 256;
      outputAnalyser.fftSize = 256;
      
      audioContexts.current = { input: inputCtx, output: outputCtx };
      analysers.current = { input: inputAnalyser, output: outputAnalyser };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      source.connect(inputAnalyser);
      inputAnalyser.connect(processor);
      processor.connect(inputCtx.destination);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are Mimo's Concierge. A sophisticated, polite AI assistant for Movsum Mirzazada's personal brand website. You help visitors navigate the site (Shop, Biography, Contact) and answer professional questions. Keep answers concise, elegant, and warm.",
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setStatus('Listening');
          },
          onmessage: async (msg) => {
            if (msg.serverContent?.modelTurn?.parts?.[0]?.inlineData) {
              const audioData = msg.serverContent.modelTurn.parts[0].inlineData.data;
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              
              const src = outputCtx.createBufferSource();
              src.buffer = buffer;
              
              src.connect(outputAnalyser);
              outputAnalyser.connect(outputCtx.destination);
              
              const now = outputCtx.currentTime;
              nextStartTime.current = Math.max(nextStartTime.current, now);
              src.start(nextStartTime.current);
              nextStartTime.current += buffer.duration;
              
              setIsSpeaking(true);
              setStatus('Speaking');
              
              src.onended = () => {
                const currentTime = outputCtx.currentTime;
                if (currentTime >= nextStartTime.current - 0.1) {
                   setIsSpeaking(false);
                   setStatus('Listening');
                }
              };
            }
            
            if (msg.serverContent?.interrupted) {
               nextStartTime.current = 0;
               setIsSpeaking(false);
               setStatus('Listening');
            }
          },
          onclose: () => cleanup(),
          onerror: (err) => {
             console.error(err);
             setError("Connection Error");
             cleanup();
          }
        }
      });
      sessionRef.current = sessionPromise;

      processor.onaudioprocess = (e) => {
        const blob = createBlob(e.inputBuffer.getChannelData(0));
        sessionPromise.then(session => session.sendRealtimeInput({ media: blob }));
      };

    } catch (err) {
      console.error(err);
      setError("Microphone access denied or API error.");
      cleanup();
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-4 py-2 rounded-md font-semibold transition-all duration-300 gap-2 flex items-center ${className}`}
      >
        <Sparkles className="w-4 h-4" />
        AI Concierge
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0A1612] border border-[#E0A995]/20 w-full max-w-sm h-[500px] rounded-xl overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-300">
            
            <div className="flex items-center justify-between p-4 border-b border-[#E0A995]/10 bg-[#13251E]">
              <div className="flex items-center gap-2 text-[#EBE8E3]">
                <Sparkles className="w-4 h-4 text-[#E0A995]" />
                <span className="font-serif font-bold text-sm">Mimo's Concierge</span>
              </div>
              <button 
                onClick={() => { setIsOpen(false); cleanup(); }}
                className="p-1 hover:bg-[#E0A995]/10 rounded-full text-[#A8B3AF] hover:text-[#E0A995] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black relative flex flex-col">
               <div className="flex-1 relative border-b border-[#E0A995]/5">
                  <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#E0A995]/50 font-bold">Gemini AI</div>
                  <Visualizer analyser={analysers.current.output} isActive={isConnected} accentColor="#E0A995" />
               </div>
               
               <div className="flex-1 relative">
                  <div className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-blue-400/50 font-bold">You</div>
                  <Visualizer analyser={analysers.current.input} isActive={isConnected} accentColor="#60A5FA" />
               </div>

               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isConnected && !error && (
                     <div className="text-[#A8B3AF] text-sm animate-pulse">Ready to start...</div>
                  )}
                  {error && (
                     <div className="text-red-400 text-sm bg-red-900/20 px-3 py-1 rounded-full border border-red-500/20">{error}</div>
                  )}
               </div>
            </div>

            <div className="p-4 bg-[#13251E] border-t border-[#E0A995]/10 flex flex-col gap-3">
               <div className="flex justify-between items-center text-xs text-[#A8B3AF] px-1">
                  <span>Status: <span className={isConnected ? "text-[#E0A995]" : "text-gray-500"}>{status}</span></span>
               </div>
               
               <button
                 onClick={isConnected ? cleanup : connect}
                 className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    isConnected 
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                    : 'bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]'
                 }`}
               >
                 {isConnected ? (
                    <>Stop Conversation</>
                 ) : (
                    <><Mic className="w-4 h-4" /> Start Speaking</>
                 )}
               </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default function AudioCallButton(props) {
  return <GeminiConcierge {...props} />;
}