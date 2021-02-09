import Logo from "./Logo.js";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <Logo fill="#FFFFFF" />
      <small>
        <span>&copy; </span>
        <a href="https://dariatsvetkova.ca/" rel="noreferrer" target="_blank">
          Daria Tsvetkova
        </a>
        <span> 2021</span>
      </small>
      <div className="social-icons">
        <FaFacebookSquare />
        <FaTwitterSquare />
        <FaPinterestSquare />
      </div>
    </footer>
  );
}

export default Footer;
