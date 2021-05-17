import { useState } from "react";
import { themes } from "../../themes";
import styles from "./Settings.module.css";
import ThemeToggler from "../../components/ThemeToggler/ThemeToggler";
function Settings() {
  const [activeTheme, setActiveTheme] = useState(themes.default);
  const [visible, setVisible] = useState(false);
  function handleThemeChange(newTheme) {
    setActiveTheme(newTheme);
    document.querySelector("html").className = newTheme;
    setVisible(false);
  }

  function toggleThemesVisible() {
    setVisible((prevState) => !prevState);
  }
  return (
    <>
      <h1>Settings</h1>
      <div className={styles.line} />
      <h3 className={styles.subtitle}>Theme</h3>
      <ThemeToggler
        activeTheme={activeTheme}
        visible={visible}
        handleThemeChange={handleThemeChange}
        toggleThemesVisible={toggleThemesVisible}
        themes={themes}
      />
      <h3 className={styles.subtitle}>Font</h3>
    </>
  );
}

export default Settings;
