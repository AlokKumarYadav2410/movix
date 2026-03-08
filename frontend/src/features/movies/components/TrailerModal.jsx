import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./TrailerModal.module.scss";

const TrailerModal = ({ isOpen, trailerKey, title, onClose }) => {
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
              <h3>{title || "Movie trailer"}</h3>
              <button type="button" onClick={onClose} aria-label="Close trailer">
                <X size={16} />
              </button>
            </div>

            {trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className={styles.empty}>Trailer for this movie is currently unavailable.</p>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default TrailerModal;
