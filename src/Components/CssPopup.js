import React, { useState, useEffect } from "react";
import CssText from "./CssText";
import { IoClose, IoCopyOutline } from "react-icons/io5";

function CssPopup(props) {
  const [activeTab, setActiveTab] = useState("values");

  useEffect(() => {
    function handleClose(e) {
      const popup = document.querySelector(".popup-card"),
        closeButton = document.querySelector(".popup-close-button");

      return (
        (!popup.contains(e.target) || closeButton.contains(e.target)) &&
        props.handleCopy()
      );
    }
    document.addEventListener("click", handleClose, false);
    return () => document.removeEventListener("click", handleClose, false);
  });

  const { primary, accent1, accent2, white, light, dark } = props.colourSet;

  const copyData = (e) => {
    e.preventDefault();
    console.log("copying data");
  };

  return (
    <section className="popup-card">
      <div className="instructions">
        <p>
          Copy HEX values to use in your project or the CSS code that assigns
          colors to common HTML elements
        </p>
      </div>
      <nav className="popup-nav">
        <div
          className={`popup-tab-name ${
            activeTab === "values" ? "popup-tab-active" : ""
          }`}
          onClick={() => setActiveTab("values")}
        >
          <p>Color Values</p>
        </div>
        <div
          className={`popup-tab-name ${
            activeTab === "css" ? "popup-tab-active" : ""
          }`}
          onClick={() => setActiveTab("css")}
        >
          <p>CSS</p>
        </div>
        <button className="popup-close-button">
          <IoClose />
        </button>
      </nav>

      {activeTab === "values" && (
        <div className="popup-values">
          <form>
            <div className="popup-values-line">
              <div
                className="rect"
                style={{ backgroundColor: `${primary.colour}` }}
              ></div>
              <label for="popup-primary">Primary color:</label>
              <input
                id="popup-primary"
                value={primary.colour}
                size="8"
                data-clipboard-target="#popup-primary"
                rows="1"
                readOnly={true}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button onClick={copyData}>
                <IoCopyOutline />
              </button>
            </div>

            <div className="popup-values-line">
              <div
                className="rect"
                style={{ backgroundColor: `${accent1.colour}` }}
              ></div>
              <label for="popup-accent1">
                {`Accent color${accent2.colour.length > 0 ? " 1" : ""}:`}
              </label>
              <input
                id="popup-accent1"
                value={accent1.colour}
                size="8"
                data-clipboard-target="#popup-accent1"
                readOnly={true}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button onClick={copyData}>
                <IoCopyOutline />
              </button>
            </div>

            {accent2.colour.length > 0 && (
              <div className="popup-values-line">
                <div
                  className="rect"
                  style={{ backgroundColor: `${accent2.colour}` }}
                ></div>
                <label for="popup-accent2">Accent color 2:</label>
                <input
                  id="popup-accent2"
                  value={accent2.colour}
                  size="8"
                  data-clipboard-target="#popup-accent2"
                  readOnly={true}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button onClick={copyData}>
                  <IoCopyOutline />
                </button>
              </div>
            )}

            <div className="popup-values-line">
              <div
                className="rect"
                style={{ backgroundColor: `${white}` }}
              ></div>
              <label for="popup-white">Background color:</label>
              <input
                id="popup-white"
                value={white}
                size="8"
                data-clipboard-target="#popup-white"
                readOnly={true}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button onClick={copyData}>
                <IoCopyOutline />
              </button>
            </div>

            <div className="popup-values-line">
              <div
                className="rect"
                style={{ backgroundColor: `${light}` }}
              ></div>
              <label for="popup-light">Grey color:</label>
              <input
                id="popup-light"
                value={light}
                size="8"
                data-clipboard-target="#popup-light"
                readOnly={true}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button onClick={copyData}>
                <IoCopyOutline />
              </button>
            </div>

            <div className="popup-values-line">
              <div
                className="rect"
                style={{ backgroundColor: `${dark}` }}
              ></div>
              <label for="popup-white">Text color:</label>
              <input
                id="popup-dark"
                value={dark}
                size="8"
                data-clipboard-target="#popup-dark"
                readOnly={true}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button onClick={copyData}>
                <IoCopyOutline />
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "css" && (
        <div className="popup-css">
          <form className="popup-css-form">
            <CssText colourSet={props.colourSet} />
          </form>
          <button onClick={copyData}>
            <IoCopyOutline />
          </button>
        </div>
      )}
    </section>
  );
}

export default CssPopup;
