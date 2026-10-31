import React from "react";

export const GlobalBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip">
      {/* Website Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};