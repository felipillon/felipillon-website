import React from "react";

export const GlobalBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden">
      {/* Fixed Topographic Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.15] mix-blend-screen"
        >
          <source src="/topographic-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_120%)]" />
      </div>

      {/* Website Content goes on top */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};