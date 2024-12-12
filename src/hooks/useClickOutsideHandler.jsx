import { useEffect } from "react";

const useClickOutsideHandler = (ref, onClose, optionalRef = false) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target))
      {
        if (onClose) onClose();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useClickOutsideHandler;
