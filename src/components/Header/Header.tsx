import { ThemeSwitcher } from "components/ThemeSwitcher";
import styles from "./Header.module.scss";
import { ReactComponent as LogoIcon } from "assets/desktop/logo.svg";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <div className={styles.header} data-testid="header">
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logoWrapper}>
            <LogoIcon />
          </div>
        </Link>
        <div className={styles.themeSwitcherWrapper}>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
