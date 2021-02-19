import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { IoMenu } from "react-icons/io5";

function Mockup(props) {
  const { primary, accent1, accent2, white, light, dark } = props.colourSet;

  // Store/access previous primary colour value to use in the loading animation:
  function usePrev(value) {
    const prev = useRef();
    useEffect(() => {
      prev.current = value;
    });
    return prev.current;
  }

  const [fill, setFill] = useState(false);
  const prevFill = usePrev(primary.colour);

  useEffect(() => {
    setFill(
      prevFill,
      setTimeout(() => setFill(primary.colour), 1500)
    );
  }, [props.colourSet]);

  // If the value of "dark" colour is greater than "white" colour, it means the colours have been swapped and we're in dark mode:
  const darkMode = parseInt(dark.slice(1), 16) > parseInt(white.slice(1), 16);

  const hover = (e, col, prop) => {
    const el = e.target;
    prop = prop || "color";
    el.style[prop] = col;
  };

  // Assign colours to menu items based on their contrast with the current background:
  let menuItems = ["Home", "About", "Products", "Contact"];
  menuItems = menuItems.map((el, i) => {
    return el === "Home" ? (
      <li
        key={`menu-${i}`}
        style={{
          color: accent1.pairs.includes(white)
            ? accent1.colour
            : accent1.pairs[0],
          backgroundColor: accent1.pairs.includes(white)
            ? white
            : accent1.colour,
        }}
      >
        {el}
      </li>
    ) : (
      <li
        key={`menu-${i}`}
        style={{ color: dark }}
        onMouseOver={(event) => hover(event, accent1.colour)}
        onMouseLeave={(event) => hover(event, dark)}
      >
        {el}
      </li>
    );
  });

  // Assign colours to links based on their contrast with the current background:
  const linkStyles = darkMode
    ? {
        color: accent1.pairs.includes(light)
          ? accent1.colour
          : accent2.pairs.length > 0 && accent2.pairs.includes(light)
          ? accent2.colour
          : primary.pairs.includes(light)
          ? primary.colour
          : white,
      }
    : {
        color: accent1.pairs.includes(white)
          ? accent1.colour
          : accent2.pairs.length > 0 && accent2.pairs.includes(white)
          ? accent2.colour
          : primary.pairs.includes(white)
          ? primary.colour
          : dark,
      };

  // Assign styles to the "benefits" based on the current background:
  const pillarStyle = {
    color: `${darkMode ? white : dark}`,
    backgroundColor: `${darkMode ? light : white}`,
    boxShadow: `2px 2px 5px ${darkMode ? "#7c7c7c" : "#c0c0c0"}`,
  };

  return (
    <div
      className={`mockup ${
        accent1.colour.length === 0 ? "mockup-inactive" : ""
      }`}
      style={{
        color: dark,
        backgroundColor: `${darkMode ? white : light}`,
      }}
    >
      {props.isLoading && (
        <div className="animated-logo">
          <Logo fill={fill} class="logo-letters" />
          <div className="animated-eraser"></div>
          <Logo fill="" class="logo-roller" />
        </div>
      )}
      <div className="navbar" style={{ background: white }}>
        <svg
          className="demo-logo"
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill={dark}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="12" r="11.5" />
          <path
            d="M3.00002 12.5999C3.00002 12.5999 6.20001 10.5999 8.60001 10.5999C11 10.5999 12.2 10.9999 15 12.5999C17.8 14.1999 17.8 14.5999 21 14.5999C24.2 14.5999 27 12.5999 27 12.5999"
            stroke={white}
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>

        <div className="hamburger">
          <IoMenu />
        </div>

        <ul className="menu-items">{menuItems}</ul>
      </div>

      <div className="header" style={{ backgroundColor: primary.colour }}>
        <div className="text" style={{ color: primary.pairs[0] }}>
          <p className="h1">Transform your brand with color</p>
          <p className="subheading">Choose from as many as 360 hues</p>
          <button
            className="button"
            style={{
              backgroundColor: accent1.colour,
              color: accent1.pairs[0],
            }}
            onMouseOver={(event) =>
              hover(event, accent1.pairs[0], "borderColor")
            }
            onMouseLeave={(event) => hover(event, "transparent", "borderColor")}
          >
            Find my colors!
          </button>
        </div>
        <svg
          className="image"
          width="209"
          height="163"
          viewBox="0 0 209 163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="line"
            d="M9.1366 87.2065C9.1366 87.2065 21.1366 79.7065 30.1366 79.7065C39.1366 79.7065 43.6366 81.2065 54.1366 87.2065C64.6366 93.2065 64.6366 94.7065 76.6366 94.7065C88.6366 94.7065 99.1366 87.2065 99.1366 87.2065"
            stroke={dark}
            strokeWidth="12"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <circle
            className="circle"
            fill={accent1.colour}
            cx="123"
            cy="50"
            r="50"
          />
          <path
            className="triangle"
            fill={accent2.colour.length > 0 ? accent2.colour : light}
            d="M209 113L134 156.301V69.6987L209 113Z"
          />
          <path
            className="line"
            d="M9 57.5C9 57.5 21 50 30 50C39 50 43.5 51.5 54 57.5C64.5 63.5 64.5 65 76.5 65C88.5 65 99 57.5 99 57.5"
            stroke={dark}
            strokeWidth="12"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="section">
        <p className="h2">Why use color</p>
        <ul className="benefits">
          <li key="benefit-1" className="pillar" style={pillarStyle}>
            <div className="icon">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="circle-icon"
                  fill={primary.colour}
                  stroke={`${darkMode ? white : dark}`}
                  cx="12.5"
                  cy="12.5"
                  r="11.5"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="benefit">Brand recognition</p>
            <p>
              <b className="a" style={linkStyles}>
                Research
              </b>{" "}
              has shown that adding a signature color to your branding can
              increase brand recognition by 80%, compared to designs done in
              grayscale.
            </p>
          </li>
          <li key="benefit-2" className="pillar" style={pillarStyle}>
            <div className="icon">
              <svg
                width="38"
                height="25"
                viewBox="0 0 38 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="waves-icon-back"
                  d="M5.1366 18.9565C5.1366 18.9565 8.7366 16.7065 11.4366 16.7065C14.1366 16.7065 15.4866 17.1565 18.6366 18.9565C21.7866 20.7565 21.7866 21.2065 25.3866 21.2065C28.9866 21.2065 32.1366 18.9565 32.1366 18.9565"
                  stroke={`${darkMode ? white : dark}`}
                  strokeWidth="7"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  className="waves-icon-back"
                  d="M5 6.25C5 6.25 8.6 4 11.3 4C14 4 15.35 4.45 18.5 6.25C21.65 8.05 21.65 8.5 25.25 8.5C28.85 8.5 32 6.25 32 6.25"
                  stroke={`${darkMode ? white : dark}`}
                  strokeWidth="7"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  className="waves-icon-front-2"
                  d="M5.1366 18.9565C5.1366 18.9565 8.7366 16.7065 11.4366 16.7065C14.1366 16.7065 15.4866 17.1565 18.6366 18.9565C21.7866 20.7565 21.7866 21.2065 25.3866 21.2065C28.9866 21.2065 32.1366 18.9565 32.1366 18.9565"
                  stroke={accent1.colour}
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  className="waves-icon-front-1"
                  d="M5 6.25C5 6.25 8.6 4 11.3 4C14 4 15.35 4.45 18.5 6.25C21.65 8.05 21.65 8.5 25.25 8.5C28.85 8.5 32 6.25 32 6.25"
                  stroke={primary.colour}
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="benefit">Instant communication</p>
            <p>
              Color has the ability to trigger certain emotions instantaneously.
              The{" "}
              <b className="a" style={linkStyles}>
                feelings
              </b>{" "}
              associated with different colors play an important role in snap
              judgements.
            </p>
          </li>
          <li key="benefit-3" className="pillar" style={pillarStyle}>
            <div className="icon">
              <svg
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="triangle-icon"
                  d="M1.25 2.40673L17 11.5L1.25 20.5933V2.40673Z"
                  fill={primary.colour}
                  stroke={`${darkMode ? white : dark}`}
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="benefit">Information hierarchy</p>
            <p>
              Harmonious color combinations help establish a sense of order and
              guide the user’s{" "}
              <b className="a" style={linkStyles}>
                attention
              </b>{" "}
              towards the most important information on the page.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Mockup;
