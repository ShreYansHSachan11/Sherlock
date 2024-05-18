import { useEffect, useRef } from 'react'
import './homepage.css'
import Features from '../src/components/features/features'
import anonymize from '../src/assets/demo2.svg';
import cardimg from '../src/assets/hero.jpeg'

const WelcomeSection = () => {
  

  return (   
    <>

    <div className="homepage-contain">
    <header id="home-hero" className='home-hero'>
      
      <section class="hero-header-container">
        
       
       <div className="hero-leftSection">
       <div class="content-text">
          {/* <h2>Building digital</h2> */}
          <h2>Data Privacy for Law Enforcement</h2>
            
          <p>
          Discover our advanced tools and frameworks for anonymizing sensitive data and ensuring compliance with privacy regulations.
          </p>
        </div>
        <button className="hero-btn">
        <a
          href="https://github.com/CommunityPro/portfolio-html"
          class="btn btn-secondary"
          target="_blank"
          >Get Started</a
        >
        </button>
       </div>

       <div className="hero-rightSection">
        {/* <img src="src\assets\folder.png" alt="" srcset="" /> */}
       </div>
        
      </section>
       

     


    </header>
    <div className="domain">
      <h3>Our Features</h3>
    <section class="features-grid">
  

  <article class="features-group">
    <div class="features-image">
      <img src="./src/assets/home3.svg" alt="Illustration of a man touching a large check icon"/>
       
    </div>
    <div class="features-text">
      <h2>Selective Text Anonymization in Documents</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
  <article class="features-group">
    <div class="features-image inverse">
      <img src="./src/assets/home4.svg" alt="Illustration of a woman standing next to a screen with portfolio items"/>
    </div>
    <div class="features-text">
      <h2>Image Recognition and Selective Blurring</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
  <article class="features-group">
    <div class="features-image">
      <img src="./src/assets/home5.svg" alt="Illustration of a man in a suit pointing to a bar chart that is going up"/>
    </div>
    <div class="features-text">
      <h2>Face Blurring in  Videos</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis totam repellat ea fuga officia ipsa, mollitia odit reprehenderit.</p>
    </div>
  </article>
  
  
 
</section>
</div>
<div className="whyus">
<h2>Why Choose Us?</h2>
<div className="whyus-box">
<div className="whyus-card">
  <img src={cardimg} alt="" />
  <h4>Anonymization</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores id est explicabo iusto sit voluptate animi, sapiente deleniti? Commodi, rerum!</p>
</div>
<div className="whyus-card">
  <img src={cardimg} alt="" />
  <h4>Anonymization</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores id est explicabo iusto sit voluptate animi, sapiente deleniti? Commodi, rerum!</p>
</div>
<div className="whyus-card">
  <img src={cardimg} alt="" />
  <h4>Anonymization</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores id est explicabo iusto sit voluptate animi, sapiente deleniti? Commodi, rerum!</p>
</div>

</div>
</div>
</div>
    </> 
  )
}

export default WelcomeSection