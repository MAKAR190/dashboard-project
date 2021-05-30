import React from "react";
import dropdownArrowIcon from "../../images/dropdownArrow.svg";
import styles from "./FontToggler.module.css";
import transitions from "./transitions.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const ThemeToggler = ({
  visible,
  handleFontChange,
  toggleFontsVisible,
  fonts,
  activeFont,
}) => {
  return (
    <div className={styles.control}>
      <div className={styles.placeholder}>
        <div
          className={styles.font}
          style={
            activeFont && activeFont.length < 3
              ? {
                  fontSize: activeFont + "px",
                }
              : {
                  fontFamily: activeFont,
                }
          }
        >
          <p>{activeFont}</p>
        </div>
        <button
          type="button"
          className={styles.dropdownBtn}
          onClick={toggleFontsVisible}
        >
          <img src={dropdownArrowIcon} alt="arrow" />
        </button>
      </div>
      {visible && (
        <TransitionGroup component="ul" className={styles.list}>
          {Object.keys(fonts)
            .filter((fontKey) => fontKey !== activeFont)
            .map((el) => (
              <CSSTransition key={el} timeout={200} classNames={transitions}>
                <li className={styles.item}>
                  <button
                    type="button"
                    className={styles.font}
                    id={styles.fontItem}
                    onClick={() => handleFontChange(el)}
                    style={
                      el.length < 3
                        ? {
                            fontSize: el + "px",
                          }
                        : {
                            fontFamily: el,
                          }
                    }
                  >
                    {el}
                  </button>
                </li>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default ThemeToggler;
