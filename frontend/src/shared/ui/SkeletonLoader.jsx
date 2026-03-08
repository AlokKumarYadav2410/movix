import styles from "./SkeletonLoader.module.scss";

const SkeletonLoader = ({ count = 6, height = "280px" }) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={styles.card}
          style={{ height }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
