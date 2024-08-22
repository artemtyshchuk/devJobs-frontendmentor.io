import { ReactNode } from "react";

import styles from "./Container.module.scss";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div>
      <div className={styles.headerImage} data-testid="headerImage"></div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
