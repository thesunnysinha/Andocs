import React from 'react'
import './Services.css'
import cod from './images/cod.png'
import home from './images/home.png'
import card from './images/card.png'
import help from './images/help.png'

const Services = () => {
  return (
    <div className="service">
      <div className="max-width">
        <div className="title">
          <h2>Our Services</h2>
        </div>
        <div className="content1">
          <div className="car">
            <div className="box1">
              <img src={cod} height={20} width={20} alt="" />
              <h3>Cash On Delivery</h3>
              <p>
                Cash on delivery available. Pay when your order is at your
                doorstep for your convenience.
              </p>
            </div>
          </div>
          <div className="car">
            <div className="box1">
              <img src={home} height={20} width={20} alt="" />
              <h3>Home Delivery</h3>
              <p>
                Get your products delivered at your doorstep without any hassle.
              </p>
            </div>
          </div>
          <div className="car">
            <div className="box1">
              <img src={card} height={20} width={20} alt="" />
              <h3>Pay with Cards</h3>
              <p>Order with the ease of paying with debit or credit cards.</p>
            </div>
          </div>
          <div className="car">
            <div className="box1">
              <img src={help} height={20} width={20} alt="" />
              <h3>24X7 Helpline</h3>
              <p>
                Having any doubts or any questions? Get in touch with our 24X7
                helpline desk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );   
}

export default Services;