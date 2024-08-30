import styles from "./NotFound.module.scss";

interface NotFoundProps {}

export const NotFound = ({}: NotFoundProps) => {
  return (
    <div className={styles.notFound}>
      <p>Page not found</p>
    </div>
  );
};
