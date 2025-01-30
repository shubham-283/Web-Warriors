import { useState } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000);
  };

  return [notification, showNotification];
};
