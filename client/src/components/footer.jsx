import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div id="sct1">
        <p id="sct1-txt">Connect With Us</p>
        <ul id="footerlist1">
          <li>Instagram</li>
          <li>Twitter</li>
          <li>Youtube</li>
        </ul>
      </div>
      <div id="sct2">
        Newsletter
        <p>Sign up for great deals and offers</p>
        <div id="newsletter">
          <input id="input1" placeholder="Enter Email Address"></input>
          <button id="button1">Sign Up</button>
        </div>
      </div>
      <div id="sct3">
        <ul id="footerlist2">
          <li>About</li>
          <li>FAQ</li>
          <li>Careers</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;