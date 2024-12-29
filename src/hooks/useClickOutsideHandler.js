import { useEffect } from "react";

const useClickOutsideHandler = (ref, onClose, optionalRef = false) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target))
      {
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useClickOutsideHandler;
