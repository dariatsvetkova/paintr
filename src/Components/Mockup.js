function Mockup(props) {

    const { primary, accent1, accent2, white, light, dark } = props.colourSet;

    return (
        <div className="mockup">

        <div className="navbar">
          <svg className="logo" width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="12" r="11.5"/>
            <path d="M3.00002 12.5999C3.00002 12.5999 6.20001 10.5999 8.60001 10.5999C11 10.5999 12.2 10.9999 15 12.5999C17.8 14.1999 17.8 14.5999 21 14.5999C24.2 14.5999 27 12.5999 27 12.5999" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
          </svg>

          <ul className="menu-items">
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="header">
            <div className="text">
                <p className="h1">Transform your brand with color</p>
                <p className="subheading">Choose from as many as 360 hues</p>
                <button className="button">Find my colors!</button>
            </div>
            <svg className="image" width="209" height="163" viewBox="0 0 209 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="line" d="M9.1366 87.2065C9.1366 87.2065 21.1366 79.7065 30.1366 79.7065C39.1366 79.7065 43.6366 81.2065 54.1366 87.2065C64.6366 93.2065 64.6366 94.7065 76.6366 94.7065C88.6366 94.7065 99.1366 87.2065 99.1366 87.2065" stroke-width="12" stroke-linecap="square" stroke-linejoin="round"/>
                <circle className="circle" cx="123" cy="50" r="50" />
                <path className="triangle" d="M209 113L134 156.301V69.6987L209 113Z" />
                <path className="line" d="M9 57.5C9 57.5 21 50 30 50C39 50 43.5 51.5 54 57.5C64.5 63.5 64.5 65 76.5 65C88.5 65 99 57.5 99 57.5" stroke-width="12" stroke-linecap="square" stroke-linejoin="round"/>
            </svg>
        </div>

        <div className="section">
          <p className="h2">Why use color</p>
          <ul className="benefits">
            <li className="pillar">
                <div className="icon">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="circle-icon" cx="12.5" cy="12.5" r="11.5" stroke-width="2"/>
                    </svg>
                </div>
              <p><b>Brand recognition</b></p>
              <p><span className="a">Research</span> has shown that adding a signature color to your branding can increase brand recognition by 80%, compared to designs done in grayscale.</p>
            </li>
            <li className="pillar">
                <div className="icon">
                    <svg width="38" height="25" viewBox="0 0 38 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="waves-icon-back" d="M5.1366 18.9565C5.1366 18.9565 8.7366 16.7065 11.4366 16.7065C14.1366 16.7065 15.4866 17.1565 18.6366 18.9565C21.7866 20.7565 21.7866 21.2065 25.3866 21.2065C28.9866 21.2065 32.1366 18.9565 32.1366 18.9565" stroke-width="7" stroke-linecap="square" stroke-linejoin="round"/>
                        <path className="waves-icon-back" d="M5 6.25C5 6.25 8.6 4 11.3 4C14 4 15.35 4.45 18.5 6.25C21.65 8.05 21.65 8.5 25.25 8.5C28.85 8.5 32 6.25 32 6.25" stroke-width="7" stroke-linecap="square" stroke-linejoin="round"/>
                        <path className="waves-icon-front-2" d="M5.1366 18.9565C5.1366 18.9565 8.7366 16.7065 11.4366 16.7065C14.1366 16.7065 15.4866 17.1565 18.6366 18.9565C21.7866 20.7565 21.7866 21.2065 25.3866 21.2065C28.9866 21.2065 32.1366 18.9565 32.1366 18.9565" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
                        <path className="waves-icon-front-1" d="M5 6.25C5 6.25 8.6 4 11.3 4C14 4 15.35 4.45 18.5 6.25C21.65 8.05 21.65 8.5 25.25 8.5C28.85 8.5 32 6.25 32 6.25" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
                    </svg>
                </div>
              <p><b>Instant communication</b></p>
              <p>Color has the ability to trigger certain emotions instantaneously. The <span className="a">feelings</span> associated with different colors play an important role in snap judgements.</p>
            </li>
            <li className="pillar">
                <div className="icon">
                    <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="triangle-icon" d="M1.25 2.40673L17 11.5L1.25 20.5933V2.40673Z" fill="#DCEFCC" stroke="#262C21" stroke-width="2"/>
                    </svg>
                </div>
                <p><b>Information hierarchy</b></p>
                <p>Harmonious color combinations help establish a sense of order and guide the user’s <span className="a">attention</span> towards the most important information on the page.</p>
            </li>
          </ul>
        </div>
      </div>

    )
}

export default Mockup;