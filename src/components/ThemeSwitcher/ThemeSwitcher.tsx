import { useEffect, useState } from "react";
import { ReactComponent as IconMoon } from "assets/desktop/icon-moon.svg";
import { ReactComponent as IconSun } from "assets/desktop/icon-sun.svg";
import styles from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {}

export const ThemeSwitcher = ({}: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<boolean>(
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    const currentTheme = theme ? "dark" : "light";
    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div className={styles.themeSwitcherWrapper}>
      <div className={styles.themeIconWrapper}>
        <IconSun className={styles.themeIcon} />
      </div>
      <div>
        <label className={styles.themeSwitcher}>
          <input
            type="checkbox"
            className={styles.input}
            checked={theme}
            onChange={handleTheme}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.themeIconWrapper}>
        <IconMoon className={styles.themeIcon} />
      </div>
    </div>
  );
};
