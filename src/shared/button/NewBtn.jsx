// NewBtn.js

import React from 'react';

const NButton = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, onClick }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
      onClick={onClick}
    >
      {icon} {text}
    </button>
  );
};

export default NButton;
