import { useState, useEffect } from "react";
import { themes } from "../../themes";
import { fonts, fontSizes } from "../../fonts";
import styles from "./Settings.module.css";
import "../../animations.css";
import ThemeToggler from "../../components/ThemeToggler/ThemeToggler";
import FontToggler from "../../components/FontToggler/FontToggler";
import { CSSTransition } from "react-transition-group";
import image from "../../images/settingsImage.png";
function Settings() {
  const [activeTheme, setActiveTheme] = useState(themes.default);
  const [visible, setVisible] = useState(false);
  const [fontVisible, setFontVisible] = useState(false);
  const [activeFont, setActiveFont] = useState(fonts.default);
  const [fontSizeVisible, setFontSizeVisible] = useState(false);
  const [activeFontSize, setActiveFontSize] = useState(fonts.default);

  useEffect(() => {
    if (localStorage.getItem("activeTheme")) {
      setActiveTheme(JSON.parse(localStorage.getItem("activeTheme")));
      document.querySelector("html").className = JSON.parse(
        localStorage.getItem("activeTheme")
      );
    } else {
      setActiveTheme("default");
      localStorage.setItem("activeTheme", JSON.stringify("default"));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("activeFont")) {
      setActiveFont(JSON.parse(localStorage.getItem("activeFont")));
      document.querySelector("html").style.fontFamily = JSON.parse(
        localStorage.getItem("activeFont")
      );
    } else {
      setActiveFont("Lato");
      localStorage.setItem("activeFont", JSON.stringify("Lato"));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("activeFontSize")) {
      setActiveFontSize(JSON.parse(localStorage.getItem("activeFontSize")));
      document.querySelector("html").style.fontSize = JSON.parse(
        localStorage.getItem("activeFontSize")
      );
    } else {
      setActiveFontSize(16);
      localStorage.setItem("activeFontSize", JSON.stringify(16));
    }
  }, []);
  function handleThemeChange(newTheme) {
    setActiveTheme(newTheme);
    localStorage.setItem("activeTheme", JSON.stringify(newTheme));
    document.querySelector("html").className = newTheme;
    setVisible(false);
  }
  function handleFontChange(newFont) {
    setActiveFont(newFont);
    document.querySelector("html").style.fontFamily = newFont;
    localStorage.setItem("activeFont", JSON.stringify(newFont));
    setFontVisible(false);
  }
  function handleFontSizeChange(newFontSize) {
    setActiveFontSize(newFontSize);
    document.querySelector("html").style.fontSize = newFontSize + "px";
    localStorage.setItem("activeFontSize", JSON.stringify(newFontSize + "px"));
    setFontSizeVisible(false);
  }

  function toggleThemesVisible() {
    setVisible((prevState) => !prevState);
  }
  function toggleFontsVisible() {
    setFontVisible((prevState) => !prevState);
  }
  function toggleFontSizesVisible() {
    setFontSizeVisible((prevState) => !prevState);
  }
  return (
    <>
      <h1>Settings</h1>
      <div className={styles.line} />
      <h3 className={styles.subtitle}>Theme</h3>
      <CSSTransition classNames="fade" timeout={250} in={visible}>
        <ThemeToggler
          activeTheme={activeTheme}
          visible={visible}
          handleThemeChange={handleThemeChange}
          toggleThemesVisible={toggleThemesVisible}
          themes={themes}
        />
      </CSSTransition>
      <h3 className={styles.subtitle}>Font</h3>
      <h4 className={styles.subSubtitle}>Font</h4>
      <CSSTransition classNames="fade" timeout={250} in={fontVisible}>
        <FontToggler
          activeFont={activeFont}
          visible={fontVisible}
          handleFontChange={handleFontChange}
          toggleFontsVisible={toggleFontsVisible}
          fonts={fonts}
        />
      </CSSTransition>
      <h4 className={styles.subSubtitle}>Size</h4>
      <CSSTransition classNames="fade" timeout={250} in={fontSizeVisible}>
        <FontToggler
          activeFont={activeFontSize}
          visible={fontSizeVisible}
          handleFontChange={handleFontSizeChange}
          toggleFontsVisible={toggleFontSizesVisible}
          fonts={fontSizes}
        />
      </CSSTransition>
      <img className={styles.img} src={image} alt="settingsImg" />
    </>
  );
}

export default Settings;
