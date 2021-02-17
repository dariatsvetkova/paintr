import React, { useState } from "react";
import CopyButton from "./CopyButton";

function ValueText(props) {
  const [copySuccess, setCopySuccess] = useState(false);

  let title = "";
  switch (props.id) {
    case "primary":
      title = "Primary color:";
      break;
    case "accent1":
      title = "Accent color:";
      break;
    case "accent2":
      title = "Accent color 2:";
      break;
    case "white":
      title = "Background color:";
      break;
    case "light":
      title = "Grey color:";
      break;
    case "dark":
      title = "Text color:";
      break;
    default:
      return null;
  }

  let id = `popup-${props.id}`;

  return (
    <div className="popup-values-line">
      <div className="rect" style={{ backgroundColor: `${props.col}` }}></div>
      <label for={props.id}>{title}</label>
      <input
        id={id}
        value={props.col}
        size="8"
        rows="1"
        readOnly={true}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="popup-btn-container">
        <CopyButton
          id={id}
          copyData={props.copyData}
          callback={setCopySuccess}
        />
        {copySuccess && (
          <p className="popup-copy-success">Copied to clipboard</p>
        )}
      </div>
    </div>
  );
}

export default ValueText;
