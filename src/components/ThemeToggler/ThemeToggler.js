import React from "react";
import dropdownArrowIcon from "../../images/dropdownArrow.svg";
import styles from "./themeToggler.module.css";
import transitions from "./transitions.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
        <TransitionGroup component="ul" className={styles.list}>
          {Object.keys(themes)
            .filter((themeKey) => themeKey !== activeTheme)
            .map((el) => (
              <CSSTransition key={el} timeout={200} classNames={transitions}>
                <li className={styles.item}>
                  <button
                    type="button"
                    className={styles[el]}
                    onClick={() => handleThemeChange(el)}
                  />
                </li>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default ThemeToggler;
