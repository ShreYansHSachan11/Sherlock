import { useEffect, useRef } from "react";
import { BrowserRouter as Router, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "./homepage.css";
import Features from "../src/components/features/features";
import anonymize from "../src/assets/demo2.svg";
import cardimg from "../src/assets/hero.jpeg";
import hero1 from "../src/assets/p1.svg";
import hero2 from "../src/assets/p2.svg";
import hero3 from "../src/assets/p3.svg";
import Footer from "./components/card/footer/footer";

const WelcomeSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const role = sessionStorage.getItem('role');
    if (role === 'nopolice') {
      navigate('/nonpolicedashboard');
    } else {
      navigate('/anonymize');
    }
  };

  return (
    <>
      <div className="homepage-contain">
        <header id="home-hero" className="home-hero">
          <section className="hero-header-contain">
            <div className="hero-leftSection">
              <div className="content-text">
                <h2>Data Privacy for Law Enforcement</h2>
                <p>
                  Discover our advanced tools and frameworks for anonymizing
                  sensitive data and ensuring compliance with privacy
                  regulations.
                </p>
              </div>
              <button className="hero-btn" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </section>
        </header>
        <div className="whyus">
          <h2>Our Features</h2>
          <div className="whyus-box">
            <div className="whyus-card">
              <img src={hero2} alt="" />
              <h6>Selective Anonymization</h6>
              <p>
              Selective Anonymization allows users to anonymize specific data within a document or image. This feature ensures sensitive information is masked while preserving the overall context.
              </p>
            </div>
            <div className="whyus-card">
              <img src={hero1} alt="" />
              <h6>3rd Party Sharing</h6>
              <p>
              3rd Party Sharing allows secure sharing of anonymized data with external parties, ensuring privacy and compliance.              </p>
            </div>
            <div className="whyus-card">
              <img src={hero3} alt="" />
              <h6>Authorised De-anonymization</h6>
              <p>
              Authorized De-anonymization ensures only verified users can revert data to its original form, maintaining security and control over sensitive information.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WelcomeSection;
