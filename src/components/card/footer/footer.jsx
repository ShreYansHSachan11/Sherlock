import './footer.css';
import address from '../../../assets/address.png';
import phone from '../../../assets/mobile.png';
import gmail from '../../../assets/gmail.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-main-row">
          <div className="footer-brand">
            <h2>HIDE</h2>
          </div>

          <div className="footer-divider" />

          <div className="footer-contact-item">
            <img src={address} alt="Address" />
            <div>
              <h5>Address</h5>
              <p>Karnataka state police, bengaluru</p>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-contact-item">
            <img src={phone} alt="Phone" />
            <div>
              <h5>Phone</h5>
              <p>+(91) 9305115074</p>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-contact-item">
            <img src={gmail} alt="Email" />
            <div>
              <h5>Email</h5>
              <a href="mailto:sherlock@gmail.com">sherlock@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="footer-socials">
          <a href="#!" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
          <a href="#!" aria-label="Google"><i className="fa fa-google"></i></a>
          <a href="#!" aria-label="Instagram"><i className="fa fa-instagram"></i></a>
        </div>

      </div>
      <div className="footer-bar">
        sherlock © 2024 All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
