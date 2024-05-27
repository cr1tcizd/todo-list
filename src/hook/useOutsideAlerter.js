import { useEffect, useRef } from "react";

export const useOutsideAlerter = (onOutsideClick, ref, toolRef) => {
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current.contains(e.target) && !toolRef.current.contains(e.target)) {
        onOutsideClick();
      }
    }
    
    document.addEventListener('mousedown', handleClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onOutsideClick]);

  return ref;
}