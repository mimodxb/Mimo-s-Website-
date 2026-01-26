
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Loader2, 
  AlertCircle,
  Clapperboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoIntroduction = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);

  // Placeholder video - Replace this with your actual introduction video URL
  // Using a professional abstract/cinematic placeholder for now
  const VIDEO_SRC = "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4"; 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
          setIsMuted(true); // Ensure muted if autoplay failed essentially
        });
    }

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const total = video.duration;
      if (total) {
        setProgress((current / total) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('waiting', () => setIsLoading(true));
    video.addEventListener('playing', () => setIsLoading(false));
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('waiting', () => setIsLoading(true));
      video.removeEventListener('playing', () => setIsLoading(false));
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (hasError) {
    return (
      <div className="aspect-[3/4] w-full rounded-2xl bg-[#0F1C15] flex flex-col items-center justify-center text-[#EBE8E3] border border-[#E0A995]/20 p-6 text-center">
        <AlertCircle className="w-12 h-12 text-[#E0A995] mb-4" />
        <p className="font-serif text-lg">Unable to load introduction video.</p>
        <p className="text-[#A8B3AF] text-sm mt-2">Please refresh the page or try again later.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[3/4] w-full bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/60 group isolate z-0 ring-1 ring-[#E0A995]/20"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loop
        playsInline
        muted={isMuted}
      />

      {/* Overlays - Gradient & Glass */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />
      
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20"
          >
            <Loader2 className="w-12 h-12 text-[#E0A995] animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Center Play Button (Visible when paused) */}
      <AnimatePresence>
        {!isPlaying && !isLoading && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-[#E0A995]/90 rounded-full flex items-center justify-center text-[#0A1612] hover:bg-[#E0A995] transition-colors shadow-[0_0_30px_rgba(224,169,149,0.3)] hover:scale-110 duration-300"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
        <div className="w-2 h-2 rounded-full bg-[#E0A995] animate-pulse" />
        <span className="text-[#EBE8E3] text-xs font-medium tracking-wide uppercase">Introduction</span>
      </div>

      {/* Professional Overlay Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-[#E0A995] text-[#0A1612] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
          <Clapperboard className="w-3 h-3" />
          <span>Showreel</span>
        </div>
      </div>

      {/* Controls Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/90 to-transparent pt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-3">
          {/* Progress Bar */}
          <div className="relative w-full h-1 group/slider cursor-pointer">
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#E0A995] rounded-full"
              style={{ width: `${progress}%` }}
            />
            <input 
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-[#EBE8E3] hover:text-[#E0A995] transition-colors focus:outline-none"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" fill="currentColor" />}
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button 
                  onClick={toggleMute}
                  className="text-[#EBE8E3] hover:text-[#E0A995] transition-colors focus:outline-none"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                {/* Visual indicator for muted state */}
                {isMuted && (
                   <span className="text-xs text-[#E0A995] font-medium animate-pulse">
                     Unmute
                   </span>
                )}
              </div>
              
              <span className="text-xs text-[#A8B3AF] font-mono tabular-nums">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
              </span>
            </div>

            <button 
              onClick={toggleFullscreen}
              className="text-[#EBE8E3] hover:text-[#E0A995] transition-colors focus:outline-none"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoIntroduction;
