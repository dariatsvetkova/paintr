import Logo from "./Logo.js";

function AnimatedLogo(props) {
  return (
    <div className="animated-logo">
      <Logo fill={props.primary} />
    </div>
  );
}

export default AnimatedLogo;
