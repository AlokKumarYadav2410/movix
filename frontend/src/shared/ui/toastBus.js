const listeners = new Set();

export const subscribeToToasts = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const showToast = ({ type = "info", title = "Notice", message = "", duration = 3200 } = {}) => {
  const payload = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    title,
    message,
    duration
  };

  listeners.forEach((listener) => listener(payload));
};
