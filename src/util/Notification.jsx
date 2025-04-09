import React, { useEffect, useState } from "react";

function Notification({ message, onClose, type = "info" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  const getClasses = () => {
    switch (type) {
      case "delete":
      case "error":
        return "bg-red-100 border border-red-500 text-red-700";
      case "info":
      default:
        return "bg-blue-100 border border-blue-500 text-blue-700";
    }
  };

  return (
    visible && (
      <div
        className={`fixed bottom-4 right-4 z-[1000] max-w-sm w-full px-4 py-3 rounded shadow-lg flex items-center justify-between ${getClasses()}`}
        role="alert"
      >
        <span className="mr-4" dangerouslySetInnerHTML={{ __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        <button
          onClick={onClose}
          className="text-inherit hover:text-black font-bold text-xl leading-none focus:outline-none"
        >
          ✖
        </button>
      </div>
    )
  );
}

export default Notification;
