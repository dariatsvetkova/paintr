import React from 'react';
import './Layout.css';
import Logo from '../Logo';
import Background from './background.svg';
import Generator from '../Generator/Generator';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
} from 'react-icons/fa';


function Layout() {
  const text = encodeURIComponent(
      'Check out Paintr, a web app that generates color schemes for websites!',
  );
  const url = 'https://paintr.io/';

  return (
    <>
      <header id="home">
        <Logo fill={false} class="" />
        <div className="text">
          <h1>The easiest way to choose the right website colors</h1>
          <h2>
            Explore color schemes,
             see how they look on a website and simply copy
            the code for your project
          </h2>
          <a href="#generate">
            <button className="large-button">Start</button>
          </a>
        </div>
        <div className="background">
          <img src={Background} alt="" />
        </div>
      </header>

      <main>

        <section className="how-to">
          <h3>How it works</h3>
          <p>
            You don’t need to be a designer to find the perfect colors for your
            website!
          </p>
          <ol className="how-to-list">
            <li className="how-to-item">
              <p className="how-to-num">1.</p>
              <p>
                Explore automatically-generated schemes,
                 or add your brand colors
                and let Paintr find matching colors for you.
              </p>
            </li>
            <li className="how-to-item">
              <p className="how-to-num">2.</p>
              <p>
                See how they look on a demo website,
                then use the shuffle button to
                switch colors between different website elements.
              </p>
            </li>
            <li className="how-to-item">
              <p className="how-to-num">3.</p>
              <p>
                Copy CSS code or HEX values of the colors and use them in your
                project.
              </p>
            </li>
          </ol>
        </section>

        <Generator />

      </main>

      <footer>
        <a href="#home">
          <Logo fill="#FFFFFF" class="" />
        </a>
        <small>
          <a href="https://dariatsvetkova.ca/" rel="noreferrer" target="_blank">
            &copy; Daria Tsvetkova 2021
          </a>
        </small>
        <div className="social-icons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noreferrer"
            title="Share on Facebook"
          >
            <FaFacebookSquare />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
            target="_blank"
            rel="noreferrer"
            title="Tweet"
          >
            <FaTwitterSquare />
          </a>
          <a
            href="https://www.pinterest.com/pin/create/button/"
            data-pin-do="buttonBookmark"
            data-pin-custom="true"
            target="_blank"
            rel="noreferrer"
            title="Pin"
          >
            <FaPinterestSquare />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Layout;
