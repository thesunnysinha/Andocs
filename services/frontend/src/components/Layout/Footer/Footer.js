import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import "./Footer.css";
import { getToken } from "../../../services/LocalStorageService";

const Footer = () => {
  const { access_token } = getToken();

  return (
    <footer className="footer">
      <div className="container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} className="footer-col">
            <Typography variant="h4" gutterBottom>
              Andocs
            </Typography>
            <ul className="footer-list">
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/services">Our Services</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="footer-col">
            <Typography variant="h4" gutterBottom>
              Get Help
            </Typography>
            <ul className="footer-list">
              <li>
                <a href="{% url 'helpdesk' %}">Helpdesk</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              {access_token ? (
                <li>
                  <a href="{% url 'orders' %}">order status</a>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="footer-col">
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <ul className="footer-list">
              <li>
                <a href="{% url 'cosmetics' %}">Cosmetics</a>
              </li>
              <li>
                <a href="{% url 'petproducts' %}">Pet Products</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="footer-col">
            <Typography variant="h4" gutterBottom>
              Follow Us
            </Typography>
            <div className="social-links">
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Twitter />
              </a>
              <a href="https://www.instagram.com/andocs_india/">
                <Instagram />
              </a>
              <a href="#">
                <LinkedIn />
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
