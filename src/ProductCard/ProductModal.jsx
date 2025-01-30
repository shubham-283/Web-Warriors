import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // Close modal on Esc key press
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  // Focus management: set focus to modal when opened
  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Close modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Add event listeners for keydown and click events
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        tabIndex={-1} // Allow focus on the modal
        className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog" // ARIA role for dialog
        aria-modal="true" // Indicate that this is a modal dialog
      >
        <button
          onClick={onClose}
          className="float-right text-gray-600 hover:text-gray-800 text-4xl"
          aria-label="Close modal" // Accessibility label for screen readers
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // Render modal at the end of the body
  );
};

export default Modal;
