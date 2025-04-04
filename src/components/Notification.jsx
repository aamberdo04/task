import React from 'react';

function Notification({ message, onClose }) {
  console.log("Notification component rendered with message:", message); // 👈 Debug log

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-md shadow-md z-50">
      {message}
      <button
        className="absolute top-0 right-0 p-1 text-white"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  );
}

export default Notification;
