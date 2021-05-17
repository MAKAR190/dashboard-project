import React from "react";
import dropdownArrowIcon from "../../images/dropdownArrow.svg";
import styles from "./themeToggler.module.css";
const ThemeToggler = ({
  visible,
  handleThemeChange,
  toggleThemesVisible,
  themes,
  activeTheme,
}) => {
  return (
    <div className={styles.control}>
      <div className={styles.placeholder}>
        <button type="button" className={styles.color} />
        <button
          type="button"
          className={styles.dropdownBtn}
          onClick={toggleThemesVisible}
        >
          <img src={dropdownArrowIcon} alt="arrow" />
        </button>
      </div>
      {visible && (
        <ul onChange={handleThemeChange} className={styles.list}>
          {Object.keys(themes)
            .filter((themeKey) => themeKey !== activeTheme)
            .map((el) => (
              <li className={styles.item} key={el} value={el}>
                <button
                  type="button"
                  className={styles[el]}
                  onClick={() => handleThemeChange(el)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeToggler;
