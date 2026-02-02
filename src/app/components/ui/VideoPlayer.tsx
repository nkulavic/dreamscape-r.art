"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff, HiX } from "react-icons/hi";
import { HiArrowsPointingOut } from "react-icons/hi2";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  className = "",
  autoPlay = false,
  showControls = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(!autoPlay);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalMuted, setModalMuted] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowOverlay(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Pause the inline video
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsModalOpen(true);
    setModalPlaying(false);
    setModalMuted(false);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setIsModalOpen(false);
    setModalPlaying(false);
  };

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setModalPlaying(!modalPlaying);
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalMuted;
      setModalMuted(!modalMuted);
    }
  };

  const handleModalVideoEnd = () => {
    setModalPlaying(false);
  };

  return (
    <>
      <div className={`relative group rounded-2xl overflow-hidden bg-gray-900 ${className}`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          autoPlay={autoPlay}
          loop={false}
          playsInline
          onEnded={handleVideoEnd}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Play overlay */}
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            onClick={togglePlay}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
            >
              <HiPlay className="w-10 h-10 text-accent ml-1" />
            </motion.button>
          </motion.div>
        )}

        {/* Title overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-heading font-bold text-lg">{title}</h3>
          </div>
        )}

        {/* Expand button - always visible on hover */}
        <button
          onClick={openModal}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center shadow-lg hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Expand video"
        >
          <HiArrowsPointingOut className="w-5 h-5 text-white" />
        </button>

        {/* Controls */}
        {showControls && !showOverlay && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              {isPlaying ? (
                <HiPause className="w-5 h-5 text-gray-800" />
              ) : (
                <HiPlay className="w-5 h-5 text-gray-800 ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              {isMuted ? (
                <HiVolumeOff className="w-5 h-5 text-gray-800" />
              ) : (
                <HiVolumeUp className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Close video"
            >
              <HiX className="w-6 h-6 text-white" />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl mx-6 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                src={src}
                poster={poster}
                muted={modalMuted}
                playsInline
                onEnded={handleModalVideoEnd}
                onClick={toggleModalPlay}
                className="w-full h-full object-contain rounded-lg cursor-pointer"
              />

              {/* Modal play overlay */}
              {!modalPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={toggleModalPlay}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                  >
                    <HiPlay className="w-12 h-12 text-accent ml-1" />
                  </motion.button>
                </motion.div>
              )}

              {/* Modal controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={toggleModalPlay}
                  className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  {modalPlaying ? (
                    <HiPause className="w-6 h-6 text-gray-800" />
                  ) : (
                    <HiPlay className="w-6 h-6 text-gray-800 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleModalMute}
                  className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  {modalMuted ? (
                    <HiVolumeOff className="w-6 h-6 text-gray-800" />
                  ) : (
                    <HiVolumeUp className="w-6 h-6 text-gray-800" />
                  )}
                </button>
              </div>

              {/* Title */}
              {title && (
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
                  <h3 className="text-white font-heading font-bold text-2xl">{title}</h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
