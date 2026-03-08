import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <section className={styles.notFound}>
      <motion.div
        className={styles.glow}
        initial={{ scale: 0.85, opacity: 0.35 }}
        animate={{ scale: 1.08, opacity: 0.65 }}
        transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <motion.h1
          initial={{ letterSpacing: "0.4em", opacity: 0 }}
          animate={{ letterSpacing: "0.08em", opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          404
        </motion.h1>
        <h2>Scene Not Found</h2>
        <p>The page you are looking for does not exist, or it has moved to a different route.</p>

        <Link to="/" className={styles.homeBtn}>
          <Home size={16} /> Back To Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFoundPage;
