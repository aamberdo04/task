import React, { useEffect, useState } from "react";

function Notification({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  return (
    visible && (
      <div
        className="fixed bottom-4 right-4 z-[1000] max-w-sm w-full bg-blue-100 border border-blue-500 text-blue-700 px-4 py-3 rounded shadow-lg flex items-center justify-between"
        role="alert"
      >
        <span className="mr-4">{message}</span>
        <button
          onClick={onClose}
          className="text-blue-700 hover:text-red-500 font-bold text-xl leading-none focus:outline-none"
        >
          ✖
        </button>
      </div>
    )
  );
}

export default Notification;
