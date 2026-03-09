import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./TrailerModal.module.scss";

const TrailerModal = ({ isOpen, trailerKey, title, onClose }) => {
  const [isFrameLoading, setIsFrameLoading] = useState(true);

  useEffect(() => {
    setIsFrameLoading(Boolean(trailerKey));
  }, [trailerKey, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.head}>
              <h3>{title || "Trailer"}</h3>
              <button type="button" onClick={onClose} aria-label="Close trailer">
                <X size={16} />
              </button>
            </div>

            {trailerKey ? (
              <div className={styles.playerWrap}>
                <div
                  className={`${styles.skeleton} ${isFrameLoading ? "" : styles.skeletonHidden}`}
                  aria-hidden="true"
                />
                <iframe
                  className={isFrameLoading ? styles.hiddenFrame : ""}
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsFrameLoading(false)}
                />
              </div>
            ) : (
              <p className={styles.empty}>Trailer is not available for this title yet. Please try another movie or TV show.</p>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default TrailerModal;
