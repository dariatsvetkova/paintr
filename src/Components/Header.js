import Logo from "./Logo";
import Background from "../background.svg";

function Header() {
  return (
    <header id="home">
      <Logo fill={false} class="" />
      <div className="text">
        <h1>The easiest way to choose the right website colors</h1>
        <h2>
          Explore color schemes, see how they look on a website and simply copy
          the code for your project
        </h2>
        <a href="#generate">
          <button className="large-button">Start</button>
        </a>
      </div>
      <div className="background">
        <img src={Background} alt="" />
      </div>
    </header>
  );
}

export default Header;
