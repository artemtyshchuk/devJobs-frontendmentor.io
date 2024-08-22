import { ThemeSwitcher } from "components/ThemeSwitcher";
import styles from "./Header.module.scss";
import { ReactComponent as LogoIcon } from "assets/desktop/logo.svg";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>

      <div className={styles.logoWrapper}>
        <LogoIcon />
      </div>
      <div className={styles.themeSwitcherWrapper}>
        <ThemeSwitcher />
      </div>
      </div>
    </div>
  );
};
