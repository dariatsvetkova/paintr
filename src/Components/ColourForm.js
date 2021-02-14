import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import ColourNames from "./ColourNames.json"; // From https://github.com/meodai/color-names/blob/master/src/colornames.csv
import hexToHsl from "./hexToHsl";

function ColoursForm(props) {
  const [input, setInput] = useState("");
  const [isActive, setActive] = useState(false);
  const [error, setError] = useState(false);

  const handleInput = (event) => {
    let val = event.target.value;
    setInput(val);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let val = input.toUpperCase();
    if (ColourNames[val]) {
      val = ColourNames[val]; // If a colour name was provided, replace it with its hex value
    }
    if (val.match(/^(#|)[0-9A-F]{3}$/)) {
      val = val[0] + val[1] + val[1] + val[2] + val[2] + val[3] + val[3]; // Convert #rgb values to #rrggbb values
    }

    try {
      if (val.match(/^(#|)[0-9A-F]{6}$/)) {
        val = val[0] === "#" ? hexToHsl(val) : hexToHsl("#" + val);
        props.handleAdd(val);
        setActive(false);
        setInput("");
      } else {
        throw new Error("Invalid colour name");
      }
    } catch (e) {
      setError(true);
      console.log("Error in colour validation: ", e);
    }
  };

  return (
    <form className="user-colours" onSubmit={handleSubmit}>
      {isActive ? (
        <div className="colour-input">
          <div>
            <input
              className={error ? "input-error" : null}
              type="text"
              id="new-colour-text"
              value={input}
              onChange={handleInput}
              size="15"
            />
            <button id="new-item-add" type="submit" value="submit">
              <IoAdd />
            </button>
          </div>
          <label className={error ? "label-error" : null} for="new-colour-text">
            {error ? "invalid color name" : "try #77B5FE or French sky blue"}
          </label>
        </div>
      ) : (
        <div className="colour-prompt" onClick={() => setActive(true)}>
          <p>Add a color</p>
          <button
            onClick={() => {
              console.log("button clicked");
            }}
          >
            <IoAdd />
          </button>
        </div>
      )}
    </form>
  );
}

export default ColoursForm;
