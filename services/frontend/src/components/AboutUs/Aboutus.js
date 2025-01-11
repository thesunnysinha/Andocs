import React from "react";
import "./Aboutus.css";
import about_img from "./images/about.png";
import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <div>
      <section className="about">
        <div className="main">
          <img src={about_img} />
          <div className="all-text">
            <h4>About Us</h4>
            <h1>A house of Creative &amp; Intelligence.</h1>
            <p>
              It is an e-commerce website that delivers you your makeup and pet
              products to your doorstep at your convenience.
            </p>
            <div className="buttn">
              <Link to="/team">
                <button type="button"> Our Team</button>
              </Link>

              {/* <button
              type="button"
              onclick="window.location.href = '{% url 'team' %}' "
            ></button> */}
              <button type="button" className="buttn2">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
