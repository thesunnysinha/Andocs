import React from 'react'
import './Contactus.css'

const Contactus = () => {
  return (
    <center>
      <div className="contactus">
        <div className="title">
          <h2>Get in Touch</h2>
        </div>
        <div className="box">
          <div id="st-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14009.237963460648!2d77.423415!3d28.620485000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb4cbfd1293a9bffb!2sCasa%20woodstock!5e0!3m2!1sen!2sin!4v1647268528695!5m2!1sen!2sin"
              width={400}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div id="rd-box">
            <h3>Contact Info</h3>
            <div className="infobox">
              <div>
                <span>
                  <ion-icon name="location" />
                </span>
                <p>D-Block,16th Floor,Casa Woodstock , Noida </p>
              </div>
              <div>
                <span>
                  <ion-icon name="mail" />
                </span>
                <a href="mailto:andocsindia@gmail.com">andocsindia@gmail.com</a>
              </div>
              <div>
                <span>
                  <ion-icon name="call" />
                </span>
                <a href="tel:+917257830012">+91 725 783 0012</a>
              </div>
              <ul className="social">
                <li>
                  <a href="https://www.facebook.com/andocs_india/">
                    <ion-icon name="logo-facebook" />
                  </a>
                </li>
                <li>
                  <a href>
                    <ion-icon name="logo-twitter" />
                  </a>
                </li>
                <li>
                  <a href>
                    <ion-icon name="logo-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/andocs_india/">
                    <ion-icon name="logo-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </center>
  );   
}

export default Contactus;