import React from 'react';
import './Palette.css';

function Palette(props) {
  const {primary, accent1, accent2, white, light, dark} = props.colourSet;

  return (
    <div className={`palette ${props.isLoading ? 'palette-inactive' : ''}`}>
      {!props.isLoading && (
        <>
          <div
            className="colour primary"
            style={{backgroundColor: `${primary.colour}`}}
          />

          <div
            className="colour accent1"
            style={{backgroundColor: `${accent1.colour}`}}
          />

          {accent2.colour.length > 0 && (
            <div
              className="colour accent2"
              style={{backgroundColor: `${accent2.colour}`}}
            />
          )}

          <div
            className="colour white"
            style={{backgroundColor: `${white}`}}
          />

          <div
            className="colour light"
            style={{backgroundColor: `${light}`}}
          />

          <div
            className="colour dark"
            style={{backgroundColor: `${dark}`}}
          />
        </>
      )}
    </div>
  );
}

export default Palette;
