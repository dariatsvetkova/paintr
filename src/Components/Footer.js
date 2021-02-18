import Logo from "./Logo.js";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
} from "react-icons/fa";

function Footer() {
  const text = encodeURIComponent(
      "Check out Paintr, a web app that generates color schemes for websites!"
    ),
    url = "https://paintr.io/";

  return (
    <footer>
      <a href="#home">
        <Logo fill="#FFFFFF" class="" />
      </a>
      <small>
        <a href="https://dariatsvetkova.ca/" rel="noreferrer" target="_blank">
          &copy; Daria Tsvetkova 2021
        </a>
      </small>
      <div className="social-icons">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noreferrer"
          title="Share on Facebook"
        >
          <FaFacebookSquare />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
          target="_blank"
          rel="noreferrer"
          title="Tweet"
        >
          <FaTwitterSquare />
        </a>
        <a
          href="https://www.pinterest.com/pin/create/button/"
          data-pin-do="buttonBookmark"
          data-pin-custom="true"
          target="_blank"
          rel="noreferrer"
          title="Pin"
        >
          <FaPinterestSquare />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
