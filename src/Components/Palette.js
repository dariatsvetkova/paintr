function Palette(props) {
  const { primary, accent1, accent2, white, light, dark } = props.colourSet;

  return (
    <div className="palette">
      <div
        className="colour primary"
        style={{ color: `${primary[1]}`, backgroundColor: `${primary.colour}` }}
      ></div>

      <div
        className="colour accent1"
        style={{ color: `${accent1[1]}`, backgroundColor: `${accent1.colour}` }}
      ></div>

      {accent2.length > 0 && (
        <div
          className="colour accent2"
          style={{
            color: `${accent2[1]}`,
            backgroundColor: `${accent2.colour}`,
          }}
        ></div>
      )}

      <div
        className="colour white"
        style={{ backgroundColor: `${white}` }}
      ></div>

      <div
        className="colour light"
        style={{ backgroundColor: `${light}` }}
      ></div>

      <div
        className="colour dark"
        style={{ color: `${white}`, backgroundColor: `${dark}` }}
      ></div>
    </div>
  );
}

export default Palette;
