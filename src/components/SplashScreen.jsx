import React from "react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative w-[400px] h-[250px] overflow-hidden rounded-xl">
        <video
          src="/SKILL.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
