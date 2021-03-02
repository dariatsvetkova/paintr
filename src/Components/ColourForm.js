import React, {useState, useEffect} from 'react';
import namedColors from 'color-name-list'; // https://github.com/meodai/color-names
import {IoAdd} from 'react-icons/io5';
import hexToHsl from './hexToHsl';

function ColoursForm(props) {
  const [input, setInput] = useState('');
  const [isActive, setActive] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleClose(e) {
      if (!isActive) return;
      const field = document.querySelector('.colour-input');

      return !field.contains(e.target) && setActive(false);
    }
    document.addEventListener('click', handleClose, false);
    return () => document.removeEventListener('click', handleClose, false);
  });

  const handleInput = (event) => {
    const val = event.target.value;
    setInput(val);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let val = input;

    // If a colour name was provided, replace it with its hex value:
    if (val.match(/^[a-z\s-]+$/i)) {
      let words = val.split(' ');
      words = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      words = words.join(' ');

      const test = namedColors.find((color) => color.name === words);
      if (test) {
        val = test.hex;
      }
    }
    val = val.charAt(0) === '#' ? val.toUpperCase() : '#' + val.toUpperCase();

    if (val.match(/^(#|)[0-9A-F]{3}$/)) {
      // Convert #rgb values to #rrggbb values
      val = val[0] + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];
    }

    try {
      if (val.match(/^(#|)[0-9A-F]{6}$/)) {
        // Convert hex from user input into hsl for generating the palette
        val = hexToHsl(val);
        props.handleAdd(val);
        setActive(false);
        setInput('');
      } else {
        throw new Error('Invalid colour name');
      }
    } catch (e) {
      setError(true);
      console.log('Error in colour validation: ', e);
    }
  };

  return (
    <form className="user-colours" onSubmit={handleSubmit}>
      {isActive ? (
        <div className="colour-input">
          <div>
            <input
              className={error ? 'input-error' : null}
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
          <label
            className={error ? 'label-error' : null}
            htmlFor="new-colour-text"
          >
            {error ? 'invalid color name' : 'try #77B5FE or French sky blue'}
          </label>
        </div>
      ) : (
        <div className="colour-prompt" onClick={() => setActive(true)}>
          <p>Add a color</p>
          <button onClick={() => setActive(true)}>
            <IoAdd />
          </button>
        </div>
      )}
    </form>
  );
}

export default ColoursForm;
