import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

function ColoursForm(props) {
  const [input, setInput] = useState("");
  const [isActive, setActive] = useState(false);

  const handleInput = (event) => {
    let val = event.target.value;

    if (val.length > 0 && !val.match(/^#/)) {
      val = "#" + val;
    }
    setInput(val.toUpperCase());
  };

  return (
    <form
      className="user-colours"
      onSubmit={(event) => {
        props.handleSubmit(event, input);
        setActive(false);
        setInput("");
      }}
    >
      {isActive ? (
        <div className="colour-input">
          <div>
            <input
              type="text"
              id="new-colour-text"
              value={input}
              onChange={handleInput}
              size="15"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "1em",
              }}
            />
            <button
              id="new-item-add"
              type="submit"
              value="submit"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "1em",
              }}
            >
              <IoAdd />
            </button>
          </div>
          <label for="new-colour-text">
            try #FFB7C5 or cherry blossom pink
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
