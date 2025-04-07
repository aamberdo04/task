import React, { useEffect, useState } from "react";

function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [message]);

  return (
    visible && (
      <div className="fixed bottom-4 right-4 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <span>{message}</span>
      </div>
    )
  );
}

export default Notification;
