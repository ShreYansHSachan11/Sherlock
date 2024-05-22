import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './footer.css';
import address from '../../../assets/address.png'
import phone from '../../../assets/mobile.png'
import gmail from '../../../assets/gmail.png'

const Footer = () => {
  return (
    <>
      <footer className="footer-main bg-dark ">
        <div className="container">
          <div className="row address-main">
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src={address} alt="Address Icon" />
                </div>
                <div className="add-content">
                  <h5>Address</h5>
                  <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem illum suscipit libero at quia ad.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src={phone} alt="Phone Icon" />
                </div>
                <div className="add-content">
                  <h5>Phone</h5>
                  <p>
                    +(91) 9305115074 <br />
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src={gmail} alt="Email Icon" />
                </div>
                <div className="add-content">
                  <h5>Email</h5>
                  <p>
                    <a href="mailto:collab@codewithfaraz.com" style={{ textDecoration: 'none' }}>
                      sherlock@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            

            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fa fa-twitter"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fa fa-google"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fa fa-instagram"></i>
            </a>
          </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          sherlock © 2024 All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
