import Logo from "./Logo";
import Background from "../background.svg";

function Header() {
  return (
    <header>
      <div>
        <Logo fill={false} />
        <div className="text">
          <h1>The easiest way to choose the right website colors</h1>
          <h2>
            Explore color schemes, see how they look on a website and simply
            copy the code for your project
          </h2>
          <a href="#generate">
            <button className="large-button">Start</button>
          </a>
        </div>
      </div>
      <img className="background" src={Background} alt="" />
    </header>
  );
}

export default Header;
