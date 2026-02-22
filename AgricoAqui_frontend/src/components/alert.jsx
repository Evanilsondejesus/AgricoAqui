import { useState, useEffect } from "react";

export default function Alert({ message, type = "danger", show, onClose, autoClose = true }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  }

  if (!visible) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={handleClose}
      ></button>
    </div>
  );
}

