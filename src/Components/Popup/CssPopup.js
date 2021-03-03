import React, {useState, useEffect} from 'react';
import './Popup.css';
import ValueText from './ValueText';
import CssText from './CssText';
import {IoClose} from 'react-icons/io5';

function CssPopup(props) {
  const [activeTab, setActiveTab] = useState('values');

  useEffect(() => {
    function handleClose(e) {
      const popup = document.querySelector('.popup-card');
      const closeButton = document.querySelector('.popup-close-button');

      return (
        (!popup.contains(e.target) || closeButton.contains(e.target)) &&
        setTimeout(() => props.handleCopy(), 300) &&
        popup.classList.add('disappear')
      );
    }
    document.addEventListener('click', handleClose, false);
    return () => document.removeEventListener('click', handleClose, false);
  });

  const copyData = (e, id, callback) => {
    e.preventDefault();
    const el = document.getElementById(id);
    navigator.clipboard.writeText(el.value).then(callback());
  };

  const valueList = [];

  for (const key in props.colourSet) {
    if (props.colourSet.hasOwnProperty(key)) {
      (key === 'primary' || key === 'accent1' || key === 'accent2') &&
      props.colourSet[key].colour.length > 0 ?
        valueList.push(
            <ValueText
              col={props.colourSet[key].colour}
              id={key}
              copyData={copyData}
            />,
        ) :
        (key === 'white' || key === 'light' || key === 'dark') &&
          valueList.push(
              <ValueText
                col={props.colourSet[key]}
                id={key}
                copyData={copyData}
              />,
          );
    }
  }

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
            activeTab === 'values' ? 'popup-tab-active' : ''
          }`}
          onClick={() => setActiveTab('values')}
        >
          <p>Color Values</p>
        </div>
        <div
          className={`popup-tab-name ${
            activeTab === 'css' ? 'popup-tab-active' : ''
          }`}
          onClick={() => setActiveTab('css')}
        >
          <p>CSS</p>
        </div>
        <button className="popup-close-button">
          <IoClose />
        </button>
      </nav>

      {activeTab === 'values' && (
        <div className="popup-values">
          <form>{valueList}</form>
        </div>
      )}

      {activeTab === 'css' && (
        <div className="popup-css">
          <form className="popup-css-form">
            <CssText colourSet={props.colourSet} copyData={copyData} />
          </form>
        </div>
      )}
    </section>
  );
}

export default CssPopup;
