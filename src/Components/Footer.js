import Logo from '../logo.svg';
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <img className="logo" src={Logo} alt="Paintr logo" />
            <small>
                <span>&copy; </span>
                <a href="https://dariatsvetkova.ca/" rel="noreferrer" target="_blank">Daria Tsvetkova</a>
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