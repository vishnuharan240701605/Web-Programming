import React, { useEffect } from 'react';

/**
 * Notification Component
 * Renders brief success or informational feedback messages.
 * Automatically clears after 4 seconds or when dismissed manually.
 */
function Notification({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isDanger = notification.type === 'danger';

  return (
    <div
      className={`notification-toast ${isSuccess ? 'toast-success' : isDanger ? 'toast-danger' : 'toast-info'}`}
      role="alert"
    >
      <span className="toast-icon">
        {isSuccess ? '✅' : isDanger ? '🗑️' : 'ℹ️'}
      </span>
      <span className="toast-message">{notification.message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;
