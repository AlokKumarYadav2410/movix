import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { subscribeToToasts } from "./toastBus";
import styles from "./ToastHost.module.scss";

const iconByType = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
};

const ToastHost = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return subscribeToToasts((toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, toast.duration || 3200);
    });
  }, []);

  const renderedToasts = useMemo(() => {
    return toasts.slice(-4);
  }, [toasts]);

  return (
    <div className={styles.host} aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {renderedToasts.map((toast) => {
          const Icon = iconByType[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              className={`${styles.toast} ${styles[toast.type] || ""}`}
              initial={{ opacity: 0, x: 18, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22 }}
            >
              <span className={styles.iconWrap}>
                <Icon size={16} />
              </span>
              <div>
                <p className={styles.title}>{toast.title}</p>
                <p className={styles.message}>{toast.message}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastHost;
