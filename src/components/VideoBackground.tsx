
import React, { PropsWithChildren } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface VideoBackgroundProps {
  settings?: { background_video_url?: string };
}

const VideoBackground: React.FC<PropsWithChildren<VideoBackgroundProps>> = ({
  children,
}) => {
  const { data: siteSettings } = useSiteSettings();
  
  // Use site settings video URL, fallback to default
  const videoUrl = siteSettings?.background_video_url || "https://i.imgur.com/TEFsS0p.mp4";

  console.log('VideoBackground - Using video URL:', videoUrl);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        key={videoUrl} // Force re-render when URL changes
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onError={(e) => console.error('Video error:', e)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Removed the dark overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
