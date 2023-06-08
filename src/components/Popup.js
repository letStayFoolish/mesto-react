import React, { useCallback, useEffect } from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  // Function to close popup on Escape button
  const escFunction = useCallback(
    (event) => {
      if (isOpen) {
        if (event.key === 'Escape') {
          onClose();
        }
      }
    },
    [isOpen]
  );
  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);
  return [children];
};

export default Popup;
