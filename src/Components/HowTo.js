import React from 'react';

function HowTo() {
  return (
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
            Explore automatically-generated schemes, or add your brand colors
            and let Paintr find matching colors for you.
          </p>
        </li>
        <li className="how-to-item">
          <p className="how-to-num">2.</p>
          <p>
            See how they look on a demo website, then use the shuffle button to
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
  );
}

export default HowTo;
