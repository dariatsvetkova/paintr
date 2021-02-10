import React, { useState, useEffect } from "react";
import Logo from "./Logo.js";

function AnimatedLogo(props) {
  const [fill, setFill] = useState();

  useEffect(() => {
    setTimeout(() => setFill(props.primary), 2000);
  }, [props.primary]);

  return (
    <div className="animated-logo">
      <Logo fill={fill} />
    </div>
  );
}

export default AnimatedLogo;
