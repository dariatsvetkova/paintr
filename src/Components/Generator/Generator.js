import React from 'react';
import './Generator.css';
import generate from '../../Functions/generate';
import hslToHex from '../../Functions/hslToHex';
import UserColour from '../UserColour/UserColour';
import ColourForm from '../ColourForm/ColourForm';
import Palette from '../Palette/Palette';
import {
  IoShuffle,
  IoReturnDownBack,
  IoReturnUpForward,
  IoCopyOutline,
} from 'react-icons/io5';
import CssPopup from '../Popup/CssPopup';
import Mockup from '../Mockup/Mockup';

class Generator extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userColours: [], // hsl values of colours added by the user, if any
      setId: 0, // number of the current colour set in session storage
      primary: {colour: [], pairs: []}, // the colour and its possible pairs
      accent1: {colour: [], pairs: []},
      accent2: {colour: [], pairs: []},
      white: [], // background colour (white or black, if in dark mode)
      light: [], //  light grey colour used for background in some elements
      dark: [], // text colour (black or white, if in dark mode)
      shuffleCount: 0, // number of times user shuffled the current set
      showCss: false, // shows/hides the modal with CSS code
    };
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleBackForward = this.handleBackForward.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  // Input handlers:

  // "Generate" button clicked:
  handleGenerateClick() {
    // Turn on the loading animation, restart the shuffle count:
    this.setState(
        {
          isLoading: true,
          shuffleCount: 0,
        },
        () => {
          const promise = generate(this.state.userColours);

          // Get a colour set:
          promise.then(
              (result) => {
                return result ?
              this.setState(
                  (prevState) => {
                    return {
                      setId: prevState.setId + 1,
                      primary: result.primary,
                      accent1: result.accent1,
                      accent2: result.accent2,
                      white: result.white,
                      light: result.light,
                      dark: result.dark,
                    };
                  },
                  () => {
                    // Save current colour set to session storage:
                    sessionStorage.setItem(
                        `colourSet${this.state.setId}`,
                        JSON.stringify(result),
                    );

                    // Ensure current colour set is the last in session storage:
                    const keys = Object.keys(sessionStorage);
                    for (const k of keys) {
                      k.slice(9) > this.state.setId &&
                        sessionStorage.removeItem(k.toString());
                    }

                    // Turn off the loading animation:
                    setTimeout(() => this.setState({isLoading: false}), 3000);
                  },
              ) :
              this.handleGenerateClick();
              },
              (error) => console.log('error in generate(): ', error),
          );
        },
    );
  }

  // User added a colour:
  handleAdd(val) {
    const cols = this.state.userColours;
    !cols.some((col) => col.every((num, i) => num === val[i])) &&
    // If the colour hasn't been added yet, add it to userColours
      cols.push(val);
    return this.setState({userColours: cols});
  }

  // User removed a colour:
  handleRemove(ind) {
    const newCols = this.state.userColours;
    const removedCol = document.querySelectorAll('.user-colour')[ind];
    newCols.splice(ind, 1);
    return (
      setTimeout(() => this.setState({userColours: newCols}), 300) &&
      removedCol.classList.add('disappear')
    );
  }

  // "Shuffle" button clicked:
  handleShuffle() {
    const {primary, accent1, accent2, white, dark} = this.state;
    const newColourSet =
      accent2.colour.length > 0 ?
        [primary, accent1, accent2, white, dark] :
        [primary, accent1, white, dark];

    switch (this.state.shuffleCount) {
      case 0:
      case 2:
        // Swap white and dark colours (i.e. dark mode):
        const a = newColourSet.length - 2;
        const b = newColourSet.length - 1;
        [newColourSet[a], newColourSet[b]] = [newColourSet[b], newColourSet[a]];

        // If the new primary colour has more than one pair,
        // switch to the other pair for dark mode:
        [
          newColourSet[0].pairs[0],
          newColourSet[0].pairs[newColourSet[0].pairs.length - 1],
        ] = [
          newColourSet[0].pairs[newColourSet[0].pairs.length - 1],
          newColourSet[0].pairs[0],
        ];
        break;

      case 1:
        // Swap primary and accent1:
        [newColourSet[0], newColourSet[1]] = [newColourSet[1], newColourSet[0]];
        break;

      case 3:
        // If there is accent2, swap it with accent1;
        // if not, swap primary and accent1 again:
        [
          newColourSet[newColourSet.length - 4],
          newColourSet[newColourSet.length - 3],
        ] = [
          newColourSet[newColourSet.length - 3],
          newColourSet[newColourSet.length - 4],
        ];
        break;

      default:
        return null;
    }

    return this.setState((prevState) => {
      return {
        primary: newColourSet[0],
        accent1: newColourSet[1],
        accent2:
          accent2.colour.length > 0 ?
            newColourSet[2] :
            {colour: [], pairs: []},
        white: newColourSet[newColourSet.length - 2],
        dark: newColourSet[newColourSet.length - 1],
        shuffleCount:
          prevState.shuffleCount === 3 ? 0 : prevState.shuffleCount + 1,
      };
    });
  }

  // "Back" or "Forward" button clicked:
  handleBackForward(id) {
    try {
      let updSet = sessionStorage.getItem(`colourSet${id}`);
      updSet = JSON.parse(updSet);

      return this.setState(
          {
            isLoading: true,
            setId: id,
            primary: updSet.primary,
            accent1: updSet.accent1,
            accent2: updSet.accent2,
            white: updSet.white,
            light: updSet.light,
            dark: updSet.dark,
            shuffleCount: 0,
          },
          () => setTimeout(() => this.setState({isLoading: false}), 3000),
      );
    } catch (e) {
      console.log('Error in colour validation: ', e);
    }
  }

  // "Copy" button clicked:
  handleCopy() {
    return this.setState((prevState) => {
      return {showCss: !prevState.showCss};
    });
  }

  render() {
    const colourSet = {
      primary: {},
      accent1: {},
      accent2: {},
      white: '',
      light: '',
      dark: '',
    };

    // Get hsl colours from state and convert them to hex:
    for (const key in colourSet) {
      if (colourSet.hasOwnProperty(key)) {
        colourSet[key] =
          (key === 'primary' || key === 'accent1' || key === 'accent2') &&
          this.state[key].colour.length > 0 ?
            {
              colour: hslToHex(this.state[key].colour),
              pairs: this.state[key].pairs.map((col) => {
                return hslToHex(col);
              }),
            } :
            this.state[key].length > 0 ?
            hslToHex(this.state[key]) :
            this.state[key];
      }
    }

    // Create a list of user's colours, if any:
    const UserColours = this.state.userColours.map((col, i) => {
      return (
        <UserColour
          colour={col}
          key={i}
          ind={i}
          handleRemove={this.handleRemove}
        />
      );
    });

    return (
      <section id="generate" className="generator">
        <div className="controls">
          <button className="large-button" onClick={this.handleGenerateClick}>
            Generate
          </button>

          <div className="user-colours">
            {UserColours}

            {this.state.userColours.length <= 1 && (
              <ColourForm handleAdd={this.handleAdd} />
            )}
          </div>

          <Palette colourSet={colourSet} isLoading={this.state.isLoading} />

          <div className="buttons">
            <button
              onClick={this.handleShuffle}
              disabled={
                this.state.isLoading || this.state.primary.colour.length === 0
              }
            >
              <IoShuffle />
            </button>
            <button
              onClick={() => this.handleBackForward(this.state.setId - 1)}
              disabled={this.state.isLoading || this.state.setId < 2}
            >
              <IoReturnDownBack />
            </button>
            <button
              onClick={() => this.handleBackForward(this.state.setId + 1)}
              disabled={
                this.state.isLoading ||
                this.state.setId >= Object.keys(sessionStorage).length
              }
            >
              <IoReturnUpForward />
            </button>
            <button
              onClick={this.handleCopy}
              disabled={
                this.state.isLoading || this.state.primary.colour.length === 0
              }
            >
              <IoCopyOutline />
            </button>
          </div>
        </div>

        {this.state.showCss && (
          <CssPopup colourSet={colourSet} handleCopy={this.handleCopy} />
        )}

        <Mockup colourSet={colourSet} isLoading={this.state.isLoading} />
      </section>
    );
  }
}

export default Generator;
