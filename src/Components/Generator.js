import React from "react";
import "../App.css";
import generate from "./generate";
import hslToHex from "./hslToHex";
import UserColour from "./UserColour";
import ColourForm from "./ColourForm";
import Palette from "./Palette";
import {
  IoShuffle,
  IoReturnDownBack,
  IoReturnUpForward,
  IoCopyOutline,
} from "react-icons/io5";
import Mockup from "./Mockup";

class Generator extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userColours: [],
      setId: 0,
      primary: { colour: [], pairs: [] },
      accent1: { colour: [], pairs: [] },
      accent2: { colour: [], pairs: [] },
      white: [],
      light: [],
      dark: [],
      shuffleCount: 0,
    };
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleBackForward = this.handleBackForward.bind(this);
  }

  // Input handlers:

  handleGenerateClick() {
    this.setState(
      {
        isLoading: true,
        shuffleCount: 0,
      },
      () => {
        let promise = generate(this.state.userColours);

        promise.then(
          (result) => {
            console.log("promise result: ", result);
            return result
              ? this.setState(
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
                      JSON.stringify(result)
                    );

                    // Make sure that current colour set is the last one in session storage:
                    let keys = Object.keys(sessionStorage);
                    console.log("keys: ", keys);
                    for (let k of keys) {
                      k.slice(k.length - 1) > this.state.setId &&
                        console.log(sessionStorage.removeItem(k.toString())) &&
                        sessionStorage.removeItem(k.toString());
                    }

                    // Turn off loading animation:
                    setTimeout(() => this.setState({ isLoading: false }), 3000);
                  }
                )
              : this.handleGenerateClick();
          },
          (error) => console.log("error in generate(): ", error)
        );
      }
    );
  }

  handleAdd(val) {
    let cols = this.state.userColours;
    !cols.some((col) => col.every((num, i) => num === val[i])) &&
      cols.push(val); // If the colour hasn't been added yet, add it to userColours
    this.setState({ userColours: cols });
  }

  handleRemove(ind) {
    let newCols = this.state.userColours;
    newCols.splice(ind, 1);
    return this.setState({ userColours: newCols });
  }

  handleShuffle() {
    const { primary, accent1, accent2, white, dark } = this.state;
    let newColourSet =
      accent2.colour.length > 0
        ? [primary, accent1, accent2, white, dark]
        : [primary, accent1, white, dark];

    switch (this.state.shuffleCount) {
      case 0:
      case 2:
        // Swap white and dark colours (i.e. dark mode):
        let a = newColourSet.length - 2,
          b = newColourSet.length - 1;
        [newColourSet[a], newColourSet[b]] = [newColourSet[b], newColourSet[a]];

        // If the new primary colour has more than one pair, switch to the other pair for dark mode:
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
        // If there is accent2, swap it with accent1; if not, swap primary and accent1 again:
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

    this.setState((prevState) => {
      return {
        primary: newColourSet[0],
        accent1: newColourSet[1],
        accent2:
          accent2.colour.length > 0
            ? newColourSet[2]
            : { colour: [], pairs: [] },
        white: newColourSet[newColourSet.length - 2],
        dark: newColourSet[newColourSet.length - 1],
        shuffleCount:
          prevState.shuffleCount === 3 ? 0 : prevState.shuffleCount + 1,
      };
    });
  }

  handleBackForward(id) {
    let updSet = sessionStorage.getItem(`colourSet${id}`);
    updSet = JSON.parse(updSet);

    this.setState(
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
      () => setTimeout(() => this.setState({ isLoading: false }), 3000)
    );
  }

  render() {
    const colourSet = {
      primary: {},
      accent1: {},
      accent2: {},
      white: "",
      light: "",
      dark: "",
    };

    for (let key in colourSet) {
      if (Object.prototype.hasOwnProperty.call(colourSet, key)) {
        colourSet[key] =
          (key === "primary" || key === "accent1" || key === "accent2") &&
          this.state[key].colour
            ? {
                colour: hslToHex(this.state[key].colour),
                pairs: this.state[key].pairs.map((col) => {
                  return hslToHex(col);
                }),
              }
            : this.state[key].length > 0
            ? hslToHex(this.state[key])
            : [];
      }
    }

    console.log("colourSet: ", colourSet);

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

          {this.state.primary.colour.length > 0 && (
            <Palette colourSet={colourSet} />
          )}

          <div className="buttons">
            <button onClick={this.handleShuffle}>
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
            <button onClick={this.copy}>
              <IoCopyOutline />
            </button>
          </div>
        </div>

        <Mockup colourSet={colourSet} isLoading={this.state.isLoading} />
      </section>
    );
  }
}

export default Generator;
