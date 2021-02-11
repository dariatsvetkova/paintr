import Logo from "./Logo.js";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <a href="#">
        <Logo fill="#FFFFFF" />
      </a>
      <small>
        <a href="https://dariatsvetkova.ca/" rel="noreferrer" target="_blank">
          &copy; Daria Tsvetkova 2021
        </a>
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
