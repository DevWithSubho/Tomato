import { assets } from "../../assets/frontend_assets/assets";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Tomato is a modern online food ordering platform that lets users discover nearby restaurants, place orders easily, and get fresh food delivered right to their doorstep with a smooth and secure experience.
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-centre">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivary</li>
            <li>privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+88-67-77-900</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright © 2026 - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
