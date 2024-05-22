import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./homepage.css";
import Features from "../src/components/features/features";
import anonymize from "../src/assets/demo2.svg";
import cardimg from "../src/assets/hero.jpeg";
import hero1 from "../src/assets/home3.svg";
import hero2 from "../src/assets/home4.svg";
import hero3 from "../src/assets/home5.svg";
import Footer from "./components/card/footer/footer";

const WelcomeSection = () => {
  return (
    <>
      <div className="homepage-contain">
        <header id="home-hero" className="home-hero">
          <section class="hero-header-contain">
            <div className="hero-leftSection">
              <div class="content-text">
                {/* <h2>Building digital</h2> */}
                <h2>Data Privacy for Law Enforcement</h2>

                <p>
                  Discover our advanced tools and frameworks for anonymizing
                  sensitive data and ensuring compliance with privacy
                  regulations.
                </p>
              </div>
              <button className="hero-btn">
                <NavLink to="/anonymize">Get Started</NavLink>
              </button>
            </div>
          </section>
        </header>
        {/* <div className="domain">
      <h3>Our Features</h3>
    <section class="features-grid">
  

  <article class="features-group">
    <div class="features-image">
      <img src={hero1} alt="Illustration of a man touching a large check icon"/>
       
    </div>
    <div class="features-text">
      <h2>Selective Text Anonymization in Documents</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
  <article class="features-group">
    <div class="features-image inverse">
      <img src={hero2} alt="Illustration of a woman standing next to a screen with portfolio items"/>
    </div>
    <div class="features-text">
      <h2>Image Recognition and Selective Blurring</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
  <article class="features-group">
    <div class="features-image">
      <img src={hero3} alt="Illustration of a man in a suit pointing to a bar chart that is going up"/>
    </div>
    <div class="features-text">
      <h2>Face Blurring in  Videos</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
 
</section>
</div> */}
        <div className="whyus">
          <h2>Our Features</h2>
          <div className="whyus-box">
            <div className="whyus-card">
              <img src={hero1} alt="" />
              <h6>Selective Anonymization</h6>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing
              </p>
            </div>
            <div className="whyus-card">
              <img src={hero2} alt="" />
              <h6>3rd Party Sharing</h6>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing
              </p>
            </div>
            <div className="whyus-card">
              <img src={hero3} alt="" />
              <h6>Authorised De-anonymization</h6>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing
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
